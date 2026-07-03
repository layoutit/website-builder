import { getBlock } from "../../../utils/block";

export const BOOTSTRAP_LIST_GROUP = () =>
  getBlock({
    name: "List group",
    tag: "div",
    content: [
      getBlock({
        name: "List group wrapper",
        class: "list-group",
        tag: "div",
        content: [
          getBlock({
            name: "Link item",
            class: "list-group-item list-group-item-action active",
            tag: "a",
            attributes: {
              href: "#",
            },
            content: "Home",
            container: false,
          }),
          getBlock({
            name: "List item",
            class: "list-group-item",
            tag: "div",
            content: "List header",
            container: false,
          }),
          getBlock({
            name: "List item",
            class: "list-group-item",
            tag: "div",
            content: [
              getBlock({
                name: "List item heading",
                class: "",
                tag: "h5",
                content: "List group item heading",
                container: false,
              }),
              getBlock({
                name: "List item text",
                class: "",
                tag: "p",
                content: "...",
                container: false,
              }),
            ],
            container: true,
            droppable: false,
          }),
          getBlock({
            name: "List item",
            class: "list-group-item",
            tag: "div",
            content: [
              getBlock({
                name: "List item badge",
                class: "badge bg-secondary rounded-pill",
                tag: "span",
                content: "14",
                container: false,
              }),
            ],
            container: true,
            droppable: false,
          }),
          getBlock({
            name: "List item",
            class: "list-group-item list-group-item-action active",
            tag: "a",
            attributes: {
              href: "#",
            },
            content: [
              getBlock({
                name: "List item badge",
                class: "badge text-dark bg-light rounded-pill",
                tag: "span",
                content: "14",
                container: false,
              }),
            ],
            container: true,
            droppable: false,
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
