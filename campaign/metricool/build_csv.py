"""Build the Metricool import CSV from posts.toml.

    python build_csv.py          writes metricool-import.csv, with every post
    python build_csv.py --test   writes metricool-test.csv: the first post only, as drafts

Everything is checked first. If anything isn't ready, it lists the problems
and writes nothing.

Each post becomes two rows, because the CSV holds one caption per row:
  - Instagram (Reel), TikTok and YouTube (Short), where [LINK] reads "link in bio"
    and the week's hashtags are added
  - Facebook (Reel), where [LINK] is the HyperFollow link itself
Image posts go out as an Instagram post, a TikTok photo and a Facebook post,
and skip YouTube.

Google Drive links are rewritten to the view?usp=sharing form Metricool asks
for, so a link copied as ...usp=drive_link works too.
"""

import argparse
import csv
import datetime as dt
import re
import sys
import tomllib
from pathlib import Path

HERE = Path(__file__).resolve().parent
POSTS = HERE / "posts.toml"
TEMPLATE = HERE / "template.csv"  # the header row of Metricool's import template

# Days from release day, which is a Friday.
DAY_OFFSET = {"Mon": -4, "Tue": -3, "Wed": -2, "Thu": -1, "Fri": 0, "Sat": 1, "Sun": 2}
NETWORKS = ["Facebook", "Twitter/X", "LinkedIn", "GBP", "Instagram", "Pinterest",
            "TikTok", "Youtube", "Threads", "Bluesky"]
PLACEHOLDERS = {"[EP TITLE]", "[DATE]", "[LINK]"}
CAPTION_MAX = 2200  # Instagram's and TikTok's caption limit
TITLE_MAX = {"video": 100, "image": 90}  # YouTube title, TikTok photo title
DRIVE_ID = re.compile(r"drive\.google\.com/(?:file/d/|open\?id=|uc\?(?:.*&)?id=)([\w-]+)")

TIKTOK = {
    "TikTok disable comments": "false",
    "TikTok disable duet": "false",
    "TikTok disable stitch": "false",
    "TikTok Post Privacy": "PUBLIC_TO_EVERYONE",
    "TikTok Branded Content": "false",
    "TikTok Your Brand": "false",
    "TikTok Auto Add Music": "false",
    "TikTok Ai generated content": "false",
}


def week_label(week):
    return "R" if week == 0 else f"R{week:+d}"


def drive_link(url):
    """The view?usp=sharing form of a Google Drive file link, or None if it isn't one."""
    match = DRIVE_ID.search(url)
    return f"https://drive.google.com/file/d/{match.group(1)}/view?usp=sharing" if match else None


def check_release(release, errors):
    raw = release.get("date", "")
    try:
        date = raw if isinstance(raw, dt.date) else dt.date.fromisoformat(str(raw))
    except ValueError:
        errors.append("[release] date: fill in the release Friday, written as 2027-03-05.")
        date = None
    if date and date.weekday() != 4:
        errors.append(f"[release] date: {date} is a {date:%A}. Release day must be a Friday.")
        date = None
    if not release.get("ep_title"):
        errors.append("[release] ep_title: fill in the EP's title.")
    if not str(release.get("link", "")).startswith("https://"):
        errors.append("[release] link: fill in the HyperFollow link, starting with https://.")
    if not re.fullmatch(r"([01]\d|2[0-3]):[0-5]\d", str(release.get("time", ""))):
        errors.append('[release] time: write it as 24-hour HH:MM, like "18:00".')
    return date


def check_post(week, post, errors):
    where = f"{week_label(week['week'])} {post.get('day', '?')} ({post.get('name', 'unnamed')})"
    if post.get("day") not in DAY_OFFSET:
        errors.append(f"{where}: day must be one of {', '.join(DAY_OFFSET)}.")
    if post.get("type", "video") not in TITLE_MAX:
        errors.append(f'{where}: type must be "video" or "image".')
    if "time" in post and not re.fullmatch(r"([01]\d|2[0-3]):[0-5]\d", str(post["time"])):
        errors.append(f'{where}: time must be 24-hour HH:MM, like "09:00".')

    url = post.get("clip_url", "")
    if not url:
        errors.append(f"{where}: clip_url is empty. Paste the clip's Google Drive share link.")
    elif "drive.google.com" in url and not drive_link(url):
        errors.append(f"{where}: clip_url is a Google Drive link but not to a file. Share the file itself, not a folder.")
    elif not url.startswith("https://"):
        errors.append(f"{where}: clip_url must start with https://.")

    for field in ("title", "caption"):
        text = post.get(field, "").strip()
        if not text:
            errors.append(f"{where}: {field} is empty.")
        for found in set(re.findall(r"\[[^\]]*\]", text)) - PLACEHOLDERS:
            errors.append(f"{where}: {field} has {found}, which isn't a placeholder. Use {', '.join(sorted(PLACEHOLDERS))}.")


