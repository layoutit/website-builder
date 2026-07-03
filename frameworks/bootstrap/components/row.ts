import { IBlock } from "../../../types";
import { getBlock } from "../../../utils/block";

export const BOOTSTRAP_ROW = (content: IBlock[], nameType?: string, mainContent?: boolean) =>
  getBlock({
    name: nameType ? "Row" + nameType : "Row",
    class: "row",
    container: true,
    draggable: true,
    removable: true,
    labeled: true,
    content,
    mainContent
  });
