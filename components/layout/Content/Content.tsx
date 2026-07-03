import React from "react";
import styles from "./Content.module.scss";

export function Content(props: React.PropsWithChildren<{}>) {
  return <main className={styles.content}>{props.children}</main>;
}
