import React from "react";
import styles from "./Accordion.module.scss";
import { useAccordionStore } from "./useAccordionStore";
import { classname } from "../../../utils/classname";

export function Accordion(
  props: React.PropsWithChildren<{
    title: string;
    tooltipDescription?: string;
    tooltipLink?: string;
    linkText?: string;
  }>
) {
  const { toggleAccordion, name, selected, setSelected } = useAccordionStore();
  const selectedOption = selected ? { checked: selected === props.title } : {};
  return (
    <div className={styles.accordion}>
      <input
        className={styles.input}
        type={toggleAccordion ? "checkbox" : "radio"}
        name={name}
        id={name + "-" + props.title}
        readOnly
        {...selectedOption}
      />
      <div className={styles.tabTitle} onClick={() => setSelected?.(props.title)}>
        <svg viewBox="0 0 448 512" className={styles.icon}>
          <path fill="currentColor" d="M448 294.2v-76.4c0-13.3-10.7-24-24-24H286.2V56c0-13.3-10.7-24-24-24h-76.4c-13.3 0-24 10.7-24 24v137.8H24c-13.3 0-24 10.7-24 24v76.4c0 13.3 10.7 24 24 24h137.8V456c0 13.3 10.7 24 24 24h76.4c13.3 0 24-10.7 24-24V318.2H424c13.3 0 24-10.7 24-24z">
          </path>
        </svg>
        <label
          className={styles.label}
          htmlFor={name + "-" + props.title}
        >
          {props.title}
        </label>
        <div className={styles.tooltip}>
          <svg viewBox="0 0 512 512" className={classname(styles.icon, styles.iconTooltip)}>
            <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z">
            </path>
          </svg>
          <div className={styles.tooltipContent}>
            <h3 className={styles.tooltipTitle}>Help</h3>
            <div className={styles.tooltiptext}>
              {props.tooltipDescription}
              <a target="_blank" href={props.tooltipLink} className={styles.tooltipLink} rel="noreferrer">
                {props.linkText}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.tabContent}>{props.children}</div>
    </div>
  );
}
