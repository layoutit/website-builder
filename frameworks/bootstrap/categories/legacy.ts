import { BOOTSTRAP_JUMBOTRON } from "../components/jumbotron";
import { BOOTSTRAP_LABEL } from "../components/label";
import { BOOTSTRAP_MEDIA_OBJECT } from "../components/mediaobject";
import { BOOTSTRAP_PAGE_HEADER } from "../components/pageHeader";
import { BOOTSTRAP_ROW } from "../components/row";
import { BOOTSTRAP_THUMBNAILS } from "../components/thumbnails";
import { BOOTSTRAP_PROPERTIES } from "../properties";

export const BOOTSTRAP_LEGACY_CATEGORY = {
  name: "LEGACY",
  description: "Deprecated Bootstrap components with BS5-friendly approximations.",
  link: "https://getbootstrap.com/docs/5.3/migration/",
  linkText: "BS5 Migration",
  components: [
    { id: "jumbotron", create: () =>
      BOOTSTRAP_JUMBOTRON(undefined, BOOTSTRAP_PROPERTIES.jumbotron),
    },
    { id: "label", create: () =>
      BOOTSTRAP_LABEL(
        { style: BOOTSTRAP_PROPERTIES.label[0].properties.default },
        BOOTSTRAP_PROPERTIES.label
      ),
    },
    { id: "page_header", create: () => BOOTSTRAP_PAGE_HEADER() },
    { id: "media_object", create: () => BOOTSTRAP_MEDIA_OBJECT() },
    { id: "thumbnails", create: () => BOOTSTRAP_ROW(BOOTSTRAP_THUMBNAILS(), "", false) },
  ],
};
