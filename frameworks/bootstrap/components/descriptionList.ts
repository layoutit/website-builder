import { getBlock } from "../../../utils/block";

export const BOOTSTRAP_DESCRIPTION_LIST = () =>
  getBlock({
    name: "Description list",
    tag: "dl",
    content: [
      getBlock({
        name:"Title",
        tag: "dt",
        content: "Description lists",
        container: false,
        editable: true
      }),
      getBlock({
        name:"Description",
        tag: "dd",
        content: "A description list is perfect for defining terms.",
        container: false,
        editable: true
      }),
      getBlock({
        name:"Title",
        tag: "dt",
        content: "Euismod",
        container: false,
        editable: true
      }),
      getBlock({
        name:"Description",
        tag: "dd",
        content: "Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec elit.",
        container: false,
        editable: true
      }),
      getBlock({
        name:"Description",
        tag: "dd",
        content: "Donec id elit non mi porta gravida at eget metus.",
        container: false,
        editable: true
      }),
      getBlock({
        name:"Title",
        tag: "dt",
        content: "Malesuada porta",
        container: false,
        editable: true
      }),
      getBlock({
        name:"Description",
        tag: "dd",
        content: "Etiam porta sem malesuada magna mollis euismod.",
        container: false,
        editable: true
      }),
      getBlock({
        name:"Title",
        tag: "dt",
        content: "Felis euismod semper eget lacinia",
        container: false,
        editable: true
      }),
      getBlock({
        name:"Description",
        tag: "dd",
        content: "Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.",
        container: false,
        editable: true
      })
    ],
    container: true,
    draggable: true,
    removable: true
  });
