import { getBlock } from "../../../utils/block";

const DEFAULT_ADDRESS = [
  "Acme Corp.",
  "1234 Market St, Suite 900",
  "San Francisco, CA 94103",
  "P: (123) 456-7890",
];

export const BOOTSTRAP_ADDRESS = (content?: string) => {
  const lines = (content ?? DEFAULT_ADDRESS.join("\n"))
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const addressBlocks = lines.reduce((blocks, line, index) => {

    if (index === 0) {
      blocks.push(
        getBlock({
          name: "Address name",
          tag: "strong",
          content: line,
          container: false,
        })
      );
    } else if (/^p:\s*/i.test(line)) {
      const phone = line.replace(/^p:\s*/i, "");
      blocks.push(
        getBlock({
          name: "Address phone label",
          tag: "abbr",
          attributes: {
            title: "Phone",
          },
          content: "P:",
          container: false,
        })
      );
      if (phone) {
        blocks.push(
          getBlock({
            name: "Address phone",
            tag: "span",
            content: ` ${phone}`,
            container: false,
          })
        );
      }
    } else {
      blocks.push(
        getBlock({
          name: "Address line",
          tag: "span",
          content: line,
          container: false,
        })
      );
    }

    if (index < lines.length - 1) {
      blocks.push(
        getBlock({
          name: "Line break",
          tag: "br",
          content: "",
          childless: true,
          container: false,
        })
      );
    }

    return blocks;
  }, [] as ReturnType<typeof getBlock>[]);

  return getBlock({
    name: "Address",
    tag: "address",
    container: true,
    content: addressBlocks,
    draggable: true,
    removable: true,
  });
};
