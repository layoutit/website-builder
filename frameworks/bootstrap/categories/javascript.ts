import { BOOTSTRAP_ACCORDION } from "../components/accordion";
import { BOOTSTRAP_ALERT } from "../components/alert";
import { BOOTSTRAP_CAROUSEL } from "../components/carousel";
import { BOOTSTRAP_MODAL } from "../components/modal";
import { BOOTSTRAP_NAVBAR } from "../components/navbar";
import { BOOTSTRAP_TABS } from "../components/tabs";
import { BOOTSTRAP_PROPERTIES } from "../properties";

export const BOOTSTRAP_JAVASCRIPT_CATEGORY = {
  name: "JAVASCRIPT",
  description: "Drag & Drop the elements inside the columns where you want to insert it. And from there, you can configure the style of that component. If you need more info please visit: ",
  link: "https://getbootstrap.com/docs/5.3/getting-started/introduction/",
  linkText: "Bootstrap Docs",
  components: [
    { id: "modal", create: (seed?: string) => BOOTSTRAP_MODAL(seed) },
    { id: "navbar", create: (seed?: string) =>
      BOOTSTRAP_NAVBAR(
        { style: BOOTSTRAP_PROPERTIES.navbar[1].properties.light },
        BOOTSTRAP_PROPERTIES.navbar,
        seed
      ) },
    { id: "tabs", create: (seed?: string) => BOOTSTRAP_TABS(seed) },
    { id: "alert", create: () =>
      BOOTSTRAP_ALERT(
        { style: BOOTSTRAP_PROPERTIES.alert[0].properties.primary },
        BOOTSTRAP_PROPERTIES.alert
      ) },
    { id: "accordion", create: (seed?: string) => BOOTSTRAP_ACCORDION(2, seed) },
    { id: "carousel", create: (seed?: string) => BOOTSTRAP_CAROUSEL(seed) },
  ],
};
