import React from "react";
import {
  frameworkToComponents,
  getFrameworkComponents,
  getFrameworkInitialBlock,
} from "../utils/framework";
import { IBlock } from "../types";
import { useUrlStateSync } from "./useUrlStateSync";

export function useDocumentState() {
  const [framework, setFramework] = React.useState("bootstrap");
  const [blockTree, setBlockTree] = React.useState<IBlock>(
    getFrameworkInitialBlock(framework)
  );
  const frameworkComponents = React.useMemo(
    () => getFrameworkComponents(framework),
    [framework]
  );
  const components = React.useMemo(
    () => frameworkToComponents(frameworkComponents),
    [frameworkComponents]
  );

  useUrlStateSync({ blockTree, framework, setBlockTree, setFramework });

  return {
    blockTree,
    updateBlockTree: setBlockTree,
    framework,
    setFramework,
    frameworkComponents,
    components,
  };
}
