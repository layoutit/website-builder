import { BOOTSTRAP_BADGE } from "../components/badge";
import { BOOTSTRAP_BREADCRUMB } from "../components/breadcrumb";
import { BOOTSTRAP_BUTTON_GROUP } from "../components/buttonGroup";
import { BOOTSTRAP_CARD } from "../components/card";
import { BOOTSTRAP_DROPDOWN } from "../components/dropdown";
import { BOOTSTRAP_LIST_GROUP } from "../components/listGroup";
import { BOOTSTRAP_NAV } from "../components/nav";
import { BOOTSTRAP_PAGINATION } from "../components/pagination";
import { BOOTSTRAP_PLACEHOLDER } from "../components/placeholder";
import { BOOTSTRAP_PROGRESS_BAR } from "../components/progressBar";
import { BOOTSTRAP_TEXT } from "../components/text";
import { BOOTSTRAP_PROPERTIES } from "../properties";

export const BOOTSTRAP_COMPONENTS_CATEGORY = {
  name: "COMPONENTS",
  description: "Drag & Drop the elements inside the columns where you want to insert it. And from there, you can configure the style of that component. If you need more info please visit: ",
  link: "https://getbootstrap.com/docs/5.3/getting-started/introduction/",
  linkText: "Bootstrap Docs",
  components: [
    { id: "button_group", create: () =>
      BOOTSTRAP_BUTTON_GROUP(
        ["Left", "Center", "Right", "Justify"],
        { direction: BOOTSTRAP_PROPERTIES.buttonGroup[1].properties.horizontal },
        BOOTSTRAP_PROPERTIES.buttonGroup
      ) },
    { id: "dropdown", create: (seed?: string) =>
      BOOTSTRAP_DROPDOWN(
        ["Action", "Another action", "Some else here"],
        { direction: BOOTSTRAP_PROPERTIES.dropdown[0].properties.dropdown },
        BOOTSTRAP_PROPERTIES.dropdown,
        seed
      ) },
    { id: "nav", create: () =>
      BOOTSTRAP_NAV(
        [
          { text: "Active", active: true },
          { text: "Link" },
          { text: "link" },
          { text: "Disabled", disabled: true },
        ],
        undefined,
        BOOTSTRAP_PROPERTIES.nav
      ) },
    { id: "breadcrumb", create: () => BOOTSTRAP_BREADCRUMB(["Home", "Library", "Data"]) },
    { id: "pagination", create: () => BOOTSTRAP_PAGINATION(3, undefined, BOOTSTRAP_PROPERTIES.pagination) },
    { id: "badge", create: () => BOOTSTRAP_BADGE() },
    { id: "text", create: () => BOOTSTRAP_TEXT() },
    { id: "progress_bar", create: () => BOOTSTRAP_PROGRESS_BAR(undefined, BOOTSTRAP_PROPERTIES.progressBar) },
    { id: "placeholder", create: () => BOOTSTRAP_PLACEHOLDER() },
    { id: "list_group", create: () => BOOTSTRAP_LIST_GROUP() },
    { id: "card", create: () => BOOTSTRAP_CARD(undefined, BOOTSTRAP_PROPERTIES.card) },
  ],
};
