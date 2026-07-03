import { getBlock } from "../../../utils/block";
import { getIdSeed } from "../../../utils/id";

export const BOOTSTRAP_FORM_SELECT = (seed?: string) => {
  const id = `form-select-${getIdSeed(seed)}`;

  return getBlock({
    name: "Form select",
    tag: "div",
    class: "mb-3",
    content: [
      getBlock({
        name: "Select label",
        tag: "label",
        class: "form-label",
        attributes: {
          htmlFor: id,
        },
        content: "Select",
        container: false,
      }),
      getBlock({
        name: "Select",
        tag: "select",
        class: "form-select",
        attributes: {
          id,
        },
        content: [
          getBlock({
            name: "Select option",
            tag: "option",
            attributes: {
              value: "",
            },
            content: "Open this select menu",
            container: false,
          }),
          getBlock({
            name: "Select option",
            tag: "option",
            attributes: {
              value: "1",
            },
            content: "One",
            container: false,
          }),
          getBlock({
            name: "Select option",
            tag: "option",
            attributes: {
              value: "2",
            },
            content: "Two",
            container: false,
          }),
          getBlock({
            name: "Select option",
            tag: "option",
            attributes: {
              value: "3",
            },
            content: "Three",
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
};
