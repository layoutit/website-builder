import React from "react";
import styles from "./Logo.module.scss";
import logoImg from "./ico128.png";

export function Logo() {
  return (
    <a href="/" className={styles.logo}>
      <img
        src={logoImg}
        alt="layoutit"
        width={22}
        height={22}
        className={styles.logoImage}
      />
      <span> Layoutit!</span>
    </a>
  );
}
