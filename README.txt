KARMA HEALING MEDITATION: install-as-an-app package
====================================================

Put these files on any free static host, open the web address on your phone,
and add it to your home screen. It then opens full screen, with its own icon,
and works offline after the first visit.

Files
  index.html            the app
  manifest.webmanifest  name, colours and icons for the home-screen install
  sw.js                 offline cache (service worker)
  icons/                app icons
  audio/session.mp3     the whole 19 minute session (about 11 MB)

Publish on GitHub Pages (free)
  1. On github.com, tap + then New repository. Name it, for example, "karma-healing".
     Set it to Public and create it. (Pages needs a public repo on free accounts.)
  2. Tap "uploading an existing file". Unzip this package first, then drag in
     everything INSIDE the folder: index.html, manifest.webmanifest, sw.js,
     and the icons and audio folders. index.html must sit at the top level of the repo.
     Tap Commit changes.
  3. Go to Settings, then Pages. Under "Build and deployment" choose
     Source: Deploy from a branch, Branch: main, Folder: / (root). Save.
  4. After a minute or two the page shows your address:
     https://YOUR-USERNAME.github.io/karma-healing/
     Open that on your phone.

Add to home screen
  iPhone (Safari):  Share button, then Add to Home Screen, then Add.
  Android (Chrome): menu (three dots), then Install app (or Add to Home screen).

Use it offline
  Open the app once while online and let it finish loading (the audio is about
  11 MB). After that it works with no connection.

If you change anything later
  Edit the files, then change VERSION in sw.js (for example "v1" to "v2").
  That makes phones fetch the new version instead of the saved copy.

Notes
  - The audio keeps playing when the screen locks in most mobile browsers.
    If your phone pauses it, make sure the app was opened from the home-screen
    icon and that Low Power Mode is off.
  - The design uses Google Fonts. Online it shows the full design; offline it
    uses the saved copy, or your phone's default fonts if it was never loaded.
  - The narration is an AI-generated voice.
