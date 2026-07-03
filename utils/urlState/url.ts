import { IBlock } from "../../types";
import { FRAMEWORK_QUERY_KEY, LAYOUT_QUERY_KEY } from "./constants";
import { decodeLayoutState, encodeLayoutState, getDefaultLayoutState } from "./codec";
import { replaceOnlyLayoutHistory } from "./history";

export function readLayoutStateFromUrl(locationHref: string) {
  const url = new URL(locationHref);
  const encodedLayout = url.searchParams.get(LAYOUT_QUERY_KEY);
  const hasLayoutParam = !!encodedLayout;
  const framework = url.searchParams.get(FRAMEWORK_QUERY_KEY) || undefined;
  const decodedLayout = encodedLayout
    ? decodeLayoutState(encodedLayout) || undefined
    : undefined;
  const fallbackLayout = !decodedLayout ? getDefaultLayoutState() : undefined;
  const blockTree = decodedLayout || fallbackLayout;

  return { blockTree, framework, hasLayoutParam };
}

export function hasLayoutStateChanged(
  blockTree: IBlock,
  initialEncodedLayout: string | null
) {
  return !!initialEncodedLayout && encodeLayoutState(blockTree) !== initialEncodedLayout;
}

export function writeLayoutStateToUrl(options: {
  blockTree: IBlock;
  framework: string;
  initialEncodedLayout: string | null;
  locationHref: string;
}) {
  const currentEncoded = encodeLayoutState(options.blockTree);
  const url = new URL(options.locationHref);

  if (options.initialEncodedLayout && currentEncoded === options.initialEncodedLayout) {
    url.searchParams.delete(LAYOUT_QUERY_KEY);
  } else {
    url.searchParams.set(LAYOUT_QUERY_KEY, currentEncoded);
  }

  if (options.framework) {
    url.searchParams.set(FRAMEWORK_QUERY_KEY, options.framework);
  } else {
    url.searchParams.delete(FRAMEWORK_QUERY_KEY);
  }

  const nextUrl = url.toString();
  replaceOnlyLayoutHistory.write(nextUrl, options.locationHref);
}
