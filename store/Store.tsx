import React from "react";
import { useBlockTreeActions } from "./blockTreeActions";
import { useBuilderUiState } from "./useBuilderUiState";
import { useDocumentState } from "./useDocumentState";

type DocumentState = ReturnType<typeof useDocumentState>;
type BuilderUiState = ReturnType<typeof useBuilderUiState>;
type BlockActions = ReturnType<typeof useBlockTreeActions>;

type DocumentContextValue = Pick<
  DocumentState,
  "blockTree" | "updateBlockTree" | "framework" | "setFramework"
>;
type CatalogContextValue = Pick<
  DocumentState,
  | "components"
  | "frameworkComponents"
  | "framework"
  | "setFramework"
>;
type EditorContextValue = Pick<
  BuilderUiState,
  "editorState" | "setEditorState" | "closeEditor"
>;
type BuilderUiContextValue = Omit<
  BuilderUiState,
  "editorState" | "setEditorState" | "closeEditor"
>;

const DocumentContext = React.createContext<DocumentContextValue | undefined>(undefined);
const CatalogContext = React.createContext<CatalogContextValue | undefined>(undefined);
const BlockActionsContext = React.createContext<BlockActions | undefined>(undefined);
const EditorContext = React.createContext<EditorContextValue | undefined>(undefined);
const BuilderUiContext = React.createContext<BuilderUiContextValue | undefined>(undefined);

function useRequiredContext<T>(context: React.Context<T | undefined>, name: string): T {
  const value = React.useContext(context);
  if (!value) throw new Error(`${name} must be used inside StoreProvider`);
  return value;
}

export function StoreProvider(props: React.PropsWithChildren<{}>) {
  const documentState = useDocumentState();
  const uiState = useBuilderUiState();
  const blockTreeActions = useBlockTreeActions({
    components: documentState.components,
    setBlockTree: documentState.updateBlockTree,
  });
  const documentValue = React.useMemo<DocumentContextValue>(
    () => ({
      blockTree: documentState.blockTree,
      updateBlockTree: documentState.updateBlockTree,
      framework: documentState.framework,
      setFramework: documentState.setFramework,
    }),
    [
      documentState.blockTree,
      documentState.framework,
      documentState.setFramework,
      documentState.updateBlockTree,
    ]
  );
  const catalogValue = React.useMemo<CatalogContextValue>(
    () => ({
      components: documentState.components,
      frameworkComponents: documentState.frameworkComponents,
      framework: documentState.framework,
      setFramework: documentState.setFramework,
    }),
    [
      documentState.components,
      documentState.framework,
      documentState.frameworkComponents,
      documentState.setFramework,
    ]
  );
  const editorValue = React.useMemo<EditorContextValue>(
    () => ({
      editorState: uiState.editorState,
      setEditorState: uiState.setEditorState,
      closeEditor: uiState.closeEditor,
    }),
    [uiState.closeEditor, uiState.editorState, uiState.setEditorState]
  );
  const builderUiValue = React.useMemo<BuilderUiContextValue>(
    () => ({
      dropAreaHeight: uiState.dropAreaHeight,
      setDropAreaHeight: uiState.setDropAreaHeight,
      allowDropElement: uiState.allowDropElement,
      setAllowDropElement: uiState.setAllowDropElement,
      previewMode: uiState.previewMode,
      setPreviewMode: uiState.setPreviewMode,
      openModal: uiState.openModal,
      setOpenModal: uiState.setOpenModal,
      typecode: uiState.typecode,
      setTypecode: uiState.setTypecode,
    }),
    [
      uiState.allowDropElement,
      uiState.dropAreaHeight,
      uiState.openModal,
      uiState.previewMode,
      uiState.setAllowDropElement,
      uiState.setDropAreaHeight,
      uiState.setOpenModal,
      uiState.setPreviewMode,
      uiState.setTypecode,
      uiState.typecode,
    ]
  );

  return (
    <DocumentContext.Provider value={documentValue}>
      <CatalogContext.Provider value={catalogValue}>
        <BlockActionsContext.Provider value={blockTreeActions}>
          <EditorContext.Provider value={editorValue}>
            <BuilderUiContext.Provider value={builderUiValue}>
              {props.children}
            </BuilderUiContext.Provider>
          </EditorContext.Provider>
        </BlockActionsContext.Provider>
      </CatalogContext.Provider>
    </DocumentContext.Provider>
  );
}

export function useDocumentContext() {
  return useRequiredContext(DocumentContext, "useDocumentContext");
}

export function useCatalogContext() {
  return useRequiredContext(CatalogContext, "useCatalogContext");
}

export function useBlockActionsContext() {
  return useRequiredContext(BlockActionsContext, "useBlockActionsContext");
}

export function useEditorContext() {
  return useRequiredContext(EditorContext, "useEditorContext");
}

export function useBuilderUiContext() {
  return useRequiredContext(BuilderUiContext, "useBuilderUiContext");
}
