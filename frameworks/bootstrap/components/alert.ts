import { IAvailableProperties } from "../../../types";
import { getBlocksServerSide } from "../../../utils/html";

export const BOOTSTRAP_ALERT = (
  properties?: { style: string },
  availableProperties?: IAvailableProperties[]
) => {
  const html = `
    <div>
      <div class="alert alert-dismissible fade show" role="alert">
        <h4 class="alert-heading" editable="true">Alert!</h4>
        <strong>Warning!</strong>
        <span exportable="false" editable="true"> Best check yo self, you're not looking so good. </span>
        <a href="#" class="alert-link">Alert link</a>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    </div>
  `;

  return getBlocksServerSide(html, "bootstrap", "Alert", {removable: true, editable: true, draggable: true, droppable: false, properties, availableProperties, exportable: false, styledChild: true});
}
