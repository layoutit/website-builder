# LayoutIt!

LayoutIt! is a visual Bootstrap 5 interface builder. It lets you compose responsive layouts in the browser, edit Bootstrap components, preview the result, and export clean HTML or a ready-to-run React project.

Use it at [build.layoutit.com](https://build.layoutit.com).

<img width="1826" height="680" alt="LayoutIt! interface builder preview" src="https://build.layoutit.com/social.png" />

## Features

- Drag Bootstrap grid rows, columns, and components onto a live canvas.
- Edit text content and Bootstrap class-based component options.
- Switch between edit and preview modes.
- View generated source for fragment HTML, full-page HTML, and React.
- Download a static Bootstrap project or a Vite React project.
- Share layouts through the URL.

## Stack

- Vite
- React
- TypeScript
- Bootstrap 5.3.8 export assets

## Development

Requires Node.js 22.

```sh
npm install
npm run dev
```

The local dev server binds to `127.0.0.1`.

## Build

```sh
npm run build
```

The production build is emitted to `dist`.

## Deploy

Build with `npm run build` and publish `dist` from your hosting provider.

## License

MIT.

Contact: info@layoutit.com
