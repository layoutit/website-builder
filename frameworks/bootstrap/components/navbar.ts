import { IAvailableProperties } from "../../../types";
import { getBlock } from "../../../utils/block";
import { getIdSeed } from "../../../utils/id";

export const BOOTSTRAP_NAVBAR = (
  properties?: { position?: string; style?: string },
  availableProperties?: IAvailableProperties[],
  seed?: string
) => {
  const idSeed = getIdSeed(seed);
  const navbarCollapseId = `navbar-collapse-${idSeed}`;
  const getLinkBlock = (isActive: boolean) =>
    getBlock({
      name: "Nav item",
      class: "nav-item",
      tag: "li",
      content: [
        getBlock({
          name: "Nav link",
          class: `nav-link ${isActive ? "active" : ""}`,
          tag: "a",
          attributes: {
            href: "#",
            ...(isActive && { "aria-current": "page" }),
          },
          content: "Link",
          container: false,
        }),
      ],
      container: true,
      droppable: false,
    });
  const getDropdownBlock = () => {
    const dropdownId = `navbar-dropdown-${idSeed}`;
    const actions = [
      "Action",
      "Another action",
      "Something else here",
      "divider",
      "Separated link",
    ];
    return getBlock({
      name: "Dropdown",
      class: "nav-item dropdown",
      tag: "li",
      content: [
        getBlock({
          name: "Dropdown toggle",
          class: "nav-link dropdown-toggle",
          tag: "a",
          attributes: {
            href: "#",
            id: dropdownId,
            role: "button",
            "data-bs-toggle": "dropdown",
            "aria-expanded": "false",
          },
          content: "Dropdown link",
          container: false,
        }),
        getBlock({
          name: "Dropdown menu",
          class: "dropdown-menu",
          tag: "ul",
          attributes: {
            "aria-labelledby": dropdownId,
          },
          content: actions.map((action) =>
            getBlock({
              name: "Dropdown item wrapper",
              tag: "li",
              content: [
                action !== "divider"
                  ? getBlock({
                      name: "Dropdown item",
                      class: "dropdown-item",
                      tag: "a",
                      attributes: {
                        href: "#",
                      },
                      content: action,
                      container: false,
                    })
                  : getBlock({
                      name: "Dropdown divider",
                      class: "dropdown-divider",
                      tag: "hr",
                      childless: true,
                      container: false,
                    }),
              ],
              container: true,
              droppable: false,
            })
          ),
          container: true,
          droppable: false,
        }),
      ],
      container: true,
      droppable: false,
    });
  };

  return getBlock({
    name: "Navbar",
    tag: "div",
    content: [
      getBlock({
        name: "Navbar wrapper",
        class: "navbar navbar-expand-lg",
        tag: "nav",
        content: [
          getBlock({
            name: "Navbar container",
            class: "container-fluid",
            tag: "div",
            content: [
              getBlock({
                name: "Navbar brand",
                class: "navbar-brand",
                tag: "a",
                attributes: {
                  href: "#",
                },
                content: "Brand",
                container: false,
              }),
              getBlock({
                name: "Navbar toggle",
                class: "navbar-toggler",
                tag: "button",
                attributes: {
                  type: "button",
                  "data-bs-toggle": "collapse",
                  "data-bs-target": `#${navbarCollapseId}`,
                  "aria-controls": navbarCollapseId,
                  "aria-expanded": "false",
                  "aria-label": "Toggle navigation",
                },
                content: [
                  getBlock({
                    name: "Navbar toggle icon",
                    class: "navbar-toggler-icon",
                    tag: "span",
                    container: false,
                  }),
                ],
                container: true,
                droppable: false,
              }),
              getBlock({
                name: "Navbar collapse",
                class: "collapse navbar-collapse",
                tag: "div",
                attributes: {
                  id: navbarCollapseId,
                },
                content: [
                  getBlock({
                    name: "Navbar nav",
                    class: "navbar-nav mb-2 mb-lg-0",
                    tag: "ul",
                    content: [
                      getLinkBlock(true),
                      getLinkBlock(false),
                      getDropdownBlock(),
                    ],
                    container: true,
                    droppable: false,
                  }),
                  getBlock({
                    name: "Navbar form",
                    class: "d-flex",
                    tag: "form",
                    content: [
                      getBlock({
                        name: "Navbar form input",
                        class: "form-control me-2",
                        tag: "input",
                        attributes: {
                          type: "search",
                          placeholder: "Search",
                          "aria-label": "Search",
                        },
                        childless: true,
                        container: false,
                      }),
                      getBlock({
                        name: "Navbar form button",
                        class: "btn btn-primary",
                        tag: "button",
                        attributes: {
                          type: "submit",
                        },
                        content: "Search",
                        container: false,
                      }),
                    ],
                    container: true,
                    droppable: false,
                  }),
                  getBlock({
                    name: "Navbar nav",
                    class: "navbar-nav ms-auto mb-2 mb-lg-0",
                    tag: "ul",
                    content: [getLinkBlock(true), getDropdownBlock()],
                    container: true,
                    droppable: false,
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
};
