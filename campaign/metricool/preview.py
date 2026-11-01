"""A live preview of posts.toml: the calendar, each caption as every platform
will show it, the clip instructions, and whether each clip is ready.

    python campaign/metricool/preview.py

It opens http://localhost:8765 in your browser and reloads the page whenever
posts.toml is saved. Stop it with Ctrl+C. It's for prep only: nothing in the
campaign depends on it.

A clip counts as ready once Google Drive will hand its thumbnail to someone
who isn't signed in, which is what Metricool needs too. The check runs from
this script, not your browser, so being signed into Google doesn't fool it.
Drive takes a few minutes to make a thumbnail for a new upload.

The players play the suggested part of each music video, from the files in
campaign/videos/ named in [videos]. VS Code's built-in browser can't play
MP4s, so use Chrome or Edge.
"""

import html
import http.server
import re
import sys
import time
import tomllib
import urllib.parse
import urllib.request
import webbrowser

import build_csv as bc

VIDEOS = bc.HERE.parent / "videos"
PORT = 8765
DAYS = list(bc.DAY_OFFSET)
_thumbnails = {}  # Drive file id -> (when fetched, image bytes, or None if Drive wouldn't share it)


def seconds(stamp):
    minutes, secs = str(stamp).split(":")
    return int(minutes) * 60 + float(secs)


def nice_time(stamp):
    try:
        hour, minute = map(int, str(stamp).split(":"))
    except ValueError:
        return str(stamp)
    return f"{hour % 12 or 12}{f':{minute:02d}' if minute else ''} {'am' if hour < 12 else 'pm'}"


def fill(text, values):
    """The text with its placeholders filled in where known, as plain text and as HTML."""
    plain, marked = text.strip(), html.escape(text.strip())
    for token, value in values.items():
        if value:
            plain = plain.replace(token, value)
            marked = marked.replace(token, html.escape(value))
        else:
            marked = marked.replace(token, f"<mark>{token}</mark>")
    return plain, marked


def drive_thumbnail(file_id):
    fetched = _thumbnails.get(file_id)
    if fetched and (fetched[1] or time.time() - fetched[0] < 30):
        return fetched[1]
    request = urllib.request.Request(f"https://drive.google.com/thumbnail?id={file_id}&sz=w480",
                                     headers={"User-Agent": "Mozilla/5.0"})
    try:
        with urllib.request.urlopen(request, timeout=10) as response:
            image = response.read() if response.headers.get_content_type().startswith("image/") else None
    except OSError:
        image = None
    _thumbnails[file_id] = (time.time(), image)
    return image


def render_clip(post, videos):
    clip = post.get("clip", {})
    url = post.get("clip_url", "")
    match = bc.DRIVE_ID.search(url)
    if match:
        status = "checking"
        thumb = (f'<img class="thumb" src="/thumb/{match.group(1)}" alt="" '
                 'onload="clipReady(this)" onerror="clipMissing(this)">')
    elif url:
        status, thumb = "ready", '<div class="thumb none">Link added (not on Drive, so not checked)</div>'
    else:
        status, thumb = "todo", '<div class="thumb none">No clip yet</div>'

    parts = []
    for part in clip.get("parts", []):
        name, start, end = part.get("video", "?"), part.get("start", "?"), part.get("end", "?")
        try:
            length = f" ({seconds(end) - seconds(start):.0f}s)"
        except ValueError:
            length = ""
        player = ""
        file = videos.get(name)
        if file and (VIDEOS / file).is_file():
            try:
                fragment = f"#t={seconds(start):g},{seconds(end):g}"
            except ValueError:
                fragment = ""
            player = (f'<video controls preload="metadata" '
                      f'src="/videos/{urllib.parse.quote(file)}{fragment}"></video>')
        parts.append(f'<div class="part"><p><b>{html.escape(name)}</b> '
                     f'{html.escape(str(start))}–{html.escape(str(end))}{length}</p>{player}</div>')

    steps = "".join(f"<li>{html.escape(step)}</li>" for step in clip.get("steps", []))
    body = (f'<div class="parts{" multi" if len(parts) > 1 else ""}">{"".join(parts)}</div>'
            + (f'<ol class="steps">{steps}</ol>' if steps else ""))
    if not clip:
        body = '<p class="muted">No clip instructions yet.</p>'
    return status, f'<section class="clip"><h4>Clip</h4>{thumb}{body}</section>'


