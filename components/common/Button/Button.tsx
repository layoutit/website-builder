import React from "react";
import { Backgrounds, ButtonsVariants } from "../../../types";
import { classname } from "../../../utils/classname";
import styles from "./Button.module.scss";

interface ButtonProps {
  className?: string;
  background?: Backgrounds;
  variant?: ButtonsVariants;
  icon?: JSX.Element;
  disabled?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  href?: string;
  bold?: boolean;
  small?: boolean;
}

function getButtonBackground(background?: Backgrounds) {
  switch (background) {
    case "success":
      return styles.success;
    case "error":
      return styles.error;
    case "warning":
      return styles.warning;
    case "secondary":
      return styles.secondary;
    case "primary":
      return styles.primary;
    default:
      return null;
  }
}

function getButtonType(variant?: ButtonsVariants) {
  return variant === "rounded" ? styles.rounded : styles.transparent;
}

export function Button(props: React.PropsWithChildren<ButtonProps>) {
  const content = (
    <span className={styles.content}>
      {props.icon}
      {props.children}
    </span>
  );

  if (props.href)
    return (
      <a
        target="_blank"
        rel="noreferrer"
        href={props.href}
        aria-disabled={props.disabled || undefined}
        className={classname(
          styles.button,
          getButtonType(props.variant),
          props.disabled
            ? styles.disable
            : getButtonBackground(props.background),
          props.className
        )}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
      >
        {content}
      </a>
    );

  return (
    <button
      onClick={props.onClick}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      className={classname(
        styles.button,
        getButtonType(props.variant),
        props.disabled ? styles.disable : getButtonBackground(props.background),
        props.bold && styles.bold,
        props.small && styles.small,
        props.className
      )}
      type="button"
      disabled={props.disabled}
    >
      {content}
    </button>
  );
}
