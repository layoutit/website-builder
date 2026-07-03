import { IBlock } from "../../../types";
import { getBlock } from "../../../utils/block";

export const BOOTSTRAP_MEDIA_OBJECT = () => {
  const images = [
    "/sports-q-c-64-64-8.jpg",
    "/sports-q-c-64-64-2.jpg",
  ];
  const getMediaBlock = (img: string) => {
    return getBlock({
      name: "Media",
      class: "d-flex",
      tag: "div",
      content: [
        getBlock({
          name: "Image wrapper",
          class: "flex-shrink-0",
          tag: "div",
          content: [
            getBlock({
              name: "Image",
              tag: "img",
              attributes: {
                src: img,
                alt: "Image",
              },
              container: false,
              childless: true,
            }),
          ],
          container: true,
          droppable: false,
        }),
        getBlock({
          name: "Text wrapper",
          class: "flex-grow-1 ms-3",
          tag: "div",
          content: [
            getBlock({
              name: "Text title",
              class: "",
              tag: "h5",
              content: "Nested media heading",
              container: false,
            }),
            getBlock({
              name: "Text",
              class: "",
              tag: "p",
              content:
                "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.",
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
  };
  const getMedia = (level: number, block: IBlock): IBlock => {
    if (level === images.length - 1) return block;

    if (!block.container) return block;

    const newBlock = getMediaBlock(images[level + 1]);
    const imgWrapper = block.content[0];
    const textWrapper = block.content[1];

    if (!imgWrapper || !textWrapper?.container) return block;

    return {
      ...block,
      content: [
        imgWrapper,
        {
          ...textWrapper,
          content: [
            ...textWrapper.content,
            getMedia(level + 1, newBlock),
          ],
        },
      ],
      removable: true,
      draggable: true,
    };
  };
  return getMedia(0, getMediaBlock(images[0]));
};
