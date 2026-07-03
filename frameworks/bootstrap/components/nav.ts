import { IAvailableProperties } from "../../../types";
import { getBlock } from "../../../utils/block";

export const BOOTSTRAP_NAV = (
  links?: { text: string; active?: boolean; disabled?: boolean }[],
  properties?: { style: string; vertical: string },
  availableProperties?: IAvailableProperties[]
) =>
  getBlock({
    name: "Nav",
    class: "nav",
    tag: "ul",
    content: links?.map((link) =>
      getBlock({
        name: "Nav item",
        class: "nav-item",
        tag: "li",
        content: [
          getBlock({
            name: "Nav link",
            class: `nav-link${link.disabled ? " disabled" : ""}${
              link.active ? " active" : ""
            }`,
            tag: "a",
            attributes: {
              href: "#",
              ...(link.active ? { "aria-current": "page" } : {}),
              ...(link.disabled
                ? { "aria-disabled": "true", tabIndex: "-1" }
                : {}),
            },
            content: link.text,
            container: false,
          }),
        ],
        container: true,
        droppable: false,
      })
    ),
    properties,
    availableProperties,
    container: true,
    removable: true,
    draggable: true,
    droppable: false,
  });