def render_post(index, week, post, release, date, videos):
    label = f"{bc.week_label(week['week']).replace('-', '−')} {post.get('day', '?')}"
    when = label
    if date and post.get("day") in bc.DAY_OFFSET:
        day = date + bc.dt.timedelta(days=7 * week["week"] + bc.DAY_OFFSET[post["day"]])
        when = f"{day:%a %b} {day.day}"
    post_time = post.get("time", release.get("time", ""))
    kind = post.get("type", "video")

    nice_date = f"{date:%A, %B} {date.day}" if date else ""
    values = {"[EP TITLE]": release.get("ep_title", ""), "[DATE]": nice_date}
    main_plain, main_html = fill(post.get("caption", ""), {**values, "[LINK]": "link in bio"})
    if week.get("hashtags"):
        main_plain += "\n\n" + week["hashtags"]
        main_html += "\n\n" + html.escape(week["hashtags"])
    _, facebook_html = fill(post.get("caption", ""), {**values, "[LINK]": release.get("link", "")})
    title_plain, title_html = fill(post.get("title", ""), {**values, "[LINK]": "link in bio"})

    errors = []
    bc.check_post(week, post, errors)
    warnings = [e.split(": ", 1)[1] for e in errors if "clip_url is empty" not in e]
    if len(title_plain) > bc.TITLE_MAX[kind]:
        warnings.append(f"The title is {len(title_plain)} characters. The limit is {bc.TITLE_MAX[kind]}.")
    if len(main_plain) > bc.CAPTION_MAX:
        warnings.append(f"The caption is {len(main_plain)} characters. The limit is {bc.CAPTION_MAX}.")

    status, clip_html = render_clip(post, videos)
    platforms = "Instagram · TikTok · YouTube Shorts" if kind == "video" else "Instagram · TikTok photo"
    title_name = "YouTube title" if kind == "video" else "TikTok title"
    warning_html = "".join(f"<li>{html.escape(w)}</li>" for w in warnings)
    card = f"""
<article class="card" id="p{index}" data-status="{status}">
  <header>
    <span class="when">{html.escape(when)} · {html.escape(nice_time(post_time))}</span>
    {f'<span class="label">{html.escape(label)}</span>' if when != label else ''}
    <h3>{html.escape(post.get('name', 'Unnamed'))}</h3>
    <span class="badge"></span>
  </header>
  {f'<ul class="warnings">{warning_html}</ul>' if warnings else ''}
  <div class="cols">
    {clip_html}
    <section class="captions">
      <h4>{platforms}</h4>
      <div class="caption">{main_html}</div>
      <p class="count">{len(main_plain)} / {bc.CAPTION_MAX} characters</p>
      <p class="title"><b>{title_name}:</b> {title_html} <span class="count">({len(title_plain)} / {bc.TITLE_MAX[kind]})</span></p>
      <h4>Facebook</h4>
      <div class="caption">{facebook_html}</div>
    </section>
  </div>
</article>"""
    return label, when, card


