import { BOOTSTRAP_COLUMN } from "../components/column";
import { BOOTSTRAP_ROW } from "../components/row";

export const BOOTSTRAP_GRID_CATEGORY = {
  name: "GRID SYSTEM",
  description: "To change the column configuration you can edit the different values in the input (they should add 12). If you need more info please visit: ",
  link: "https://getbootstrap.com/docs/5.3/layout/grid/",
  linkText: "Grid System",
  components: [
    {
      id: "row-12",
      mainContent: true,
      create: () => BOOTSTRAP_ROW(BOOTSTRAP_COLUMN("12", [], {}), "", true),
    },
    {
      id: "row-6-6",
      mainContent: true,
      create: () => BOOTSTRAP_ROW(BOOTSTRAP_COLUMN("6 6", [], {}), "", true),
    },
    {
      id: "row-8-4",
      mainContent: true,
      create: () => BOOTSTRAP_ROW(BOOTSTRAP_COLUMN("8 4", [], {}), "", true),
    },
    {
      id: "row-4-4-4",
      mainContent: true,
      create: () => BOOTSTRAP_ROW(BOOTSTRAP_COLUMN("4 4 4", [], {}), "", true),
    },
    {
      id: "custom-row",
      mainContent: true,
      create: () => BOOTSTRAP_ROW(BOOTSTRAP_COLUMN(undefined, [], {}), "", true),
    },
  ],
};
