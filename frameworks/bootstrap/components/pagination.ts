import { IAvailableProperties } from "../../../types";
import { getBlock } from "../../../utils/block";

export const BOOTSTRAP_PAGINATION = (
  pages: number,
  properties?: { size: string },
  availableProperties?: IAvailableProperties[]
) => {
  const activeIndex = 0;
  const prevNextButtons = Array(2)
    .fill(null)
    .map((button, i) => {
      const isPrev = i === 0;

      return getBlock({
        name: "Pagination item",
        class: "page-item",
        tag: "li",
        content: [
          getBlock({
            name: "Pagination link",
            class: "page-link",
            tag: "a",
            attributes: {
              href: "#",
            },
            content: isPrev ? "Previous" : "Next",
            container: false,
          }),
        ],
        container: true,
        droppable: false,
      });
    });
  const [prevButton, nextButton] = prevNextButtons;

  return getBlock({
    name: "Pagination",
    tag: "nav",
    attributes: {
      "aria-label": "Pagination",
    },
    content: [
      getBlock({
        name: "Pagination items",
        class: "pagination",
        tag: "ul",
        content: [
          prevButton,
          ...Array(pages)
            .fill(null)
            .map((page, i) => {
              const isActive = i === activeIndex;
              const pageNumber = i + 1;

              return getBlock({
                name: "Pagination item",
                class: `page-item${isActive ? " active" : ""}`,
                tag: "li",
                attributes: isActive
                  ? {
                      "aria-current": "page",
                    }
                  : undefined,
                content: [
                  getBlock({
                    name: "Pagination link",
                    class: "page-link",
                    tag: isActive ? "span" : "a",
                    attributes: isActive
                      ? undefined
                      : {
                          href: "#",
                        },
                    content: pageNumber.toString(),
                    container: false,
                  }),
                ],
                container: true,
                droppable: false,
              });
            }),
          nextButton,
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
  });
};
