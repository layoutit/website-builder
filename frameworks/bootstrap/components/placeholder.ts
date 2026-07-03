import { getBlock } from "../../../utils/block";

export const BOOTSTRAP_PLACEHOLDER = () =>
  getBlock({
    name: "Placeholder",
    tag: "div",
    content: [
      getBlock({
        name: "Placeholder glow",
        tag: "div",
        class: "placeholder-glow mb-2",
        content: [
          getBlock({
            name: "Placeholder",
            tag: "span",
            class: "placeholder col-6",
            content: "",
            container: false,
          }),
        ],
        container: true,
        droppable: false,
      }),
      getBlock({
        name: "Placeholder wave",
        tag: "div",
        class: "placeholder-wave",
        content: [
          getBlock({
            name: "Placeholder",
            tag: "span",
            class: "placeholder col-8",
            content: "",
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
  });
