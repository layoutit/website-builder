import { getBlock } from "../../../utils/block";

export const BOOTSTRAP_TEXT = () =>
  getBlock({
    name: "Text",
    tag: "div",
    content: [
      getBlock({
        name: "Header",
        tag: "h2",
        content: "Heading",
        container: false,
      }),
      getBlock({
        name: "Subtitle",
        tag: "p",
        content:
          "Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
        container: false,
      }),
      getBlock({
        name: "Link",
        class: "btn text-primary",
        tag: "a",
        attributes: {
          href: "#",
          role: "button",
        },
        content: "View details »",
        container: false,
      }),
    ],
    container: true,
    removable: true,
    draggable: true,
    droppable: false,
    exportable: false,
  });
