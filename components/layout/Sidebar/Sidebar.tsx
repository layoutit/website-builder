import React from "react";
import styles from "./Sidebar.module.scss";

export function Sidebar(props: React.PropsWithChildren<{}>) {
  return <aside className={styles.sidebar}>{props.children}</aside>;
}
