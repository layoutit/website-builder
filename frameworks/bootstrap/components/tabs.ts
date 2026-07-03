import { getBlock } from "../../../utils/block";
import { getIdSeed } from "../../../utils/id";

export const BOOTSTRAP_TABS = (seed?: string) => {
  const idSeed = getIdSeed(seed);
  const tabs = [
    {
      name: "Section 1",
      content: "I'm in Section 1.",
      id: `section1-${idSeed}`,
    },
    {
      name: "Section 2",
      content: "Howdy, I'm in Section 2.",
      id: `section2-${idSeed}`,
    },
  ];

  return getBlock({
    name: "Tabs",
    tag: "div",
    content: [
      getBlock({
        name: "Tabs wrapper",
        class: "nav nav-tabs",
        attributes: {
          role: "tablist",
        },
        tag: "ul",
        content: tabs.map((tab, i) =>
          getBlock({
            name: "Tab item",
            class: "nav-item",
            tag: "li",
            attributes: {
              role: "presentation",
            },
            content: [
              getBlock({
                name: "Tab link",
                class: `nav-link ${i === 0 ? "active" : ""}`,
                tag: "button",
                attributes: {
                  id: `${tab.id}-tab`,
                  "data-bs-toggle": "tab",
                  "data-bs-target": `#${tab.id}`,
                  role: "tab",
                  type: "button",
                  "aria-controls": tab.id,
                  "aria-selected": i === 0 ? "true" : "false",
                },
                content: tab.name,
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
      getBlock({
        name: "Tabs content",
        class: "tab-content",
        tag: "div",
        content: tabs.map((tab, i) =>
          getBlock({
            name: "Tab pane",
            class: `tab-pane fade ${i === 0 ? "show active" : ""}`,
            tag: "div",
            attributes: {
              id: tab.id,
              role: "tabpanel",
              "aria-labelledby": `${tab.id}-tab`,
            },
            content: tab.content,
            container: false,
          })
        ),
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
};
