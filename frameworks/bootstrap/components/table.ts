import { IAvailableProperties } from "../../../types";
import { getBlock } from "../../../utils/block";

export const BOOTSTRAP_TABLE = (
  properties?: { style: string; hover: string; condensed: string },
  availableProperties?: IAvailableProperties[],
  rowsNum: number = 5,
  colsNum: number = 4
) => {
  const rows = Array(rowsNum)
    .fill(null)
    .map((row, ri) => {
      const isHeader = ri === 0;

      return getBlock({
        name: "Table row",
        tag: "tr",
        content: Array.from({ length: colsNum }).map((col, ci) =>
          getBlock({
            name: isHeader ? "Table header cell" : "Table data cell",
            tag: isHeader ? "th" : "td",
            attributes: isHeader
              ? {
                  scope: "col",
                }
              : undefined,
            content: isHeader ? `Table header ${ci}` : `Example ${ci}`,
            container: false,
            editable: true,
          })
        ),
        container: true,
      });
    });
  const [headerRow, ...rest] = rows;

  return getBlock({
    name: "Table",
    tag: "div",
    content: [
      getBlock({
        name: "Table",
        class: "table",
        tag: "table",
        content: [
          getBlock({
            name: "Table header",
            tag: "thead",
            content: [headerRow],
            container: true,
          }),
          getBlock({
            name: "Table body",
            tag: "tbody",
            content: rest,
            container: true,
          }),
        ],
        properties,
        container: true,
        draggable: true,
      }),
    ],
    styledChild: true,
    availableProperties,
    container: true,
    draggable: true,
    removable: true,
    droppable: false,
    exportable: false,
  });
};
