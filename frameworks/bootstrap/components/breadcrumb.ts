import { getBlock } from "../../../utils/block";

export const BOOTSTRAP_BREADCRUMB = (pages?: string[]) =>
  getBlock({
    name: "Breadcrumb",
    tag: "nav",
    attributes: {
      "aria-label": "breadcrumb",
    },
    content: [
      getBlock({
        name: "Breadcrumb wrapper",
        class: "breadcrumb",
        tag: "ol",
        content: pages?.map((page, i) => {
          const isLastPage = i === pages.length - 1;
          return getBlock({
            name: "Breadcrumb item",
            class: `breadcrumb-item${isLastPage ? " active" : ""}`,
            tag: "li",
            attributes: isLastPage
              ? {
                  "aria-current": "page",
                }
              : undefined,
            content: isLastPage
              ? page
              : [
                  getBlock({
                    name: "Breadcrum link",
                    tag: "a",
                    attributes: {
                      href: "#",
                    },
                    content: page,
                    container: false,
                  }),
                ],
            container: !isLastPage,
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
  });
