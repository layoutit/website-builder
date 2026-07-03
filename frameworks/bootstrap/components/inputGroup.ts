import { getBlock } from "../../../utils/block";
import { getIdSeed } from "../../../utils/id";

export const BOOTSTRAP_INPUT_GROUP = (seed?: string) => {
  const idSeed = getIdSeed(seed);
  const textId = `input-group-${idSeed}`;

  return getBlock({
    name: "Input group",
    tag: "div",
    class: "input-group mb-3",
    content: [
      getBlock({
        name: "Input group text",
        tag: "span",
        class: "input-group-text",
        attributes: {
          id: textId,
        },
        content: "@",
        container: false,
      }),
      getBlock({
        name: "Input group input",
        tag: "input",
        class: "form-control",
        attributes: {
          type: "text",
          placeholder: "Username",
          "aria-label": "Username",
          "aria-describedby": textId,
        },
        childless: true,
        container: false,
      }),
    ],
    container: true,
    removable: true,
    draggable: true,
  });
};
