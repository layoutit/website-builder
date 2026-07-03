import { BlockAttributes, IBlock, SelectedProperties } from "../types";

type TreeUpdate = {
  tree: IBlock;
  found: boolean;
};

type TreeRemoval = {
  tree: IBlock;
  removed?: IBlock;
};

function insertChildBlock(content: IBlock[], block: IBlock, siblingID?: string) {
  const siblingIndex = content.findIndex((child) => child.id === siblingID);
  const insertIndex = siblingIndex + 1;

  return [
    ...content.slice(0, insertIndex),
    block,
    ...content.slice(insertIndex),
  ];
}

function replaceChildAt(tree: IBlock, index: number, child: IBlock): IBlock {
  if (!tree.container) return tree;

  return {
    ...tree,
    content: [
      ...tree.content.slice(0, index),
      child,
      ...tree.content.slice(index + 1),
    ],
  };
}

function updateFirstBlock(
  tree: IBlock,
  id: string,
  updateBlock: (block: IBlock) => IBlock
): TreeUpdate {
  if (tree.id === id) return { tree: updateBlock(tree), found: true };
  if (!tree.container) return { tree, found: false };

  for (let childIndex = 0; childIndex < tree.content.length; childIndex++) {
    const child = tree.content[childIndex];
    const result = updateFirstBlock(child, id, updateBlock);

    if (result.found) {
      return {
        tree: replaceChildAt(tree, childIndex, result.tree),
        found: true,
      };
    }
  }

  return { tree, found: false };
}

function updateTreeBlock(
  tree: IBlock,
  id: string,
  updateBlock: (block: IBlock) => IBlock
): IBlock {
  return updateFirstBlock(tree, id, updateBlock).tree;
}

function removeChildBlock(tree: IBlock, id: string): TreeRemoval {
  if (!tree.container) return { tree };

  const childIndex = tree.content.findIndex((block) => block.id === id);
  if (childIndex >= 0) {
    const removed = tree.content[childIndex];

    return {
      tree: {
        ...tree,
        content: [
          ...tree.content.slice(0, childIndex),
          ...tree.content.slice(childIndex + 1),
        ],
      },
      removed,
    };
  }

  for (let childIndex = 0; childIndex < tree.content.length; childIndex++) {
    const child = tree.content[childIndex];
    const result = removeChildBlock(child, id);

    if (result.removed) {
      return {
        tree: replaceChildAt(tree, childIndex, result.tree),
        removed: result.removed,
      };
    }
  }

  return { tree };
}

function hasTreeBlock(tree: IBlock, id: string | undefined): boolean {
  if (!id) return false;
  if (tree.id === id) return true;

  return tree.container
    ? tree.content.some((block) => hasTreeBlock(block, id))
    : false;
}

export function addTreeBlock(
  tree: IBlock,
  parentID: string,
  block: IBlock,
  siblingID?: string
): IBlock {
  return updateTreeBlock(tree, parentID, (parent) =>
    parent.container
      ? { ...parent, content: insertChildBlock(parent.content, block, siblingID) }
      : parent
  );
}

export function removeTreeBlock(tree: IBlock, id: string): IBlock {
  return removeChildBlock(tree, id).tree;
}

export function replaceTreeBlock(
  tree: IBlock,
  id: string,
  replacement: IBlock
): IBlock {
  return updateTreeBlock(tree, id, () => replacement);
}

export function updateTreeBlockProperties(
  tree: IBlock,
  id: string,
  selectedProperties: SelectedProperties
): IBlock {
  return updateTreeBlock(tree, id, (block) => ({
    ...block,
    properties: selectedProperties,
  }));
}

export function updateTreeBlockAttributes(
  tree: IBlock,
  id: string,
  attributes: BlockAttributes | undefined
): IBlock {
  return updateTreeBlock(tree, id, (block) => ({
    ...block,
    attributes,
  }));
}

export function updateTreeBlockContent(
  tree: IBlock,
  id: string,
  content: string | IBlock[]
): IBlock {
  return updateTreeBlock(tree, id, (block) =>
    Array.isArray(content)
      ? { ...block, container: true, content }
      : { ...block, container: false, content }
  );
}

export function getTreeBlockParent(tree: IBlock, id: string): IBlock | undefined {
  if (!tree.container) return undefined;
  if (tree.content.some((block) => block.id === id)) return tree;

  for (const block of tree.content) {
    const parent = getTreeBlockParent(block, id);
    if (parent) return parent;
  }

  return undefined;
}

export function moveTreeBlock(
  tree: IBlock,
  parentID: string,
  id: string,
  siblingID?: string
): IBlock {
  if (id === parentID || id === siblingID) return tree;

  const removal = removeChildBlock(tree, id);
  if (
    !removal.removed ||
    hasTreeBlock(removal.removed, parentID) ||
    hasTreeBlock(removal.removed, siblingID)
  ) {
    return tree;
  }

  return addTreeBlock(removal.tree, parentID, removal.removed, siblingID);
}
