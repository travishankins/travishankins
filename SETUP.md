# Setup — `travishankins/travishankins` profile repo

This folder is a starter for your **special** GitHub profile repo.
The repo name MUST exactly match your username: `travishankins`.

## 1. Create the repo on GitHub

1. Go to https://github.com/new
2. Repository name: **travishankins** (must match your username exactly)
3. Make it **Public**
4. Check **Add a README file** is OK to leave unchecked — we have one.
5. Create the repo.

## 2. Push this folder

From inside this directory:

```sh
cd /Users/travis/Developer/github-home/travishankins
git init -b main
git add .
git commit -m "feat: initial profile README"
git remote add origin git@github.com:travishankins/travishankins.git
git push -u origin main
```

## 3. Verify it shows up

Visit https://github.com/travishankins — the README will render on your profile.

## 4. Wire up the dynamic bits

### Spotify "now playing"

Uses [`spotify-recently-played-readme`](https://github.com/JeffreyCA/spotify-recently-played-readme)
which is a hosted Vercel function. To enable:

1. Go to https://spotify-recently-played-readme.vercel.app
2. Click **Login with Spotify** and authorize.
3. Make sure your Spotify username `travishankins` is correct (check at
   https://open.spotify.com/account → Profile → username). Update the URL in
   `README.md` if it differs.

### Latest blog posts

Edit `.github/workflows/blog-post-workflow.yml` and set `feed_list:` to
your actual RSS feed(s). Common examples:

- Dev.to: `https://dev.to/feed/<username>`
- Medium: `https://medium.com/feed/@<username>`
- Hashnode: `https://<you>.hashnode.dev/rss.xml`
- Personal blog: whatever your platform exposes

The workflow runs hourly and rewrites the lines between
`<!-- BLOG-POST-LIST:START -->` and `<!-- BLOG-POST-LIST:END -->` in the README.

If you don't blog, just delete the `### ✍️ Latest Blog Posts` section and
the `blog-post-workflow.yml` file.

### Recently active repos

The `recent-repos.yml` workflow runs every 6 hours, asks the GitHub API for
your 5 most-recently-pushed public, non-fork, non-archived repos, and renders
them as `github-readme-stats` pin cards between the
`<!-- RECENT-REPOS:START -->` / `<!-- RECENT-REPOS:END -->` markers.
No configuration needed — the username is set in the workflow's `env`.
To change how many repos appear, tweak `REPO_COUNT` in
`.github/workflows/recent-repos.yml`.

### Recent GitHub activity

The `recent-activity.yml` workflow uses
[`github-activity-readme`](https://github.com/jamesgeorge007/github-activity-readme)
to inject your last 5 public events between `<!--START_SECTION:activity-->`
markers. No config needed — it uses the built-in `GITHUB_TOKEN`.

> **Note:** for the workflow to push commits back to the repo, go to:
> Repo → **Settings** → **Actions** → **General** → **Workflow permissions** →
> select **Read and write permissions** → Save.

### Stats cards

[`github-readme-stats`](https://github.com/anuraghazra/github-readme-stats) and
[`github-readme-streak-stats`](https://github.com/DenverCoder1/github-readme-streak-stats)
work out of the box. To include private contributions and all-time commits,
the public defaults are fine; for the most accurate counts you can self-host
those services later.

## 5. Tweak

- Update **About**, **Tech**, and the badges row in `README.md`.
- Pin 4–6 of your best repos on your profile (separate UI on github.com).
- Consider adding a hero image or banner if you want more personality.

That's it. Push and you're live.
