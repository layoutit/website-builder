import { BOOTSTRAP_COMPONENTS } from "../frameworks/bootstrap";
import { BOOTSTRAP_CONTAINER } from "../frameworks/bootstrap/components/container";
import { ComponentRegistry, IBlock, IFramework, IFrameworkComponent } from "../types";
import { withStableIds } from "./block";

export const frameworks: { [key: string]: IFramework } = {
  bootstrap: {
    initialBlock: BOOTSTRAP_CONTAINER([]),
    components: BOOTSTRAP_COMPONENTS,
  },
};

function createComponentRegistry(categories: IFrameworkComponent): ComponentRegistry {
  const registry: ComponentRegistry = {};

  Object.values(categories).forEach((category) => {
    category.components.forEach((descriptor) => {
      if (registry[descriptor.id]) {
        throw new Error(`duplicate component descriptor id: ${descriptor.id}`);
      }
      registry[descriptor.id] = descriptor;
    });
  });

  return Object.freeze(registry);
}

export function frameworkToComponents(categories: IFrameworkComponent): ComponentRegistry {
  return createComponentRegistry(categories);
}

export function getFrameworkComponents(framework: string): IFrameworkComponent {
  return frameworks[framework]?.components || frameworks.bootstrap.components;
};

export function getFrameworkInitialBlock(framework: string): IBlock {
  const initialBlock =
    frameworks[framework]?.initialBlock || frameworks.bootstrap.initialBlock;
  return withStableIds(initialBlock, "block");
}
