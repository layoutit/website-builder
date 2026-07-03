import { getBlock } from "../../../utils/block";
import { getIdSeed } from "../../../utils/id";

export const BOOTSTRAP_CAROUSEL = (seed?: string) => {
  const idSeed = getIdSeed(seed);
  const slides = [
    {
      img: "/sports-q-c-1600-500-1.jpg",
      label: "First Thumbnail label",
      content:
        "Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.",
    },
    {
      img: "/sports-q-c-1600-500-2.jpg",
      label: "Second Thumbnail label",
      content:
        "Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.",
    },
    {
      img: "/sports-q-c-1600-500-3.jpg",
      label: "Third Thumbnail label",
      content:
        "Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.",
    },
  ];
  const carouselId = `carousel-${idSeed}`;
  const getButtonBlock = (type: "prev" | "next") =>
    getBlock({
      name: `Carousel ${type}`,
      class: `carousel-control-${type}`,
      tag: "button",
      attributes: {
        type: "button",
        "data-bs-target": `#${carouselId}`,
        "data-bs-slide": type,
      },
      content: [
        getBlock({
          name: `carousel ${type} icon`,
          class: `carousel-control-${type}-icon`,
          tag: "span",
          attributes: {
            "aria-hidden": "true",
          },
          container: false,
        }),
        getBlock({
          name: `carousel ${type} text`,
          class: "visually-hidden",
          tag: "span",
          content: type,
          container: false,
        }),
      ],
      container: true,
      droppable: false,
    });

  return getBlock({
    name: "Carousel",
    tag: "div",
    content: [
      getBlock({
        name: "Carousel wrapper",
        class: "carousel slide",
        tag: "div",
        attributes: {
          id: carouselId,
          "data-bs-ride": "carousel",
        },
        content: [
          getBlock({
            name: "Carousel indicators",
            class: "carousel-indicators",
            tag: "div",
            content: slides.map((slide, i) =>
              getBlock({
                name: "Carousel indicator",
                class: i === 0 ? "active" : "",
                tag: "button",
                attributes: {
                  type: "button",
                  "data-bs-target": `#${carouselId}`,
                  "data-bs-slide-to": i.toString(),
                  "aria-current": i === 0 ? "true" : "false",
                  "aria-label": `Slide ${i + 1}`,
                },
                container: false,
              })
            ),
            container: true,
            droppable: false,
          }),
          getBlock({
            name: "Carousel inner",
            class: "carousel-inner",
            tag: "div",
            content: slides.map((slide, i) =>
              getBlock({
                name: "Carousel item",
                class: `carousel-item ${i === 0 ? "active" : ""}`,
                tag: "div",
                content: [
                  getBlock({
                    name: "Carousel image",
                    class: "d-block w-100",
                    tag: "img",
                    attributes: {
                      src: slide.img,
                      alt: "Carousel image",
                    },
                    childless: true,
                    container: false,
                  }),
                  getBlock({
                    name: "Carousel caption",
                    class: "carousel-caption d-none d-md-block",
                    tag: "div",
                    content: [
                      getBlock({
                        name: "Caption label",
                        tag: "h5",
                        content: slide.label,
                        container: false,
                      }),
                      getBlock({
                        name: "Caption content",
                        tag: "p",
                        content: slide.content,
                        container: false,
                      }),
                    ],
                    container: true,
                    droppable: false,
                  }),
                ],
                container: true,
                droppable: false,
              })
            ),
            container: true,
            droppable: false,
          }),
          getButtonBlock("prev"),
          getButtonBlock("next"),
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
