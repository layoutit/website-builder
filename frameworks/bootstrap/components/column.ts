import { IBlock } from "../../../types";
import { getBlock } from "../../../utils/block";

export const BOOTSTRAP_COLUMN = (
  size?: string,
  content?: IBlock[],
  properties?: IBlock["properties"]
) =>
  size
    ? size.split(" ").map((col) =>
        getBlock({
          name: "Column",
          class: "col-" + col,
          container: true,
          droppable: true,
          labeled: true,
          size: col,
          content,
          properties,
        })
      )
    : [];
