import { getBlock } from "../../../utils/block";
import { getIdSeed } from "../../../utils/id";

export const BOOTSTRAP_MODAL = (seed?: string) => {
  const idSeed = getIdSeed(seed);
  const modalId = `modal-${idSeed}`;
  const modalTitleId = `modal-title-${idSeed}`;
  return getBlock({
    name: "Modal",
    tag: "div",
    content: [
      getBlock({
        name: "Button",
        class: "btn text-primary",
        tag: "button",
        attributes: {
          type: "button",
          "data-bs-target": `#${modalId}`,
          "data-bs-toggle": "modal",
        },
        content: "Launch modal demo",
        container: false,
      }),
      getBlock({
        name: "Modal wrapper",
        class: "modal fade",
        tag: "div",
        attributes: {
          id: modalId,
          tabIndex: "-1",
          "aria-labelledby": modalTitleId,
          "aria-hidden": "true",
        },
        content: [
          getBlock({
            name: "Modal dialog",
            class: "modal-dialog",
            tag: "div",
            content: [
              getBlock({
                name: "Modal content",
                class: "modal-content",
                tag: "div",
                content: [
                  getBlock({
                    name: "Modal header",
                    class: "modal-header",
                    tag: "div",
                    content: [
                      getBlock({
                    name: "Modal title",
                    class: "modal-title",
                    tag: "h5",
                    attributes: {
                      id: modalTitleId,
                    },
                    content: "Modal title",
                    container: false,
                  }),
                  getBlock({
                    name: "Modal close button",
                    class: "btn-close",
                    tag: "button",
                    attributes: {
                      type: "button",
                      "data-bs-dismiss": "modal",
                      "aria-label": "Close",
                    },
                    container: false,
                  }),
                ],
                container: true,
                    droppable: false,
                  }),
                  getBlock({
                    name: "Modal body",
                    class: "modal-body",
                    tag: "div",
                    content: "...",
                    container: false,
                  }),
                  getBlock({
                    name: "Modal footer",
                    class: "modal-footer",
                    tag: "div",
                    content: [
                      getBlock({
                        name: "Modal button",
                        class: "btn btn-primary",
                        tag: "button",
                        attributes: {
                          type: "button",
                        },
                        content: "Save changes",
                        container: false,
                      }),
                      getBlock({
                        name: "Modal button",
                        class: "btn btn-secondary",
                        tag: "button",
                        attributes: {
                          type: "button",
                          "data-bs-dismiss": "modal",
                        },
                        content: "Close",
                        container: false,
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
