import { IAvailableProperties } from "../../../types";
import { getBlock } from "../../../utils/block";

export const BOOTSTRAP_UNORDERED_LIST = (
  properties?: { unstyled: string; inline: string },
  availableProperties?: IAvailableProperties[]
) =>
  getBlock({
    name: "Unordered list",
    tag: "ul",
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
