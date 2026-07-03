import { BOOTSTRAP_ADDRESS } from "../components/address";
import { BOOTSTRAP_BLOCKQUOTE } from "../components/blockquote";
import { BOOTSTRAP_BUTTON } from "../components/button";
import { BOOTSTRAP_DESCRIPTION_LIST } from "../components/descriptionList";
import { BOOTSTRAP_FORM } from "../components/form";
import { BOOTSTRAP_FORM_CHECK } from "../components/formCheck";
import { BOOTSTRAP_FORM_FLOATING } from "../components/formFloating";
import { BOOTSTRAP_FORM_RANGE } from "../components/formRange";
import { BOOTSTRAP_FORM_SELECT } from "../components/formSelect";
import { BOOTSTRAP_IMAGE } from "../components/image";
import { BOOTSTRAP_INPUT_GROUP } from "../components/inputGroup";
import { BOOTSTRAP_ORDERED_LIST } from "../components/orderedList";
import { BOOTSTRAP_PARAGRAPH } from "../components/paragraph";
import { BOOTSTRAP_TABLE } from "../components/table";
import { BOOTSTRAP_TITLE } from "../components/title";
import { BOOTSTRAP_UNORDERED_LIST } from "../components/unorderedList";
import { BOOTSTRAP_PROPERTIES } from "../properties";

export const BOOTSTRAP_BASE_CSS_CATEGORY = {
  name: "BASE CSS",
  description: "Drag & Drop the elements inside the columns where you want to insert it. And from there, you can configure the style of that component. If you need more info please visit: ",
  link: "https://getbootstrap.com/docs/5.3/getting-started/introduction/",
  linkText: "Bootstrap Docs",
  components: [
    { id: "title", create: () =>
      BOOTSTRAP_TITLE(
        "h3. Lorem ipsum dolor sit amet.",
        undefined,
        BOOTSTRAP_PROPERTIES.text
      ) },
    { id: "paragraph", create: () =>
      BOOTSTRAP_PARAGRAPH(
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget sapien sapien. Curabitur in metus urna. In hac habitasse platea dictumst. Phasellus eu sem sapien, sed vestibulum velit. Nam purus nibh, lacinia non faucibus et, pharetra in dolor. Sed iaculis posuere diam ut cursus. Morbi commodo sodales nisi id sodales. Proin consectetur, nisi id commodo imperdiet, metus nunc consequat lectus, id bibendum diam velit et dui. Proin massa magna, vulputate nec bibendum nec, posuere nec lacus. Aliquam mi erat, aliquam vel luctus eu, pharetra quis elit. Nulla euismod ultrices massa, et feugiat ipsum consequat eu.",
        undefined,
        [...BOOTSTRAP_PROPERTIES.text, ...BOOTSTRAP_PROPERTIES.paragraph]
      ) },
    { id: "address", create: () =>
      BOOTSTRAP_ADDRESS(
        "Acme Corp.\n1234 Market St, Suite 900\nSan Francisco, CA 94103\nP: (123) 456-7890"
      ) },
    { id: "blockquote", create: () =>
      BOOTSTRAP_BLOCKQUOTE(
        "A well-known quote, contained in a blockquote element.\nSomeone famous in Source Title",
        undefined,
        BOOTSTRAP_PROPERTIES.blockquote
      ) },
    { id: "unordered_list", create: () => BOOTSTRAP_UNORDERED_LIST(undefined, BOOTSTRAP_PROPERTIES.list) },
    { id: "ordered_list", create: () => BOOTSTRAP_ORDERED_LIST(undefined, BOOTSTRAP_PROPERTIES.list) },
    { id: "description_list", create: () => BOOTSTRAP_DESCRIPTION_LIST() },
    { id: "table", create: () => BOOTSTRAP_TABLE(undefined, BOOTSTRAP_PROPERTIES.table) },
    { id: "form", create: () => BOOTSTRAP_FORM(undefined, BOOTSTRAP_PROPERTIES.form) },
    { id: "input_group", create: (seed?: string) => BOOTSTRAP_INPUT_GROUP(seed) },
    { id: "form_select", create: (seed?: string) => BOOTSTRAP_FORM_SELECT(seed) },
    { id: "form_check", create: (seed?: string) => BOOTSTRAP_FORM_CHECK(seed) },
    { id: "form_range", create: (seed?: string) => BOOTSTRAP_FORM_RANGE(seed) },
    { id: "form_floating", create: (seed?: string) => BOOTSTRAP_FORM_FLOATING(seed) },
    { id: "button", create: () => BOOTSTRAP_BUTTON(false, undefined, BOOTSTRAP_PROPERTIES.button) },
    { id: "anchor_button", create: () => BOOTSTRAP_BUTTON(true, undefined, BOOTSTRAP_PROPERTIES.button) },
    { id: "image", create: () => BOOTSTRAP_IMAGE(undefined, BOOTSTRAP_PROPERTIES.image) },
  ],
};
