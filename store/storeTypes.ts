export type EditorState = {
  activeBlockId: string;
  pendingBlockId: string;
  pendingHtml: string;
};

export const defaultEditorState: EditorState = {
  activeBlockId: "",
  pendingBlockId: "",
  pendingHtml: "",
};
