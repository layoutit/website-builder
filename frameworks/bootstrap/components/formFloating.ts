import { getBlock } from "../../../utils/block";
import { getIdSeed } from "../../../utils/id";

export const BOOTSTRAP_FORM_FLOATING = (seed?: string) => {
  const id = `floating-input-${getIdSeed(seed)}`;

  return getBlock({
    name: "Form floating",
    tag: "div",
    class: "form-floating mb-3",
    content: [
      getBlock({
        name: "Floating input",
        tag: "input",
        class: "form-control",
        attributes: {
          type: "email",
          placeholder: "name@example.com",
          id,
        },
        childless: true,
        container: false,
      }),
      getBlock({
        name: "Floating label",
        tag: "label",
        attributes: {
          htmlFor: id,
        },
        content: "Email address",
        container: false,
      }),
    ],
    container: true,
    removable: true,
    draggable: true,
  });
};
