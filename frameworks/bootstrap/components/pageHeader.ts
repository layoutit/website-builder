import { getBlock } from "../../../utils/block";

export const BOOTSTRAP_PAGE_HEADER = () =>
  getBlock({
    name: "Page header",
    class: "pb-2 border-bottom mb-4",
    tag: "h1",
    content: "Interface Builder for Bootstrap",
    container: false,
    removable: true,
    draggable: true,
  });
