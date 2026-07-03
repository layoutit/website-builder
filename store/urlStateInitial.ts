import { IBlock } from "../types";
import { getFrameworkInitialBlock, frameworks } from "../utils/framework";
import { encodeLayoutState, readLayoutStateFromUrl } from "../utils/urlState";

const DEFAULT_FRAMEWORK = "bootstrap";

type InitialUrlState = {
  blockTree?: IBlock;
  framework?: string;
  initialEncodedLayout: string;
  syncUrlState: boolean;
};

function getSafeFramework(framework?: string) {
  return framework && frameworks[framework] ? framework : DEFAULT_FRAMEWORK;
}

export function loadInitialUrlState(locationHref: string): InitialUrlState {
  const urlState = readLayoutStateFromUrl(locationHref);
  const safeFramework = getSafeFramework(urlState.framework);
  const fallbackFramework = urlState.framework ? safeFramework : DEFAULT_FRAMEWORK;
  const fallbackBlockTree = getFrameworkInitialBlock(fallbackFramework);
  const initialBlockTree = urlState.blockTree ?? fallbackBlockTree;

  return {
    blockTree: urlState.blockTree ?? (urlState.framework ? fallbackBlockTree : undefined),
    framework: urlState.framework ? safeFramework : undefined,
    initialEncodedLayout: encodeLayoutState(initialBlockTree),
    syncUrlState: urlState.hasLayoutParam,
  };
}
