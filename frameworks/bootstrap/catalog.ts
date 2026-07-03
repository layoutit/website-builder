import { IFrameworkComponent } from "../../types";
import { BOOTSTRAP_BASE_CSS_CATEGORY } from "./categories/baseCss";
import { BOOTSTRAP_COMPONENTS_CATEGORY } from "./categories/components";
import { BOOTSTRAP_GRID_CATEGORY } from "./categories/grid";
import { BOOTSTRAP_JAVASCRIPT_CATEGORY } from "./categories/javascript";
import { BOOTSTRAP_LEGACY_CATEGORY } from "./categories/legacy";

export const BOOTSTRAP_COMPONENTS: IFrameworkComponent = {
  grid: BOOTSTRAP_GRID_CATEGORY,
  baseCss: BOOTSTRAP_BASE_CSS_CATEGORY,
  components: BOOTSTRAP_COMPONENTS_CATEGORY,
  javascript: BOOTSTRAP_JAVASCRIPT_CATEGORY,
  legacy: BOOTSTRAP_LEGACY_CATEGORY,
};
