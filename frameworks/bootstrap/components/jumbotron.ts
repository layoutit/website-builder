import { IAvailableProperties } from "../../../types";
import { getBlock } from "../../../utils/block";

export const BOOTSTRAP_JUMBOTRON = (
  properties?: { border: string },
  availableProperties?: IAvailableProperties[]
) =>
  getBlock({
    name: "Jumbotron",
    class: "p-5 bg-light rounded-3",
    tag: "div",
    content: [
      getBlock({
        name: "Jumbotron container",
        class: "container-fluid py-5",
        tag: "div",
        content: [
          getBlock({
            name: "Jumbotron header",
            class: "display-5 fw-bold",
            tag: "h1",
            content: "Hello, world!",
            container: false,
          }),
          getBlock({
            name: "Jumbotron text",
            class: "col-md-8 fs-4",
            tag: "p",
            content:
              "This is a template for a simple marketing or informational website. It includes a large callout called the hero unit and three supporting pieces of content. Use it as a starting point to create something more unique.",
            container: false,
          }),
          getBlock({
            name: "Jumbotron button",
            class: "btn btn-primary btn-lg",
            tag: "button",
            attributes: {
              type: "button",
            },
            content: "Learn more",
            container: false,
          }),
        ],
        container: true,
        droppable: false,
      }),
    ],
    properties,
    availableProperties,
    container: true,
    removable: true,
    draggable: true,
    droppable: false,
  });
