import { IAvailableProperties } from "../../../types";
import { getBlock } from "../../../utils/block";

export const BOOTSTRAP_IMAGE = (
  properties?: { style: string },
  availableProperties?: IAvailableProperties[]
) =>
  getBlock({
    name: "Image",
    tag: "div",
    availableProperties,
    content: [
      getBlock({
        name: "Img",
        class: "img-fluid",
        tag: "img",
        content: "",
        attributes: {
          src: "/sports-q-c-140-140-3.jpg",
          alt: "Bike",
        },
        childless: true,
        container: false,
      }),
    ],
    properties,
    styledChild: true,
    container: true,
    droppable: false,
    removable: true,
    draggable: true,
    exportable: false,
  });
