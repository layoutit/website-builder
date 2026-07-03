import { IAvailableProperties } from "../../../types";
import { getBlock } from "../../../utils/block";
import { getIdSeed } from "../../../utils/id";

export const BOOTSTRAP_DROPDOWN = (
  items: string[],
  properties?: { direction: string },
  availableProperties?: IAvailableProperties[],
  seed?: string
) => {
  const dropdownId = `dropdown-${getIdSeed(seed)}`;

  return getBlock({
    name: "Dropdown",
    tag: "div",
    content: [
      getBlock({
        name: "Dropdown toggle",
        class: "btn btn-primary dropdown-toggle",
        tag: "button",
        content: "Dropdown button",
        attributes: {
          id: dropdownId,
          type: "button",
          "data-bs-toggle": "dropdown",
          "aria-expanded": "false",
        },
        container: false,
      }),
      getBlock({
        name: "Dropdown menu",
        class: "dropdown-menu",
        tag: "ul",
        attributes: {
          "aria-labelledby": dropdownId,
        },
        content: items.map((item) =>
          getBlock({
            name: "Dropdown item",
            tag: "li",
            content: [
              getBlock({
                name: "Dropdown item anchor",
                class: "dropdown-item",
                tag: "a",
                attributes: {
                  href: "#",
                },
                content: item,
                container: false,
              }),
            ],
            styledChild: true,
            container: true,
            droppable: false,
          })
        ),
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
};
