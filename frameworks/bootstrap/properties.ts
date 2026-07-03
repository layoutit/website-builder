import { IFrameworkAvailableProperties } from "../../types";

export const BOOTSTRAP_PROPERTIES: IFrameworkAvailableProperties = {
  text: [
    {
      name: "emphasis",
      type: "list",
      properties: {
        default: "",
        muted: "text-muted",
        primary: "text-primary",
        secondary: "text-secondary",
        success: "text-success",
        info: "text-info",
        warning: "text-warning",
        danger: "text-danger",
      },
    },
    {
      name: "align",
      type: "list",
      properties: {
        default: "",
        left: "text-start",
        center: "text-center",
        right: "text-end",
      },
    },
  ],
  paragraph: [
    {
      name: "lead",
      type: "boolean",
      properties: {
        lead: "lead",
      },
    },
  ],
  blockquote: [
    {
      name: "pull_right",
      type: "boolean",
      properties: {
        textRight: "text-end",
      },
    },
  ],
  list: [
    {
      name: "unstyled",
      type: "boolean",
      properties: { listUnstyled: "list-unstyled" },
    },
    {
      name: "inline",
      type: "boolean",
      properties: { listInlineItem: "list-inline list-inline-item" },
    },
  ],
  table: [
    {
      name: "style",
      type: "list",
      properties: {
        default: "",
        striped: "table-striped",
        bordered: "table-bordered",
      },
    },
    {
      name: "hover",
      type: "boolean",
      properties: { hover: "table-hover" },
    },
    {
      name: "condensed",
      type: "boolean",
      properties: { small: "table-sm" },
    },
  ],
  form: [
    {
      name: "inline",
      type: "boolean",
      properties: { inline: "row row-cols-3 align-items-center" },
    },
  ],
  button: [
    {
      name: "style",
      type: "list",
      properties: {
        primary: "btn-primary",
        secondary: "btn-secondary",
        success: "btn-success",
        danger: "btn-danger",
        warning: "btn-warning",
        info: "btn-info",
        light: "btn-light",
        dark: "btn-dark",
        link: "btn-link",
        primary_outline: "btn-outline-primary",
        secondary_outline: "btn-outline-secondary",
        success_outline: "btn-outline-success",
        danger_outline: "btn-outline-danger",
        warning_outline: "btn-outline-warning",
        info_outline: "btn-outline-info",
        light_outline: "btn-outline-light",
        dark_outline: "btn-outline-dark",
      },
    },
    {
      name: "size",
      type: "list",
      properties: {
        large: "btn-lg",
        default: "",
        small: "btn-sm",
      },
    },
    {
      name: "block",
      type: "boolean",
      properties: { block: "d-block w-100" },
    },
    {
      name: "active",
      type: "boolean",
      properties: { active: "active" },
    },
    {
      name: "disabled",
      type: "boolean",
      properties: { disabled: "disabled" },
    },
  ],
  image: [
    {
      name: "style",
      type: "list",
      properties: {
        default: "",
        rounded: "rounded",
        circle: "rounded-circle",
        thumbnail: "img-thumbnail",
      },
    },
  ],
  buttonGroup: [
    {
      name: "size",
      type: "list",
      properties: {
        large: "btn-group-lg",
        medium: "",
        small: "btn-group-sm",
      },
    },
    {
      name: "direction",
      type: "list",
      properties: {
        horizontal: "btn-group",
        vertical: "btn-group-vertical",
      },
    },
  ],
  dropdown: [
    {
      name: "direction",
      type: "list",
      properties: {
        dropdown: "dropdown",
        dropup: "dropup",
        dropend: "dropend",
        dropstart: "dropstart",
      },
    },
  ],
  nav: [
    {
      name: "style",
      type: "list",
      properties: {
        default: "",
        tabs: "nav-tabs",
        pills: "nav-pills",
      },
    },
    {
      name: "vertical",
      type: "boolean",
      properties: {
        vertical: "flex-column",
      },
    },
  ],
  pagination: [
    {
      name: "size",
      type: "list",
      properties: {
        large: "pagination-lg",
        medium: "",
        small: "pagination-sm",
      },
    },
  ],
  label: [
    {
      name: "style",
      type: "list",
      properties: {
        default: "text-bg-secondary",
        primary: "text-bg-primary",
        secondary: "text-bg-secondary",
        success: "text-bg-success",
        danger: "text-bg-danger",
        warning: "text-bg-warning",
        info: "text-bg-info",
        light: "text-bg-light",
        dark: "text-bg-dark",
      },
    },
  ],
  jumbotron: [
    {
      name: "border",
      type: "boolean",
      properties: {
        border: "border",
      },
    },
  ],
  progressBar: [
    {
      name: "striped",
      type: "boolean",
      properties: {
        striped: "progress-bar-striped",
      },
    },
    {
      name: "animated",
      type: "boolean",
      properties: {
        animated: "progress-bar-animated",
      },
    },
  ],
  card: [
    {
      name: "style",
      type: "list",
      properties: {
        default: "",
        primary: "text-white bg-primary",
        secondary: "text-white bg-secondary",
        success: "text-white bg-success",
        danger: "text-white bg-danger",
        warning: "text-dark bg-warning",
        info: "text-dark bg-info",
        light: "text-dark bg-light",
        dark: "text-white bg-dark",
      },
    },
  ],
  alert: [
    {
      name: "style",
      type: "list",
      properties: {
        primary: "alert-primary",
        secondary: "alert-secondary",
        success: "alert-success",
        danger: "alert-danger",
        warning: "alert-warning",
        info: "alert-info",
        light: "alert-light",
        dark: "alert-dark",
      },
    },
  ],
  navbar: [
    {
      name: "position",
      type: "list",
      properties: {
        default: "",
        fixed_top: "fixed-top",
        fixed_bottom: "fixed-bottom",
      },
    },
    {
      name: "style",
      type: "list",
      properties: {
        light: "bg-body-tertiary",
        dark: "navbar-dark bg-dark",
      },
    },
  ],
};
