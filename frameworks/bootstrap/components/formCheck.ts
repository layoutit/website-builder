import { getBlock } from "../../../utils/block";
import { getIdSeed } from "../../../utils/id";

export const BOOTSTRAP_FORM_CHECK = (seed?: string) => {
  const id = `form-check-${getIdSeed(seed)}`;

  return getBlock({
    name: "Form check",
    tag: "div",
    class: "form-check",
    content: [
      getBlock({
        name: "Form check input",
        tag: "input",
        class: "form-check-input",
        attributes: {
          type: "checkbox",
          id,
        },
        childless: true,
        container: false,
      }),
      getBlock({
        name: "Form check label",
        tag: "label",
        class: "form-check-label",
        attributes: {
          htmlFor: id,
        },
        content: "Check me out",
        container: false,
      }),
    ],
    container: true,
    removable: true,
    draggable: true,
  });
};
