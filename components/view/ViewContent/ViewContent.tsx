import React from "react";
import { useDocumentContext } from "../../../store";
import { Block } from "../../common/Block";
import styles from "./ViewContent.module.scss";

export function ViewContent() {
  const { blockTree, framework } = useDocumentContext();

  return (
    <div className={`${styles.viewContent} ${framework}-view`}>
      <Block {...blockTree} />
    </div>
  );
}
