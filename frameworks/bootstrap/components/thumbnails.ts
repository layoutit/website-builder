import { getBlock } from "../../../utils/block";

export const BOOTSTRAP_THUMBNAILS = () => {
  const images = [
    "/people-q-c-600-200-1.jpg",
    "/city-q-c-600-200-1.jpg",
    "/sports-q-c-600-200-1.jpg",
  ];
  const buttonProperties = {
    name: "Button",
    tag: "a",
    attributes: {
      href: "#",
      role: "button",
    },
    content: "Action",
    container: false,
  };

  return images.map((image) =>
    getBlock({
      name: "Column",
      class: "col-4",
      tag: "div",
      content: [
        getBlock({
          name: "Card",
          class: "card",
          tag: "div",
          content: [
            getBlock({
              name: "Card image",
              class: "card-img-top",
              tag: "img",
              attributes: {
                src: image,
                alt: "Card image",
              },
              container: false,
              childless: true,
            }),
            getBlock({
              name: "Card body",
              class: "card-body",
              tag: "div",
              content: [
                getBlock({
                  name: "Card title",
                  class: "card-title",
                  tag: "h5",
                  content: "Card title",
                  container: false,
                }),
                getBlock({
                  name: "Card text",
                  class: "card-text",
                  tag: "p",
                  content:
                    "Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.",
                  container: false,
                }),
                getBlock({
                  ...buttonProperties,
                  class: "btn btn-primary",
                }),
                getBlock({
                  ...buttonProperties,
                  class: "btn text-primary",
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
    })
  );
};
