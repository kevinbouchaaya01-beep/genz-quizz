# What's Your Mind Age? — Gen Z quiz (GERE 210)

By Julien, Kevin Bou Chaaya & Christina Elias · Dr. Rania Skaily

| File | What it is |
|---|---|
| `index.html` | The quiz people open from the QR code |
| `results.html` | Live class results for the projector (auto-refreshes every 5 s) |
| `config.js` | **The only file you edit**: backend URL + names |
| `questions.js` | Questions, mind-age scoring, result labels |
| `stats.js` | Sends answers / reads them back / computes percentages |
| `style.css` | Look and feel |
| `google-apps-script.gs` | Backend code (goes in Google Sheets, NOT on GitHub) |

## Why a Google Sheet?
GitHub Pages only serves files: it can't store anything. So answers are sent to a
Google Sheet through a small Apps Script "web app". Free, no credit card, 5 minutes.

## Step 1: Put the site on GitHub Pages (no commands needed)
1. github.com → **+** (top right) → **New repository** → name it `genz-quiz` → **Public** → Create.
2. Click **uploading an existing file** → drag in every file **except** `google-apps-script.gs` → **Commit changes**.
3. Repo **Settings** → **Pages** → Source: **Deploy from a branch** → Branch: `main`, folder `/ (root)` → **Save**.
4. Wait ~1 minute and refresh. Your link appears: `https://YOUR-USERNAME.github.io/genz-quiz/`

## Step 2: Connect the class results (Google Sheet)
1. sheets.new → name it "Gen Z quiz".
2. **Extensions → Apps Script** → delete what's there → paste all of `google-apps-script.gs` → 💾 Save.
3. **Deploy → New deployment** → ⚙️ type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone** ← important, otherwise phones get blocked
4. **Deploy** → **Authorize access** → pick your account → "Google hasn't verified this app" → **Advanced** → **Go to (project) (unsafe)** → **Allow**.
   (It's "unverified" only because you wrote it yourself.)
5. Copy the **Web app URL** (ends in `/exec`).
6. On GitHub open `config.js` → ✏️ edit → paste the URL into `API_URL: ""` → Commit.

## Step 3: Test before class
- Open `.../genz-quiz/results.html?demo=1` → fake data, just to rehearse the reveal.
- Take the quiz once on your phone → a row appears in the Sheet → `results.html` shows 1 answer.
- **Then delete your test rows in the Sheet** (keep row 1, the headers) so class results start at 0.

## Beginner traps
- Changed the Apps Script code later? You must **Deploy → Manage deployments → ✏️ → Version: New version**, or the old code keeps running.
- GitHub Pages can take 1–2 minutes to show changes. Hard-refresh (Ctrl+Shift+R).
- Each phone is counted once (remembered in the browser). Retakes still show a result but aren't re-sent.
- The QR on `results.html` is made from the page's own address, so it's always right.
