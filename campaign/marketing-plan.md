# Hootin EP Release Campaign: Plan

_Written 2026-10-18. Release date not chosen yet (see "Picking the date")._

## What this is and why

Hootin is the stage name of an amateur musician who has recorded and released music in their spare time for years. There are two albums and four singles on all major platforms (Spotify, YouTube Music, etc.). Hootin has a website, a Facebook page, and Instagram, TikTok and YouTube accounts. Almost all listeners are personal connections: friends, family and existing followers.

Four new songs are recorded, mixed and mastered. Each has a finished music video, rendered at **16:9** (YouTube) and **9:16** (Reels, TikTok, Shorts).

**The story behind them:** these songs were meant to come out when the artist's daughter was born in 2025. She was due in August and arrived in July, six weeks early, before the songs were finished. They sat unfinished for over a year. Now they're done. This story is the thread running through the whole campaign.

Instead of just uploading the songs, the artist wants a short, planned lead-up that builds some excitement, so the release gets more attention than past ones did.

**What happened before:**
- The last single had about two weeks of regular posting before release. A few people saw the posts and eventually listened, but not many.
- The artist once wrote a Python script that scraped Instagram hashtags and auto-liked and auto-commented on posts whose captions matched their music interests. It raised engagement but didn't bring many listeners. It also breaks Instagram's terms. **It is not part of this plan.**

## What success looks like

- One track reaches about **100 plays**.
- Friends and family tell the artist they like the songs.

That's the whole bar. Getting to 100 plays mostly means a few dozen people who care listening a couple of times and maybe sharing it. So the campaign aims at people who already know Hootin, not strangers.

## Goals, non-goals, anti-goals

**Goals**
- Reach the people who already know Hootin, and give them a reason to care: the story.
- Make listening effortless: one link, everywhere, before and after release.
- Do all the writing and editing up front. Once the campaign starts it should run almost entirely on its own.

**Non-goals**
- Growing an audience of strangers, going viral, chasing playlists or making money.

**Anti-goals** (any of these makes it a failure, even if the plays come)
- Posts that feel spammy or repetitive.
- Anything that puts the accounts at risk: scraping, auto-like or auto-comment bots, automated DMs, or unofficial posting tools.
- Revealing the daughter's **name or image**, anywhere, ever. The story is fine to share.
- A campaign that needs daily attention and burns the artist out.

## Constraints

- **Budget:** $200 total, including any paid tool plans and ads.
- **No local automation.** The artist's computer isn't always on, so nothing can depend on a local cron job or script. All scheduling runs in the cloud on the platforms' or tools' own servers.
- **Official tools only.** Use each platform's own features, or schedulers that publish through official APIs.
- **The date isn't fixed.** Prep has no deadline. The release date is chosen at kickoff, once every asset is ready.

## Decisions the artist made

- All four songs release **together on one date**, as an EP.
- The story about the daughter's early arrival is shared. Her name and image are not.
- Use an off-the-shelf cloud scheduler rather than custom code: **Metricool**. The artist is setting up the account.
- The distributor is **DistroKid**.
- Don't lock a release date now. Plan in relative weeks, and pick the date when everything is ready.
- **Front-load everything.** All posts written and all clips cut before kickoff, with the campaign as automated as possible. Some manual work is fine, such as posting Instagram Stories by hand.
- **After release: "Option A".** All four videos come out on release day, followed by one wrap-up week. The other option, one video per week after release, was turned down.
- **Clips: Claude suggests them, the artist makes them.** Each post in `metricool/posts.toml` has clip instructions: which video, start and end times, on-screen text and finishing touches. The artist edits each clip from the 9:16 version of the video (the same edit as the 16:9, so the times match), uploads it to Google Drive and sends Claude the link. Claude adds the link to `posts.toml`. `metricool/preview.py` shows every post with its instructions and whether its clip is ready. Canvas loops stay the artist's call. (Changed 2026-10-31: originally the artist was going to pick every clip alone.)
- **Accounts:** Instagram, Facebook and YouTube are Hootin accounts. TikTok is the artist's personal account.
- **Personal messages go by DM only:** Facebook Messenger, Instagram or TikTok. No texts or emails. None of these apps can schedule messages, so the messages are written ahead and sent by hand.

## Tools