def rows_for(week, post, release, date, draft, errors):
    where = f"{week_label(week['week'])} {post['day']} ({post.get('name', 'unnamed')})"
    kind = post.get("type", "video")
    when = date + dt.timedelta(days=7 * week["week"] + DAY_OFFSET[post["day"]])
    time = post.get("time", release["time"])
    url = drive_link(post["clip_url"]) or post["clip_url"]

    def fill(text, link):
        return (text.strip()
                .replace("[EP TITLE]", release["ep_title"])
                .replace("[DATE]", f"{date:%A, %B} {date.day}")
                .replace("[LINK]", link))

    title = fill(post["title"], "link in bio")
    main_text = fill(post["caption"], "link in bio")
    if week.get("hashtags"):
        main_text += "\n\n" + week["hashtags"]
    facebook_text = fill(post["caption"], release["link"])

    if len(title) > TITLE_MAX[kind]:
        errors.append(f"{where}: title is {len(title)} characters with the EP title filled in. The limit is {TITLE_MAX[kind]}.")
    if len(main_text) > CAPTION_MAX:
        errors.append(f"{where}: caption is {len(main_text)} characters with hashtags. The limit is {CAPTION_MAX}.")

    def row(text):
        r = {network: "false" for network in NETWORKS}
        r.update({
            "Text": text,
            "Date": when.isoformat(),
            "Time": f"{time}:00",
            "Draft": "true" if draft else "false",
            "Picture Url 1": url,
            "Shortener": "false",
            "Brand name": release.get("brand", ""),
        })
        return r

    main = row(main_text)
    main.update({"Instagram": "true", "TikTok": "true", **TIKTOK})
    if kind == "video":
        main.update({
            "Youtube": "true",
            "Instagram Post Type": "REEL",
            "Instagram Show Reel On Feed": "true",
            "Youtube Video Title": title,
            "Youtube Video Type": "SHORT",
            "Youtube Video Privacy": "PUBLIC",
            "Youtube video for kids": "false",
            "Youtube AI generated content": "false",
            "Youtube notify subscribers": "true",
            "Youtube Video Category": "MUSIC",
            "Youtube Video Tags": release.get("youtube_tags", ""),
        })
    else:
        main.update({"Instagram Post Type": "POST", "TikTok Title": title})

    facebook = row(facebook_text)
    facebook.update({"Facebook": "true", "Facebook Post Type": "REEL" if kind == "video" else "POST"})

    return when, time, [main, facebook]


def fail(errors):
    print(f"Nothing written. {len(errors)} thing(s) to fix in posts.toml:\n", file=sys.stderr)
    for error in errors:
        print(f"  - {error}", file=sys.stderr)
    sys.exit(1)


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--test", action="store_true",
                        help="write only the first post, as drafts, to metricool-test.csv")
    args = parser.parse_args()

    with POSTS.open("rb") as f:
        data = tomllib.load(f)
    release = data.get("release", {})
    pairs = [(week, post) for week in data.get("week", []) for post in week.get("post", [])]
    if args.test:
        pairs = pairs[:1]

    errors = []
    date = check_release(release, errors)
    for week, post in pairs:
        check_post(week, post, errors)
    if errors:
        fail(errors)

    built = [(week, post, *rows_for(week, post, release, date, args.test, errors)) for week, post in pairs]
    if errors:
        fail(errors)
    built.sort(key=lambda b: (b[2], b[3]))

    with TEMPLATE.open(encoding="utf-8-sig", newline="") as f:
        header = next(csv.reader(f))
    out = HERE / ("metricool-test.csv" if args.test else "metricool-import.csv")
    rows = [r for *_, post_rows in built for r in post_rows]
    try:
        with out.open("w", encoding="utf-8-sig", newline="") as f:
            writer = csv.DictWriter(f, fieldnames=header, restval="")
            writer.writeheader()
            writer.writerows(rows)
    except ValueError as e:
        out.unlink(missing_ok=True)
        sys.exit(f"template.csv is missing a column this script fills in ({e}). "
                 "Has Metricool changed its template?")

    drafts = ", as drafts" if args.test else ""
    print(f"Wrote {out.name}: {len(built)} post(s), {len(rows)} rows{drafts}.\n")
    today = dt.date.today()
    for week, post, when, time, _ in built:
        past = "  <- already past" if when < today else ""
        print(f"  {when:%a %b} {when.day:>2}  {time}  {week_label(week['week']):<4} {post['name']}{past}{'  (image)' if post.get('type') == 'image' else ''}")
    print("\nIn Metricool's Planning calendar, open the options menu and choose Import CSV.\n"
          "Pick YYYY-MM-DD for the date format and 00:00:00 for the time format.")


if __name__ == "__main__":
    main()
