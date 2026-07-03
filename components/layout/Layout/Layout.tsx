import React from "react";
import styles from "./Layout.module.scss";
import { useBuilderUiContext } from "../../../store";

export function Layout(props: React.PropsWithChildren<{}>) {
  const { previewMode } = useBuilderUiContext();
  return <div className={styles.layout} data-preview={previewMode}>{props.children}</div>;
}
