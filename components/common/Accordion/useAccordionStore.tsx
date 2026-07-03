import React from "react";
import { AccordionStore } from "./AccordionGroup";

export function useAccordionStore() {
  return React.useContext(AccordionStore);
}