| Tool | Used for | Notes |
|---|---|---|
| **Metricool** | Scheduling every feed post to Instagram (Reels/posts), Facebook, TikTok and YouTube (Shorts and full videos) | Start on the free plan and upgrade if limits get in the way. Paid was about $20–25/month last checked (not re-verified). Every feed post is loaded in one go by importing a CSV. `metricool/build_csv.py` builds it from `metricool/posts.toml`. Metricool fetches each clip from a Google Drive link, and the link never appears in the post. Check that Import CSV is available on your plan. |
| **DistroKid** | Delivering the songs. Its **HyperFollow** page is the one link used everywhere | HyperFollow acts as a pre-save page before release and switches to "listen now" links on release day. Confirm this at kickoff. |
| **YouTube Studio** | Scheduling the release-day video(s) and the Premiere | Premieres give a countdown page with a "notify me" button. |
| **Spotify for Artists** | Pitching one song (gets it into followers' Release Radar) and uploading Canvas loops | The pitch must be in at least 7 days before release. It only works once the release appears in Spotify for Artists, a few days after the DistroKid upload. |
| **Facebook Messenger, Instagram DMs, TikTok DMs** | Personal messages to friends and family, written ahead and sent by hand | None of these can be scheduled, and automating DMs is off-limits (see anti-goals). On Facebook, the messages come from the artist's personal Messenger, because a Page can't start a conversation. Send them one by one, not as group messages. |
| **Meta Ads Manager** (or the "Boost" button) | Boosting clips on release week | Done by hand, so it can boost whichever clip actually did best. |
| **Instagram app** | Optional Stories by hand: link stickers, countdown sticker, reshared reactions | Schedulers can't add Story stickers. |
| **Hootin website** | A release page with the HyperFollow link, plus an announcement post | A Gatsby site on GitHub Pages, and its repo is this folder. It can't schedule anything: changes go live when deployed (`npm run deploy`). So the release page and the news post both go up on kickoff day (my call). |

**Budget split (my call):** up to about $50 for Metricool if the free plan isn't enough, and the remaining about $150 for release-week boosts aimed at current followers and their friends.

## The roadmap

Weeks count back from release day, **R**. The campaign runs **about 7 weeks** from kickoff day to the end of the wrap-up week.

### Phase 1: Get ready (no deadline)

Everything here gets finished before a date is picked:

- [ ] Cut **2–3 vertical clips (15–30s)** from each of the four 9:16 videos. Export the audio at 128 kbps or lower, because Instagram rejects anything higher.
- [ ] Cut **one teaser** that mixes all four songs.
- [ ] Cut short looping **Spotify Canvas** clips (3–8s, vertical) from each video.
- [ ] Upload every clip to **Google Drive**. Share each file as "Anyone with the link" with Editor access, which Metricool requires. Paste each share link into its post's `clip_url` in `metricool/posts.toml`. Keep the files there, shared, until the campaign ends.
- [ ] Write **every post caption** for the whole campaign, with `[DATE]` and `[LINK]` placeholders. Done: they're in `metricool/posts.toml`.
- [ ] Write the three **personal messages**: heads-up with pre-save, "it's out", and asking for feedback. Keep them short enough to paste and add a name to.
- [ ] Make the **list** of friends and family to message, noting which app reaches each person (Messenger, Instagram or TikTok).
- [ ] EP title and cover art, if not already done.
- [ ] Connect Instagram, Facebook, TikTok and YouTube to Metricool. Check first that the Hootin Instagram is a **Professional** (Creator or Business) account, which Metricool needs before it can publish. Also check that Metricool can publish to the personal TikTok account. If it can't, post the TikTok clips by hand, or use TikTok's own scheduler, which only works about 10 days ahead.

### Kickoff day (R−6, one sitting, about 2–3 hours)

- Pick a **Friday about 6 weeks out**. Friday is the industry release day and when Release Radar updates. Avoid holiday weeks.
- Upload to DistroKid with that date, and get the HyperFollow link.
- Load **every** feed post through the wrap-up week into Metricool:
  1. Fill in `[release]` at the top of `metricool/posts.toml`: the date, the EP title and the HyperFollow link.
  2. Run `python campaign/metricool/build_csv.py --test`. Import `metricool-test.csv` into Metricool. It holds one post, as drafts. Check that it shows up at the right time in your time zone and that the video plays. Then delete it.
  3. Run `python campaign/metricool/build_csv.py` and import `metricool-import.csv`, which has all 20 posts as 40 rows. Each post has one row for Instagram, TikTok and YouTube, and a separate row for Facebook because its caption carries the link.
- Upload the YouTube videos as scheduled for release day, and set up the Premiere.
- Put the HyperFollow link in every bio.
- Add the website release page and news post, then deploy the site.

### Phase 2: Lead-up (5 weeks)

About 3 feed posts a week. Each 9:16 post is cross-posted to Instagram Reels, TikTok, YouTube Shorts and Facebook from Metricool. One song per week. The song order is my guess and easy to swap.

| Week | Focus | Scheduled | By hand |
|---|---|---|---|
| **R−5** | **The story.** "These songs were meant to arrive with my daughter. She came six weeks early." Announce the date. | Story post, four-song teaser, website post | **Personal message #1** (heads-up + pre-save link). Optional: Story with a pre-save link sticker |
| **R−4** | **Faster Than Slow.** The pregnancy, becoming a dad, and not running from it. It follows straight on from the story. | Clip, a note on what the song is about, second clip | **Required (about 20 min):** once the release shows in Spotify for Artists, pitch a song and upload the Canvas loops. Optional: Stories. |
| **R−3** | **Old Glitch.** Electric alt-disco, set in a space station bar with two characters, Lena and old Jack, each dealing with tragedy alongside the other without either knowing. One post per character, opening on the "Come on in" hook. | Clip, character posts, second clip | Optional: Stories |
| **R−2** | **Stay Deranged.** Lead with the hook: _"Honestly, I might change if this world weren't so strange, maybe I should stay deranged."_ It opens as an acoustic song and builds into a rock anthem. | Clip, a note on the song, second clip | Optional: Stories |
| **R−1** | **Seasons.** The guilt of moving on from trauma into something more hopeful. It pairs with a reflective "finally finishing these" post. Countdown starts. | Clip, reflective post, countdown post | Optional: Story with a countdown sticker |

### Release week (R, Friday)

- **Scheduled:** the songs go live via DistroKid, along with "out now" posts on every platform.
- **By hand:** **personal message #2** ("it's out, here's the link").
- **Scheduled, YouTube:** all four videos go up on release day. My call is to make the **focus track** a Premiere and publish the other three at the same moment in an EP playlist. Four simultaneous Premieres would split the audience.
- **By hand (about 5 min):** boost the clip that did best during the lead-up.
- **Optional:** an "out now" Story with a listen link.

### Wrap-up week (R+1)

- **Scheduled:** a thank-you post.
- **By hand:** **personal message #3**, asking people what they thought.
- **Optional:** reshare friends' reactions to Stories, and reply to comments.

## How much work, and when

| When | Work |
|---|---|
| Phase 1 | All the creative work, at the artist's own pace |
| Kickoff day | About 2–3 hours in one sitting |
| During the campaign | **Required, by hand:** the Spotify pitch + Canvas (about 20 min, once), three rounds of personal messages (R−5, R and R+1; about 15–30 min each, depending on the list size), and about 5 min boosting on release week |
| Optional, weekly | About 15 min: Stories, replying to comments, checking Metricool for failed posts (it emails you if one fails). Also sharing the week's main post from the artist's personal Facebook, but only if many friends and family don't follow the Hootin page. |

## My calls (the artist can override any of these)

- **Release on a Friday, with a 5-week lead-up.** The last release had 2 weeks. Much longer than 5 risks people tuning out.
- **Song order:** Faster Than Slow → Old Glitch → Stay Deranged → Seasons.
- **Focus track:** _Faster Than Slow_. It gets the Spotify pitch and the YouTube Premiere because it's closest to the story.
- **Cadence:** about 3 feed posts a week, with the same clip cross-posted to all four platforms.
- **Posting time:** 6 pm in the brand's time zone, and 9 am for "Out now" on release day. The CSV needs fixed times, so Metricool's suggested times aren't used. Change it in `posts.toml`.
- **How posts go out:** Reels on Instagram and Facebook, also shown on the Instagram feed. Shorts on YouTube in the Music category. Public on TikTok. Hashtags go everywhere except Facebook.
- **Three waves of personal messages:** heads-up, out now, feedback.
- **How much of the story to tell.** The artist hasn't set the limits, so this plan stays conservative. The story is "these were meant to arrive with my daughter; she came six weeks early; the songs sat unfinished until now." The artist's wife isn't named, tagged or shown, and the hospital stay isn't described. Loosen this if the artist wants. Before kickoff, check that none of the four videos shows the daughter.
- **Spending:** Metricool free plan first. Boosts on release week, picked by hand.
- **"Never her image"** means no photo of her at all, including partial shots (a hand, a foot), silhouettes and ultrasounds.
- **Assets:** posts are built from the existing videos plus text overlays and captions. One optional addition: a 30–60 second phone video of the artist telling the story, for the R−5 post. It's the strongest single piece for a friends-and-family audience, but the campaign works without it.

## Left to whoever builds this out

- The exact captions, hashtags, post times and Story ideas.
- Whether the Old Glitch character posts use clips, stills or text.
- The wording of the three personal messages.
- The website release page's content.
- How assets are organized in this folder.
- Whether any scripting would speed up the prep work, such as batch-cutting clips with ffmpeg or drafting caption variations. It can run locally because prep doesn't need the computer to stay on. Nothing in the campaign itself may depend on a local machine.

## Inputs to gather before writing captions

- ~~Lyrics for all four songs.~~ Done: in `lyrics/`.
- ~~The video files.~~ Done: the 16:9 versions are in `videos/`. The artist cuts every clip, so the 9:16 files don't need to be here.
- ~~A short description of Old Glitch's characters.~~ Done: there are two, Lena and old Jack, as described in the lyrics.

## Still unknown

- The EP title, and whether cover art exists.
- Whether the artist already has Spotify for Artists access for Hootin.
- How active the Facebook and TikTok audiences are compared with Instagram.
- How many people are on the message list.
- Whether most friends and family follow the Hootin Facebook page, or only the artist's personal profile.
