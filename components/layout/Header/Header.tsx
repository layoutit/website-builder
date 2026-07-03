import React from "react";
import styles from "./Header.module.scss";

export function Header(props: React.PropsWithChildren<{}>) {
  return <header className={styles.header}>{props.children}</header>;
}
