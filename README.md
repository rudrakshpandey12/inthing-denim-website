# Inthing — Denim, With Intent

A responsive single-page React/Vite website for Inthing Jeans.

## What is included

- React + Vite
- Framer Motion animations
- Lucide React icons
- Light/dark theme toggle
- Responsive mobile navigation
- Scroll progress indicator
- Editorial / textile-inspired sections
- Interactive denim story cards
- Impact / workforce statistics section
- Contact links and Instagram link
- Vercel-ready build
- No backend, database or paid UI library

## Important content note

The "60% women in our workforce" statistic was included because it was requested in the brief. It is marked in the code as a client-provided figure that must be verified before production launch.

## Image note

The starter project references the current Inthing website's public image URLs for the supplied brand visuals and uses a few Unsplash denim textures for supporting visuals. For production, download approved client-owned images into `public/assets/` and replace the URLs in `src/data.js`.

The current Inthing site was used as the content/asset reference:
https://www.inthingjeans.com/

The visual direction is inspired by the editorial structure, typography scale, storytelling, business/impact sections and motion language of the reference site:
https://www.arvind.com/

This is an original Inthing implementation, not a pixel-for-pixel copy of Arvind's site.

## Run locally in VS Code

### 1. Install Node.js

Use the current LTS release of Node.js.

### 2. Open the project

Unzip the project and open the `inthing-denim-site` folder in VS Code.

### 3. Open the VS Code terminal

Run:

```bash
npm install
npm run dev
```

Vite will show a local URL, normally:

```text
http://localhost:5173
```

Open it in Chrome.

### 4. Create the production build

```bash
npm run build
```

Then test the production build:

```bash
npm run preview
```

## Deploy to Vercel

### Option A — GitHub

1. Create a GitHub repository.
2. Upload this project.
3. Go to Vercel.
4. Import the GitHub repository.
5. Framework: Vite should be detected automatically.
6. Build command: `npm run build`
7. Output directory: `dist`
8. Deploy.

### Option B — Vercel CLI

```bash
npm install -g vercel
vercel
```

Follow the prompts.

## Where to edit client content

Most content and image URLs are in:

```text
src/data.js
```

For example:

- brand name
- tagline
- statistics
- phone
- email
- image URLs

## Where to edit design

All visual styling is in:

```text
src/styles.css
```

Main design variables are at the top:

```css
--bg
--surface
--text
--muted
--line
--accent
--font-body
--font-display
```

## Production recommendation

Before launch:

- Replace placeholder/stock supporting images with client-approved photography.
- Verify every statistic.
- Confirm the final logo asset and trademark usage.
- Confirm contact details.
- Add Privacy Policy / Cookie Policy if required.
- Add analytics only after client approval.
- If e-commerce is needed, connect the product/catalog backend separately.

## Font note

The exact proprietary/internal font configuration used by the current Arvind implementation could not be reliably verified from the public page crawl. This starter therefore uses a close modern editorial combination (DM Sans + Space Grotesk), with the font variables centralized in `src/styles.css` so the approved font can be swapped in one place.
