# The Baptism Invitation Website

A single-page, mobile-friendly baptism invitation with an envelope-opening intro, background music, a dove-and-light hero video circle, falling daisy petals, a live countdown, a photo gallery, a map, and WhatsApp RSVP.

## 1. Add your content

Open **`script.js`** and edit the `CONFIG` block at the very top — every field on the page pulls from here, so you only need to change it in one place:

```js
const CONFIG = {
  babyName: "Baby's Name",
  parents: "Parent One & Parent Two",
  godparents: "Godparent One & Godparent Two",
  childFullName: "Child's Full Name",
  eventDateISO: "2026-09-20T11:00:00",
  venueName: "St. Mary's Church",
  venueAddress: "123 Church Street, Your City",
  mapQuery: "St. Mary's Church, Your City",
  whatsappNumber: "491701234567",   // country code + number, digits only
  whatsappMessage: "Hello! We'd be delighted to attend the baptism celebration. 🕊️"
};
```

## 2. Add your media

Drop your files into `assets/` using these exact names (or update the paths in `index.html`):

| What | Path | Notes |
|---|---|---|
| Background music | `assets/audio/song.mp3` | Plays when the envelope is tapped open |
| Hero video | `assets/video/baptism-video.mp4` | Shown in the circular frame |
| Photos | `assets/images/photo1.jpg` … `photo6.jpg` | The 6-photo gallery |

If a photo or video is missing, that slot will simply show an "add photo" placeholder instead of breaking the page — so you can publish before all your media is ready and swap files in later.

## 3. Preview locally

Just open `index.html` in a browser. (Some browsers restrict audio/video autoplay from local files — it will work normally once hosted online.)

## 4. Publish with GitHub Pages

1. Create a new GitHub repository and upload all these files (keeping the folder structure).
2. Go to the repo's **Settings → Pages**.
3. Under "Build and deployment", set **Source: Deploy from a branch**, branch **main**, folder **/(root)**.
4. Save — your site will be live at `https://<your-username>.github.io/<repo-name>/` within a minute or two.

## Notes

- The countdown, map, and RSVP link all update automatically from `eventDateISO`, `mapQuery`, and `whatsappNumber` in `CONFIG` — no need to touch `index.html` for text changes.
- Keep video and audio files reasonably small (a few MB) so the page loads quickly on mobile data.
- Want a different accent color or font pairing? The color and font variables are at the top of `style.css` under `:root`.
