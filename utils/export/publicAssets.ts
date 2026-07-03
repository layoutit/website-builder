import JSZip from "jszip";

const BOOTSTRAP_ASSETS = ["bootstrap.min.css", "bootstrap.bundle.min.js"] as const;

const readPublicAsset = async (fileName: string) => {
  try {
    const response = await fetch(`/${fileName}`);
    if (!response.ok) return null;
    return await response.arrayBuffer();
  } catch {
    return null;
  }
};

export async function addBootstrapAssets(zip: JSZip, destination: string) {
  await Promise.all(
    BOOTSTRAP_ASSETS.map(async (asset) => {
      const assetBuffer = await readPublicAsset(asset);
      if (assetBuffer) zip.file(`${destination}/${asset}`, assetBuffer);
    })
  );
}
