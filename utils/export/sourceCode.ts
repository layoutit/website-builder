import { IBlock } from "../../types";
import { serializeBlock } from "./blockSerializer";
import { formatMarkup } from "./markupFormatter";
import { wrapBootstrapFullPage } from "./pageWrappers";

export function getBootstrapSourceCode(blockTree: IBlock) {
  return formatMarkup(serializeBlock(blockTree, "html"));
}

export function getBootstrapFullPageSourceCode(blockTree: IBlock) {
  return wrapBootstrapFullPage(getBootstrapSourceCode(blockTree));
}

export function getBootstrapReactSourceCode(blockTree: IBlock) {
  return formatMarkup(serializeBlock(blockTree, "jsx"));
}
