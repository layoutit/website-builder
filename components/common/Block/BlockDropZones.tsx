import { IBlock } from "../../../types";

export type BlockDropHandler = (
  siblingID?: string
) => (type?: string, id?: string, block?: IBlock) => void;
