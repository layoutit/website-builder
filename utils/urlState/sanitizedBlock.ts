export type SanitizedBlockBase = {
  name: string;
  tag: string;
  class?: string;
  properties: { [key: string]: string };
  attributes?: { [key: string]: string };
  size?: string;
};

type SanitizedContainerBlock = SanitizedBlockBase & {
  container: true;
  content: SanitizedBlock[];
};

type SanitizedLeafBlock = SanitizedBlockBase & {
  container: false;
  content: string;
};

export type SanitizedBlock = SanitizedContainerBlock | SanitizedLeafBlock;
