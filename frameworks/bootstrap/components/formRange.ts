import { getBlock } from "../../../utils/block";
import { getIdSeed } from "../../../utils/id";

export const BOOTSTRAP_FORM_RANGE = (seed?: string) => {
  const id = `form-range-${getIdSeed(seed)}`;

  return getBlock({
    name: "Form range",
    tag: "div",
    class: "mb-3",
    content: [
      getBlock({
        name: "Range label",
        tag: "label",
        class: "form-label",
        attributes: {
          htmlFor: id,
        },
        content: "Example range",
        container: false,
      }),
      getBlock({
        name: "Range input",
        tag: "input",
        class: "form-range",
        attributes: {
          type: "range",
          min: "0",
          max: "5",
          step: "0.5",
          id,
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
