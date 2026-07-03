import { IBlock } from "../../../types";

export type AddBlock = (parentID: string, type: string, siblingID?: string, block?: IBlock) => void;
export type MoveBlock = (parentID: string, id: string, siblingID?: string) => void;
export type UpdateBlockContent = (id: string, content: string | IBlock[]) => void;
