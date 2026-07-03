import { SelectedProperties } from "../types";
import { classname } from "./classname";

export function classesFromProperties(selectedProperties: SelectedProperties) {
  return classname(...Object.values(selectedProperties));
}
