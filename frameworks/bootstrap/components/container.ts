import { IBlock } from "../../../types";
import { getBlock } from "../../../utils/block";
import { BOOTSTRAP_COLUMN } from "./column";
import { BOOTSTRAP_ROW } from "./row";

export const BOOTSTRAP_CONTAINER = (content?: IBlock[]) => {
  const resolvedContent =
    content && content.length > 0
      ? content
      : [
          BOOTSTRAP_ROW(
            BOOTSTRAP_COLUMN("12", [], {}),
            "",
            true
          ),
        ];

  return getBlock({
    name: "Container",
    class: "container",
    content: resolvedContent,
    container: true,
    droppable: true,
    labeled: true,
    mainBlock: true,
  });
};
