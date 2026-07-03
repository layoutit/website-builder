import React from "react";
import { MenuFlow } from "../../../types";
import { classname } from "../../../utils/classname";
import styles from "./Menu.module.scss";

interface MenuProps {
  flow?:MenuFlow;
  className?:string;
  style?: React.CSSProperties;
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
}

function getMenuFlow(flow?:MenuFlow){
  return flow === 'column'? styles.flowColumn : styles.flowRow
}

export function Menu(props: React.PropsWithChildren<MenuProps>) {
  return (
    <span
      className={classname(styles.menu, getMenuFlow(props.flow), props.className)}
      style={props.style}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
      {props.children}
    </span>
  );
}
