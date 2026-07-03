import React from "react";
import styles from "./Footer.module.scss";

export function Footer(props: React.PropsWithChildren<{}>) {
  return <footer className={styles.footer}>{props.children}</footer>;
}