def render_page():
    try:
        with bc.POSTS.open("rb") as f:
            data = tomllib.load(f)
    except tomllib.TOMLDecodeError as e:
        return page("posts.toml has a typo", f'<p class="error">posts.toml can\'t be read: {html.escape(str(e))}</p>'
                    "<p>Fix it and save, and this page will reload.</p>")

    release, videos = data.get("release", {}), data.get("videos", {})
    release_errors = []
    date = bc.check_release(release, release_errors)
    pairs = [(week, post) for week in data.get("week", []) for post in week.get("post", [])]

    cards, cells = [], {}
    for index, (week, post) in enumerate(pairs):
        label, when, card = render_post(index, week, post, release, date, videos)
        cards.append((week, card))
        cells.setdefault((week["week"], post.get("day")), []).append(
            f'<a class="chip" href="#p{index}" data-card="p{index}">{html.escape(post.get("name", "?"))}</a>')

    header_cells = "".join(f"<th>{d}</th>" for d in DAYS)
    rows = []
    for week in data.get("week", []):
        tds = []
        for day in DAYS:
            dated = ""
            if date:
                d = date + bc.dt.timedelta(days=7 * week["week"] + bc.DAY_OFFSET[day])
                dated = f'<span class="date">{d:%b} {d.day}</span>'
            tds.append(f"<td>{dated}{''.join(cells.get((week['week'], day), []))}</td>")
        rows.append(f'<tr><th class="wk">{bc.week_label(week["week"]).replace("-", "−")}'
                    f'<span>{html.escape(week.get("focus", ""))}</span></th>{"".join(tds)}</tr>')
    calendar = f'<table class="calendar"><tr><th></th>{header_cells}</tr>{"".join(rows)}</table>'

    sections, current = [], None
    for week, card in cards:
        if week is not current:
            current = week
            tags = f' <span class="tags">{html.escape(week["hashtags"])}</span>' if week.get("hashtags") else ""
            sections.append(f'<h2>{bc.week_label(week["week"]).replace("-", "−")} · '
                            f'{html.escape(week.get("focus", ""))}{tags}</h2>')
        sections.append(card)

    every = "".join(f"<li>{html.escape(rule)}</li>" for rule in data.get("clips", {}).get("every", []))
    guide = f'<details class="guide" open><summary>For every clip</summary><ul>{every}</ul></details>' if every else ""
    kickoff = "".join(f"<li>{html.escape(e.removeprefix('[release] '))}</li>" for e in release_errors)
    summary = f"""
<div class="summary">
  <div class="stat"><b id="ready">0</b> of {len(pairs)} clips ready</div>
  <div class="stat"><b>{sum(1 for _, p in pairs if p.get('clip_url'))}</b> links added</div>
  <div class="stat">{html.escape(release.get('ep_title') or 'EP title not set')} · {html.escape(f'{date:%A, %B} {date.day}, {date.year}' if date else 'date not set')}</div>
</div>
{f'<details class="kickoff"><summary>To fill in on kickoff day ({len(release_errors)})</summary><ul>{kickoff}</ul></details>' if kickoff else ''}"""
    return page("Hootin EP posts", summary + guide + calendar + "".join(sections))


def page(title, body):
    version = bc.POSTS.stat().st_mtime_ns
    return f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>{html.escape(title)}</title>
