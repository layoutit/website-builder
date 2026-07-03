import { IAvailableProperties } from "../../../types";
import { getBlock } from "../../../utils/block";

export const BOOTSTRAP_ORDERED_LIST = (
  properties?: { unstyled: string; inline: string },
  availableProperties?: IAvailableProperties[]
) =>
  getBlock({
    name: "Ordered list",
    tag: "ol",
    content: [
      getBlock({
        name: "li",
        tag: "li",
        content: "Todo",
        properties,
        availableProperties,
        container: false,
        editable: true,
      }),
      getBlock({
        name: "li",
        tag: "li",
        content: "Todo",
        properties,
        availableProperties,
        container: false,
        editable: true,
      }),
    ],
    properties,
    availableProperties,
    container: true,
    draggable: true,
    removable: true,
  });
