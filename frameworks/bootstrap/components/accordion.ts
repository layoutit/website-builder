import { getBlock } from "../../../utils/block";
import { getIdSeed } from "../../../utils/id";

export const BOOTSTRAP_ACCORDION = (items: number = 2, seed?: string) => {
  const idSeed = getIdSeed(seed);
  const getItem = (num: number) => ({
    header: `Accordion Item #${num}`,
    content: "Anim pariatur cliche...",
    headerId: `heading${num}-${idSeed}`,
    contentId: `content${num}-${idSeed}`,
  });
  const accordionId = `accordion-${idSeed}`;

  return getBlock({
    name: "Accordion",
    tag: "div",
    content: [
      getBlock({
        name: "Accordion wrapper",
        class: "accordion",
        tag: "div",
        attributes: {
          id: accordionId,
        },
        content: Array(items)
          .fill(0)
          .map((item, i) => {
            const itemData = getItem(i + 1);

            return getBlock({
              name: "Accordion item",
              class: "accordion-item",
              tag: "div",
              content: [
                getBlock({
                  name: "Accordion header",
                  class: "accordion-header",
                  tag: "h2",
                  attributes: {
                    id: itemData.headerId,
                  },
                  content: [
                    getBlock({
                      name: "Accordion button",
                      class: `accordion-button ${i !== 0 ? "collapsed" : ""}`,
                      tag: "button",
                      attributes: {
                        type: "button",
                        "data-bs-toggle": "collapse",
                        "data-bs-target": `#${itemData.contentId}`,
                        "aria-expanded": `${i !== 0 ? "false" : "true"}`,
                        "aria-controls": itemData.contentId,
                      },
                      content: itemData.header,
                      container: false,
                    }),
                  ],
                  container: true,
                  droppable: false,
                }),
                getBlock({
                  name: "Accordion collpase",
                  class: `accordion-collapse collapse ${i === 0 ? "show" : ""}`,
                  tag: "div",
                  attributes: {
                    id: itemData.contentId,
                    "aria-labelledby": itemData.headerId,
                    "data-bs-parent": `#${accordionId}`,
                  },
                  content: [
                    getBlock({
                      name: "Accordion body",
                      class: "accordion-body",
                      tag: "div",
                      content: itemData.content,
                      container: false,
                    }),
                  ],
                  container: true,
                  droppable: false,
                }),
              ],
              container: true,
              droppable: false,
            });
          }),
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