<style>
:root {{ --bg:#f6f5f2; --card:#fff; --ink:#1d1d1f; --muted:#6b6b70; --line:#e2e0db; --accent:#3b5bdb;
        --ready:#2f9e44; --todo:#6c757d; --missing:#e03131; --checking:#f08c00; --mark:#fff3bf; }}
@media (prefers-color-scheme: dark) {{
  :root {{ --bg:#141416; --card:#1e1e22; --ink:#ececf0; --muted:#9a9aa3; --line:#2e2e34; --accent:#7c94f5;
          --mark:#5c4a00; }}
}}
* {{ box-sizing:border-box; }}
body {{ margin:0; padding:24px 16px 80px; background:var(--bg); color:var(--ink);
       font:15px/1.5 system-ui, -apple-system, "Segoe UI", sans-serif; }}
main {{ max-width:1100px; margin:0 auto; }}
h1 {{ font-size:22px; margin:0 0 12px; }}
h2 {{ font-size:17px; margin:36px 0 12px; }}
h3 {{ font-size:16px; margin:0; flex:1; }}
h4 {{ font-size:12px; text-transform:uppercase; letter-spacing:.06em; color:var(--muted); margin:0 0 6px; }}
mark {{ background:var(--mark); color:inherit; border-radius:3px; padding:0 2px; }}
.muted, .count, .tags, .date, .label {{ color:var(--muted); font-size:13px; font-weight:normal; }}
.error {{ color:var(--missing); font-weight:600; }}
.summary {{ display:flex; flex-wrap:wrap; gap:12px; margin-bottom:12px; }}
.stat {{ background:var(--card); border:1px solid var(--line); border-radius:10px; padding:8px 14px; }}
.kickoff {{ margin-bottom:16px; color:var(--muted); }}
.guide {{ background:var(--card); border:1px solid var(--line); border-radius:10px; padding:10px 14px;
          margin-bottom:16px; font-size:14px; }}
.guide summary, .kickoff summary {{ cursor:pointer; font-weight:600; }}
.guide ul {{ margin:8px 0 0; padding-left:20px; }}
.calendar {{ width:100%; border-collapse:collapse; table-layout:fixed; background:var(--card);
            border:1px solid var(--line); border-radius:10px; overflow:hidden; }}
.calendar th, .calendar td {{ border:1px solid var(--line); padding:6px; vertical-align:top; font-size:12px; }}
.calendar th {{ color:var(--muted); font-weight:600; }}
.calendar .wk {{ text-align:left; width:110px; }}
.calendar .wk span {{ display:block; font-weight:normal; }}
.date {{ display:block; font-size:11px; }}
.chip {{ display:block; margin-top:4px; padding:3px 6px; border-radius:6px; text-decoration:none; color:#fff;
         background:var(--todo); overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }}
.card {{ background:var(--card); border:1px solid var(--line); border-left:5px solid var(--todo);
         border-radius:10px; padding:14px 16px; margin-bottom:14px; }}
.card header {{ display:flex; flex-wrap:wrap; align-items:baseline; gap:4px 12px; margin-bottom:10px; }}
.when {{ font-weight:600; font-size:13px; }}
.badge {{ font-size:12px; font-weight:600; padding:2px 8px; border-radius:99px; color:#fff; background:var(--todo); }}
.badge::after {{ content:"To make"; }}
[data-status=checking] .badge::after {{ content:"Checking Drive…"; }}
[data-status=ready] .badge::after {{ content:"✓ Ready"; }}
[data-status=missing] .badge::after {{ content:"Can't see it: check it's shared as Anyone with the link"; }}
[data-status=checking] {{ --state:var(--checking); }} [data-status=ready] {{ --state:var(--ready); }}
[data-status=missing] {{ --state:var(--missing); }}
.card[data-status]:not([data-status=todo]) {{ border-left-color:var(--state); }}
.card[data-status]:not([data-status=todo]) .badge, .chip[data-status]:not([data-status=todo]) {{ background:var(--state); }}
.cols {{ display:grid; grid-template-columns:minmax(0, 1fr) minmax(0, 1fr); gap:20px; }}
@media (max-width:760px) {{ .cols {{ grid-template-columns:1fr; }} .calendar {{ font-size:10px; }} }}
.thumb {{ display:block; width:120px; max-height:213px; object-fit:cover; border-radius:8px; margin-bottom:8px;
          background:var(--line); }}
.thumb.none {{ width:auto; padding:8px 10px; color:var(--muted); font-size:13px; background:transparent;
               border:1px dashed var(--line); display:inline-block; }}
.parts.multi {{ display:grid; grid-template-columns:1fr 1fr; gap:4px 10px; }}
.part p {{ margin:4px 0; font-size:14px; }}
video {{ display:block; width:100%; max-height:300px; border-radius:8px; background:#000; }}
.steps {{ padding-left:20px; margin:8px 0 0; }}
.steps li {{ margin-bottom:4px; }}
.caption {{ white-space:pre-wrap; border:1px solid var(--line); border-radius:8px; padding:8px 10px; font-size:14px; }}
.captions .count {{ margin:4px 0 10px; }}
.title {{ margin:0 0 14px; font-size:14px; }}
.warnings {{ margin:0 0 10px; padding:8px 12px 8px 28px; border-radius:8px; color:var(--missing);
             border:1px solid var(--missing); font-size:13px; }}
</style>
<script>
function setStatus(card, status) {{
  card.dataset.status = status;
  document.querySelectorAll('[data-card="' + card.id + '"]').forEach(c => c.dataset.status = status);
  document.getElementById('ready').textContent = document.querySelectorAll('.card[data-status=ready]').length;
}}
function clipReady(img) {{ img.hidden = false; setStatus(img.closest('.card'), 'ready'); }}
function clipMissing(img) {{
  img.hidden = true;
  setStatus(img.closest('.card'), 'missing');
  setTimeout(() => {{ img.src = img.src.split('?')[0] + '?retry=' + Date.now(); }}, 60000);
}}
document.addEventListener('DOMContentLoaded', () => {{
  document.querySelectorAll('.card').forEach(card => setStatus(card, card.dataset.status));
  try {{ const y = sessionStorage.getItem('scroll'); if (y) window.scrollTo(0, +y); }} catch (e) {{}}
}});
setInterval(async () => {{
  try {{
    const version = await (await fetch('/version')).text();
    if (version !== '{version}') {{
      try {{ sessionStorage.setItem('scroll', window.scrollY); }} catch (e) {{}}
      location.reload();
    }}
  }} catch (e) {{}}
}}, 1000);
</script></head>
<body><main><h1>{html.escape(title)}</h1>{body}</main></body></html>"""


class Handler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        path = urllib.parse.urlparse(self.path).path
        try:
            if path == "/":
                self.send_bytes(render_page().encode("utf-8"), "text/html; charset=utf-8")
            elif path == "/version":
                self.send_bytes(str(bc.POSTS.stat().st_mtime_ns).encode(), "text/plain")
            elif path.startswith("/thumb/") and re.fullmatch(r"[\w-]+", path[7:]):
                image = drive_thumbnail(path[7:])
                if image:
                    self.send_bytes(image, "image/jpeg")
                else:
                    self.send_error(404)
            elif path.startswith("/videos/"):
                self.send_video(urllib.parse.unquote(path[8:]))
            else:
                self.send_error(404)
        except (BrokenPipeError, ConnectionResetError, ConnectionAbortedError):
            pass  # the browser stopped listening, which video players do all the time

    def send_bytes(self, body, content_type):
        self.send_response(200)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def send_video(self, name):
        file = VIDEOS / name
        if file.parent != VIDEOS or not file.is_file():
            return self.send_error(404)
        size = file.stat().st_size
        start, end = 0, size - 1
        wanted = re.fullmatch(r"bytes=(\d*)-(\d*)", self.headers.get("Range", ""))
        if wanted and (wanted[1] or wanted[2]):
            if wanted[1]:
                start = int(wanted[1])
                end = min(int(wanted[2]), end) if wanted[2] else end
            else:
                start = max(0, size - int(wanted[2]))
            self.send_response(206)
            self.send_header("Content-Range", f"bytes {start}-{end}/{size}")
        else:
            self.send_response(200)
        self.send_header("Content-Type", "video/mp4")
        self.send_header("Accept-Ranges", "bytes")
        self.send_header("Content-Length", str(end - start + 1))
        self.end_headers()
        with file.open("rb") as f:
            f.seek(start)
            remaining = end - start + 1
            while remaining > 0:
                chunk = f.read(min(1 << 20, remaining))
                if not chunk:
                    break
                self.wfile.write(chunk)
                remaining -= len(chunk)

    def log_message(self, *args):
        pass


class Server(http.server.ThreadingHTTPServer):
    allow_reuse_address = False  # on Windows, True lets a second preview quietly share the port


def main():
    for port in range(PORT, PORT + 10):
        try:
            server = Server(("127.0.0.1", port), Handler)
            break
        except OSError:
            continue
    else:
        sys.exit(f"Ports {PORT}–{PORT + 9} are all in use.")
    url = f"http://localhost:{port}/"
    print(f"Previewing posts.toml at {url}  (Ctrl+C to stop)", flush=True)
    if "--no-open" not in sys.argv:
        webbrowser.open(url)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass


if __name__ == "__main__":
    main()
