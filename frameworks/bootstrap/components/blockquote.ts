import { IAvailableProperties } from "../../../types";
import { getBlock } from "../../../utils/block";

export const BOOTSTRAP_BLOCKQUOTE = (
  content?: string,
  properties?: { pull_right: string },
  availableProperties?: IAvailableProperties[]
) =>
  getBlock({
    name: "Blockquote",
    tag: "figure",
    content: [
      getBlock({
        name: "Quote",
        class: "blockquote",
        tag: "blockquote",
        content: [
          getBlock({
            name: "Quote text",
            tag: "p",
            content:
              content ||
              "A well-known quote, contained in a blockquote element.",
            container: false,
            editable: true,
          }),
        ],
        container: true,
        droppable: false,
      }),
      getBlock({
        name: "Quote footer",
        class: "blockquote-footer",
        tag: "figcaption",
        content: [
          getBlock({
            name: "Quote source prefix",
            tag: "span",
            content: "Someone famous in ",
            container: false,
          }),
          getBlock({
            name: "Quote source",
            tag: "cite",
            attributes: {
              title: "Source Title",
            },
            content: "Source Title",
            container: false,
            editable: true,
          }),
        ],
        container: true,
        droppable: false,
      }),
    ],
    container: true,
    properties,
    availableProperties,
    draggable: true,
    removable: true,
  });
