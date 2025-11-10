# Converted to Next.js

This project was converted from a Vite setup to Next.js (App Router).

What changed
- Removed Vite config files (not included here).
- Added Next.js app directory: ./app
- Reused your Vite components under ./src
- Created next.config.mjs
- Updated package.json scripts and dependencies
- Migrated global CSS to ./app/globals.css

How to run
1) npm install
2) npm run dev
3) Open http://localhost:3000

Notes
- app/page.tsx renders your existing App component if present.
- If you used external assets or index.html-only scripts, bring them into React components or the RootLayout.
- If you used path aliases, add them to tsconfig.json "paths" and optionally configure webpack aliases in next.config.mjs.

Files detected
- Vite configs: ['/mnt/data/work_vite_to_next/vite.config.ts']
- index.html: /mnt/data/work_vite_to_next/index.html