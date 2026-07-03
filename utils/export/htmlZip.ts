import JSZip from "jszip";
import { type ExportMetadata } from "./metadata";
import { addBootstrapAssets } from "./publicAssets";

export async function createHtmlZip(
  sourceCode: string,
  metadata: ExportMetadata
) {
  const zip = new JSZip();
  const htmlTemplate = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${metadata.escapedTitle}</title>
    <meta name="description" content="${metadata.escapedDescription}" />
    <link rel="stylesheet" href="./bootstrap.min.css" />
  </head>
  <body>
    ${sourceCode}
    <script src="./bootstrap.bundle.min.js"></script>
  </body>
</html>
`;

  const packageJson = JSON.stringify(
    {
      name: metadata.packageName,
      version: "0.0.0",
      private: true,
      description: metadata.description,
    },
    null,
    2
  );

  zip.file("layoutit/index.html", htmlTemplate);
  zip.file("layoutit/package.json", packageJson);
  await addBootstrapAssets(zip, "layoutit");

  return zip;
}
