# Hootin: website + EP release campaign

This folder holds two things:

1. **The Hootin website repo** (`nhoughto5/HootinMusic`, **public** on GitHub). It's a Gatsby site, with its source on `master`.
2. **The marketing campaign** for Hootin's four-song EP (*Stay Deranged*, *Faster Than Slow*, *Old Glitch*, *Seasons*). Everything for it lives in `campaign/`.

## What gets committed

The repo is **public**, and the artist chose (2026-11-01) to commit the campaign anyway. Treat everything committed as readable by anyone.
- **Committed:** `campaign/` and this file.
- **Never committed:**
  - `campaign/videos/`: each video is over GitHub's 100 MB file limit.
  - `campaign/GoogleDriveSync/`: the finished clips, which live on Google Drive.
  - The generated `metricool-*.csv` files.
  - `__pycache__/`.
  - All of these are in `.gitignore`.
- **Local only:** `.superpowers/` and `.claude/`, which hold tool state. They're listed in `.git/info/exclude`.
- Keep campaign files inside `campaign/`. Only put something into `src/` if it's meant to appear on the website.

## Campaign

**Source of truth: [campaign/marketing-plan.md](campaign/marketing-plan.md).** Read it before doing campaign work. When a decision changes, update the plan; don't repeat it here.

- The plan was approved on 2026-10-18.
- The release date is deliberately unpicked. It gets chosen on kickoff day, once every Phase 1 asset is ready.
- **Clips:** each post's `clip` table in `posts.toml` holds Claude's suggested clip and instructions, at the artist's request (2026-10-31). The artist makes the clip and sends a Google Drive link. Put it in that post's `clip_url`. Canvas loops stay the artist's call.
- **Preview:** `python campaign/metricool/preview.py` serves a live page of every post, with its clip instructions, players for the suggested moments, and a ready check. Use Chrome or Edge, because VS Code's built-in browser can't play MP4s.
- **Feed posts:** [campaign/metricool/posts.toml](campaign/metricool/posts.toml) is the only place captions live. `build_csv.py` next to it turns them into Metricool's import CSV. Run it with `--test` for a one-post draft file.
- **Everything else:** [campaign/content-calendar.md](campaign/content-calendar.md) holds the weekly by-hand tasks, the DM drafts, Story ideas, and the website and YouTube copy.

### Rules that never bend

- **Never use the daughter's name or any image of her.** That includes partial shots, silhouettes and ultrasounds. The repo is public, so her name must never appear in any file here either. The story stays at the conservative level set out in the plan unless the artist loosens it.
- **Official platform tools and APIs only.** No scraping, no auto-like or auto-comment bots, no automated DMs.
- **Nothing in the live campaign may depend on the artist's computer being on.** Local scripts are fine for prep only.
- **The budget is $200 total.**

### Tools and accounts

- **Metricool:** schedules every feed post to Instagram, Facebook, TikTok and YouTube.
- **DistroKid:** distribution, plus the HyperFollow link used everywhere.
- **YouTube Studio:** the release-day Premiere.
- **Spotify for Artists:** the song pitch and Canvas loops.
- **Meta Ads Manager:** release-week boosts.
- **DMs, sent by hand** on Messenger, Instagram and TikTok.
- **Accounts:** Instagram, Facebook and YouTube are Hootin accounts. TikTok is the artist's personal account.

## Website

- **Stack:** Gatsby.
  - Pages are in `src/pages/` (index, music, videos, streams, 30MinuteJams).
  - Data is in `src/content/*.json`, and images in `src/images/`.
  - The custom domain is set in `src/CNAME`.
- **Deploy:** `npm run deploy` builds the site and pushes `public/` to the `gh-pages` branch, which GitHub Pages serves.
- **No scheduling.** Changes go live when they're deployed.
- **Untested here:** `npm install` and the build haven't been run in this folder yet. The dependencies are several years old, and there are open dependabot branches.

## Folder

- `src/`, `gatsby-*.js`, `package.json`: the website (committed).
- `campaign/marketing-plan.md`: the plan.
- `campaign/content-calendar.md`: by-hand tasks week by week, plus the DMs and other copy.
- `campaign/metricool/`:
  - `posts.toml`: the feed posts.
  - `build_csv.py`: builds the import CSV.
  - `preview.py`: the live preview page. It reuses `build_csv.py`'s checks.
  - `template.csv`: the header row of Metricool's import template. If Metricool changes its template, replace this file.
  - The generated `metricool-*.csv` files also go here.
- `campaign/lyrics/`: the lyrics for all four songs, exactly as the artist wrote them.
- `campaign/videos/`: the four finished music videos, in `Horizontal/` (16:9) and `Vertical/` (9:16). They're the same edits, with identical lengths, so clip times work on both. Clips are cut from `Vertical/`. The artist's own recordings for the campaign (phone videos, voice-overs, demos) go in `Recorded/`.
- `campaign/GoogleDriveSync/`: Google Drive for desktop syncs this folder to Drive. Finished clips go here, and each one's share link goes in its post's `clip_url`. Deleting a file here deletes it from Drive too, which breaks any post that links to it.
- **DaVinci Resolve Studio 21** is installed and the artist edits in it. External scripting works from here: set `RESOLVE_SCRIPT_API` and `RESOLVE_SCRIPT_LIB`, add `Modules` to the path, and call `scriptapp("Resolve")` while Resolve is running. The API docs are `DaVinciResolveScript.pyi` and `README.md` in `C:\ProgramData\Blackmagic Design\DaVinci Resolve\Support\Developer\Scripting\`. Never modify the artist's existing projects (FasterThanSlow, Old_Glitch, Stay_Deranged, Seasons and others). Work only in projects made for the campaign.
- `.superpowers/brainstorm/`: mockups from planning. `roadmap-v2.html` is out of date in places. Where it disagrees with the plan, the plan wins.
