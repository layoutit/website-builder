import { getBlock } from "../../../utils/block";

export const BOOTSTRAP_BADGE = () =>
  getBlock({
    name: "Badge",
    tag: "div",
    content: [
      getBlock({
        name: "Badge button",
        class: "btn btn-primary",
        tag: "button",
        attributes: {
          type: "button",
        },
        content: [
          getBlock({
            name: "Badge number",
            class: "badge bg-light text-dark",
            tag: "span",
            content: "42",
            container: false,
          }),
        ],
        container: true,
        droppable: false,
      }),
      getBlock({
        name: "Badge button",
        class: "btn text-primary",
        tag: "button",
        attributes: {
          type: "button",
        },
        content: [
          getBlock({
            name: "Badge number",
            class: "badge bg-secondary",
            tag: "span",
            content: "16",
            container: false,
          }),
        ],
        container: true,
        droppable: false,
      }),
    ],
    container: true,
    removable: true,
    draggable: true,
    droppable: false,
    exportable: false,
  });
