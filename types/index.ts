export type BlockAttributes = Record<string, string>;
type BlockProperties = Record<string, string>;
export type SelectedProperties = BlockProperties;
type PropertyDefinitions = Record<string, string>;

interface LayoutBlockBase {
  id: string;
  tag: string;
  name: string;
  class?: string;
  properties: BlockProperties;
  attributes?: BlockAttributes;
  size?: string;
}

interface LayoutContainerBlock extends LayoutBlockBase {
  container: true;
  content: LayoutBlock[];
}

interface LayoutLeafBlock extends LayoutBlockBase {
  container: false;
  content: string;
}

export type LayoutBlock = LayoutContainerBlock | LayoutLeafBlock;

interface BlockCapability {
  droppable?: boolean;
  removable?: boolean;
  labeled?: boolean;
  editable?: boolean;
  styledChild?: boolean;
  childless?: boolean;
  draggable?: boolean;
  exportable?: boolean;
  mainBlock?: boolean;
  mainContent?: boolean;
}

export interface BlockRuntime extends BlockCapability {
  availableProperties?: IAvailableProperties[];
  preview?: string;
}

interface BuilderBlockBase extends LayoutBlockBase, BlockRuntime {}

interface BuilderContainerBlock extends BuilderBlockBase {
  container: true;
  content: IBlock[];
}

interface BuilderLeafBlock extends BuilderBlockBase {
  container: false;
  content: string;
}

type BuilderBlock = BuilderContainerBlock | BuilderLeafBlock;
export type IBlock = BuilderBlock;

interface ComponentDescriptor {
  id: string;
  create: (seed?: string) => IBlock;
  mainContent?: boolean;
}

export type ComponentRegistry = Record<string, ComponentDescriptor>;

interface ICategory {
  name: string;
  description?: string;
  link?: string;
  linkText?: string;
  components: ComponentDescriptor[];
}

export interface IAvailableProperties {
  name: string;
  type: "list" | "boolean";
  properties: PropertyDefinitions;
}

export interface IFrameworkComponent {
  [key: string]: ICategory;
}

export interface IFrameworkAvailableProperties {
  [key: string]: IAvailableProperties[];
}

export type Backgrounds =
  | "primary"
  | "success"
  | "error"
  | "warning"
  | "secondary";

export type ButtonsVariants = "rounded" | "transparent";

export type MenuFlow = "row" | "column";

export type Frameworks = "bootstrap";

export interface IFramework {
  initialBlock: IBlock;
  components: IFrameworkComponent;
};

export interface IModal {
  title: string;
  subtitle?: string;
  body: JSX.Element,
  footer: JSX.Element
}
