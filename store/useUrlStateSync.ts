import React from "react";
import { IBlock } from "../types";
import { hasLayoutStateChanged, writeLayoutStateToUrl } from "../utils/urlState";
import { loadInitialUrlState } from "./urlStateInitial";

type UrlStateSyncOptions = {
  blockTree: IBlock;
  framework: string;
  setBlockTree: React.Dispatch<React.SetStateAction<IBlock>>;
  setFramework: React.Dispatch<React.SetStateAction<string>>;
};

export function useUrlStateSync({
  blockTree,
  framework,
  setBlockTree,
  setFramework,
}: UrlStateSyncOptions) {
  const [hasLoadedUrlState, setHasLoadedUrlState] = React.useState(false);
  const [syncUrlState, setSyncUrlState] = React.useState(false);
  const initialEncodedLayoutRef = React.useRef<string | null>(null);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const initialState = loadInitialUrlState(window.location.href);
    initialEncodedLayoutRef.current = initialState.initialEncodedLayout;
    if (initialState.framework) setFramework(initialState.framework);
    if (initialState.blockTree) setBlockTree(initialState.blockTree);
    if (initialState.syncUrlState) setSyncUrlState(true);
    setHasLoadedUrlState(true);
  }, [setBlockTree, setFramework]);

  React.useEffect(() => {
    if (!hasLoadedUrlState || syncUrlState) return;
    if (hasLayoutStateChanged(blockTree, initialEncodedLayoutRef.current)) {
      setSyncUrlState(true);
    }
  }, [blockTree, hasLoadedUrlState, syncUrlState]);

  React.useEffect(() => {
    if (!hasLoadedUrlState || typeof window === "undefined" || !syncUrlState) return;

    writeLayoutStateToUrl({
      blockTree,
      framework,
      initialEncodedLayout: initialEncodedLayoutRef.current,
      locationHref: window.location.href,
    });
  }, [blockTree, framework, hasLoadedUrlState, syncUrlState]);
}
