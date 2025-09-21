# ISS Mission Control

This is a simple Next.js app (bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app)) that displays the current location of the International Space Station (ISS) on an interactive 3D globe, along with basic information about the current crew aboard the ISS. The app fetches live data from public APIs and updates the ISS position every few seconds.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

Note that a valid Google Maps API key is required to display the map - see `.env.example` for details.

## Credits

This app uses open source data from:

- ["Where the ISS at?" API](https://wheretheiss.at/w/developer) - for live ISS location data and orbital specs.
- [Open Notify API](http://open-notify.org/) - for current active crew data.
