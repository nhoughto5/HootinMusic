# Hootin EP: Content Calendar

Everything for the campaign apart from the feed posts, week by week: what you do by hand, the DMs, Story ideas, and the website and YouTube copy. The overall plan is in [marketing-plan.md](marketing-plan.md).

**Feed posts live in [metricool/posts.toml](metricool/posts.toml):** every caption, clip link, YouTube title and the hashtags. `metricool/build_csv.py` turns that file into the CSV you import into Metricool. Edit captions there, not here.

## How to read this

- **Weeks** count back from release day (**R**, a Friday). Feed posts go out **Monday, Wednesday and Friday**.
- Each feed post goes to **Instagram, TikTok, YouTube Shorts and Facebook** from Metricool, using the same vertical clip.
- **Placeholders** get filled in on kickoff day:
  - `[EP TITLE]`
  - `[DATE]`: the release date, written like "Friday, March 5"
  - `[LINK]`: the DistroKid HyperFollow link. In `posts.toml`, the script writes "link in bio" for Instagram, TikTok and YouTube, and the link itself for Facebook.
- **The story stays conservative.** Your daughter is mentioned only as "my daughter". There's no name, no photo, and no hospital details, and your wife isn't named.

---

## R−5 · The story

**Scheduled:** Mon *The story* · Wed *Teaser* · Fri *How to help*
**DM #1, sent by hand on Monday or Tuesday after the story post is up.** The wording is in the DMs section below.
**Website:** nothing to do. The release page and news post went live on kickoff day, because the site can't schedule posts.
**Optional Story:** a pre-save link sticker with "Four new songs, [DATE]."

---

## R−4 · Faster Than Slow

**Scheduled:** Mon *Faster Than Slow* · Wed *Little hands over sound* · Fri *Cue the sunrise*
**Required this week:** once the release shows up in Spotify for Artists, pitch *Faster Than Slow* and upload the Canvas loops.
**Optional Story:** a "Cue the sunrise" lyric card with a poll: "Sunrise person or sunset person?"

---

## R−3 · Old Glitch

**Scheduled:** Mon *Come on in* · Wed *Lena* · Fri *Old Jack*
**Optional Story:** a poll: "Who are you buying a drink: Lena or old Jack?"

---

## R−2 · Stay Deranged

**Scheduled:** Mon *Starts quiet* · Wed *About the song* · Fri *Big ending*
**Optional Story:** a "what a state I'm in" lyric card, or a short behind-the-scenes shot from recording.

---

## R−1 · Seasons

**Scheduled:** Mon *Seasons* · Wed *Finally finishing these* · Fri *One week*
**Optional Story:** a countdown sticker set to release day. People can tap it to get a reminder.

---

## R · Release week

**Scheduled:** Mon *This Friday* · Thu *Tomorrow* · Fri *Out now* (9 am)
**Fri on YouTube (set up in YouTube Studio on kickoff day):** the *Faster Than Slow* Premiere, plus the other three videos published at the same moment in an "[EP TITLE]" playlist. Descriptions are in the YouTube section below.
**DM #2, sent by hand on Friday.**
**Optional Story:** "Out now" with a link sticker.
**By hand, Saturday or Sunday (about 5 min):** boost whichever lead-up clip did best.

---

## R+1 · Wrap-up

**Scheduled:** Tue *Your favorite* · Fri *Thank you* (cover art)
**DM #3, sent by hand mid-week.**
**Optional Stories:** reshare friends' posts and messages about the songs (with their OK).

---

## DMs

Send these one by one, by hand, from Messenger, Instagram or TikTok, depending on how you usually talk to each person. Start each one with their name. Change the wording for anyone you're especially close to.

**DM #1 · R−5 (heads-up)**
> Hey [name]! I finally finished the four songs I was working on before my daughter showed up six weeks early. They're coming out [DATE].
>
> If you've got ten seconds, this link lets you pre-save them so they land in your library on release day: [LINK]
>
> No pressure at all, I just wanted you to hear it from me first.

**DM #2 · R (release day)**
> They're out! [LINK]
>
> It would mean a lot if you gave them a listen this weekend. Faster Than Slow is the one closest to my heart.

**DM #3 · R+1 (feedback)**
> Thanks again for checking out the songs, if you got the chance. Honest question: which one did you like best?

**Who gets which:**
- Anyone who replies "I listened!" to DM #2 doesn't need DM #3. Just say thanks instead.
- Anyone who never replied to #1 or #2 still gets #3. It's the most low-key ask of the three.

---

## Website

**Release page.** Put this up on kickoff day and keep it live.
> **[EP TITLE]**: four new songs from Hootin, out [DATE].
>
> Before my daughter was born, I was finishing four songs. The plan was to put them out when she arrived. She showed up six weeks early, and the songs waited. They're finally done.
>
> [Pre-save / listen button → LINK]
>
> - **Faster Than Slow:** cue the sunrise.
> - **Old Glitch:** a bar on a space station, where the misfits meet.
> - **Stay Deranged:** starts quiet, ends loud.
> - **Seasons:** moving on, and the guilt that comes with it.

**News post (kickoff day, deployed with the release page).** Use the same text as the R−5 *The story* post in `posts.toml`, plus the button.

**On release day (optional, about 5 minutes):** add the four YouTube videos to the release page and redeploy.

---

## YouTube video descriptions

Use this for all four videos, and adjust the one-line description for each song:

> **[SONG]** by Hootin, from the EP [EP TITLE].
> [One line about the song, taken from its week's posts.]
>
> Listen everywhere: [LINK]
>
> Lyrics:
> [paste from the `lyrics/` folder]

---

## Clips

Every post's clip instructions are in `posts.toml`, and the checklist is the preview page:

    python campaign/metricool/preview.py

Make a clip, upload it to Google Drive (shared as "Anyone with the link", Editor), and send Claude the link. When the card turns green, it's ready.

- Export every clip with audio at **128 kbps or lower**, because Instagram rejects anything higher.
- A post that uses the cover art needs `type = "image"` in `posts.toml`. Image posts go to Instagram, TikTok (as a photo) and Facebook, but not YouTube.

That's **20 feed posts** in total, plus 4 videos on YouTube, 3 rounds of DMs, and the optional Stories.
