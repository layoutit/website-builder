import React from "react";
import styles from "./TextEditor.module.scss";
import { classname } from "../../../utils/classname";
import { normalizeEditorMarkup } from "./editorHtml";

interface TextEditorProps {
  value: string;
  className?: string;
  onChange?: (value: string | undefined) => void
}

export function TextEditor(props: TextEditorProps) {
  const { className, onChange, value } = props;
  const editorRef = React.useRef<HTMLDivElement>(null);

  const emitChange = React.useCallback(() => {
    const editor = editorRef.current;
    if (!editor) return;

    const normalized = normalizeEditorMarkup(editor.innerHTML);
    if (editor.innerHTML !== normalized) {
      editor.innerHTML = normalized;
    }
    onChange?.(normalized || undefined);
  }, [onChange]);

  React.useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    const normalized = normalizeEditorMarkup(value);
    if (editor.innerHTML !== normalized) {
      editor.innerHTML = normalized;
    }
  }, [value]);

  return (
    <span
      ref={editorRef}
      aria-label="Editable block content"
      className={classname(styles.textEditor, className)}
      contentEditable
      onBlur={emitChange}
      onInput={emitChange}
      role="textbox"
      suppressContentEditableWarning
    />
  );
}
