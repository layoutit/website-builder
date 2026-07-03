import JSZip from "jszip";
import { type ExportMetadata } from "./metadata";
import { addBootstrapAssets } from "./publicAssets";

export async function createReactZip(
  reactMarkup: string,
  metadata: ExportMetadata
) {
  const zip = new JSZip();

  const appTemplate = `import React from "react";

export default function App() {
  return (
    <>
      <br />
    </>
  );
}
`;
  const appContent = appTemplate.replace("<br />", reactMarkup);

  const mainTemplate = `import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`;

  const indexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${metadata.escapedTitle}</title>
    <meta name="description" content="${metadata.escapedDescription}" />
    <link rel="stylesheet" href="/bootstrap.min.css" />
  </head>
  <body>
    <div id="root"></div>
    <script src="/bootstrap.bundle.min.js"></script>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;

  const viteConfig = `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
`;

  const tsconfig = `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
`;

  const tsconfigNode = `{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
`;

  const packageJson = JSON.stringify(
    {
      name: metadata.packageName,
      private: true,
      version: "0.0.0",
      type: "module",
      description: metadata.description,
      scripts: {
        dev: "vite",
        build: "tsc -b && vite build",
        preview: "vite preview",
      },
      dependencies: {
        react: "18.2.0",
        "react-dom": "18.2.0",
      },
      devDependencies: {
        "@types/react": "18.3.31",
        "@types/react-dom": "18.3.7",
        "@vitejs/plugin-react": "^6.0.3",
        typescript: "5.9.3",
        vite: "^8.1.3",
      },
    },
    null,
    2
  );

  zip.file("layoutit-react/index.html", indexHtml);
  zip.file("layoutit-react/src/App.tsx", appContent);
  zip.file("layoutit-react/src/main.tsx", mainTemplate);
  zip.file("layoutit-react/src/index.css", "");
  zip.file("layoutit-react/package.json", packageJson);
  zip.file("layoutit-react/vite.config.ts", viteConfig);
  zip.file("layoutit-react/tsconfig.json", tsconfig);
  zip.file("layoutit-react/tsconfig.node.json", tsconfigNode);
  await addBootstrapAssets(zip, "layoutit-react/public");

  return zip;
}
