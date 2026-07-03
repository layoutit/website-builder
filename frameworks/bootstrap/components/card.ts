import { IAvailableProperties } from "../../../types";
import { getBlock } from "../../../utils/block";

export const BOOTSTRAP_CARD = (
  properties?: { styles: string },
  availableProperties?: IAvailableProperties[]
) =>
  getBlock({
    name: "Card",
    tag: "div",
    content: [
      getBlock({
        name: "Card wrapper",
        class: "card",
        tag: "div",
        content: [
          getBlock({
            name: "Card header",
            class: "card-header",
            tag: "div",
            content: "Card title",
            container: false,
          }),
          getBlock({
            name: "Card content",
            class: "card-body",
            content: [
              getBlock({
                name: "Card text",
                class: "card-text",
                tag: "p",
                content: "Card content",
                container: false,
              }),
            ],
            container: true,
            droppable: false,
          }),
          getBlock({
            name: "Card footer",
            class: "card-footer",
            tag: "div",
            content: "Card footer",
            container: false,
          }),
        ],
        container: true,
        droppable: false,
      }),
    ],
    properties,
    availableProperties,
    styledChild: true,
    container: true,
    removable: true,
    draggable: true,
    droppable: false,
    exportable: false,
  });
