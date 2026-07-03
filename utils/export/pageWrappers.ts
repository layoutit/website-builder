const BOOTSTRAP_VERSION = "5.3.8";
const DEFAULT_TITLE = "layoutit-project";

export function wrapBootstrapFullPage(htmlSource: string) {
  const htmlBody = htmlSource
    .split("\n")
    .map((line) => `  ${line}`)
    .join("\n");

  return [
    "<!doctype html>",
    '<html lang="en">',
    "<head>",
    '  <meta charset="utf-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1">',
    `  <title>${DEFAULT_TITLE}</title>`,
    `  <link href="https://cdn.jsdelivr.net/npm/bootstrap@${BOOTSTRAP_VERSION}/dist/css/bootstrap.min.css" rel="stylesheet">`,
    "</head>",
    "<body>",
    htmlBody,
    `  <script src="https://cdn.jsdelivr.net/npm/bootstrap@${BOOTSTRAP_VERSION}/dist/js/bootstrap.bundle.min.js"></script>`,
    "</body>",
    "</html>",
  ].join("\n");
}
