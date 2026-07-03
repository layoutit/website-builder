import { IAvailableProperties } from "../../../types";
import { getBlock } from "../../../utils/block";

export const BOOTSTRAP_FORM = (
  properties?: { inline: string },
  availableProperties?: IAvailableProperties[]
) =>
  getBlock({
    name: "Form",
    tag: "form",
    content: [
      getBlock({
        name: "Email group",
        tag: "div",
        class: "mb-3",
        container: true,
        content: [
          getBlock({
            name: "Email label",
            tag: "label",
            class: "form-label",
            attributes: {
              htmlFor: "formEmail"
            },
            content: "Email address",
            container: false
          }),
          getBlock({
            name: "Email input",
            tag: "input",
            class: "form-control",
            attributes: {
              type: "email",
              placeholder: "Enter email",
              id: "formEmail"
            },
            childless: true,
            container: false
          })
        ]
      }),
      getBlock({
        name: "Password group",
        tag: "div",
        class: "mb-3",
        container: true,
        content: [
          getBlock({
            name: "Password label",
            tag: "label",
            class: "form-label",
            attributes: {
              htmlFor: "formPassword"
            },
            content: "Password",
            container: false
          }),
          getBlock({
            name: "Password input",
            tag: "input",
            class: "form-control",
            attributes: {
              type: "password",
              placeholder: "Password",
              id: "formPassword",
              autoComplete: "new-password"
            },
            childless: true,
            container: false
          })
        ]
      }),
      getBlock({
        name: "File group",
        tag: "div",
        class: "mb-3",
        container: true,
        content: [
          getBlock({
            name: "File label",
            tag: "label",
            class: "form-label",
            attributes: {
              htmlFor: "formFile"
            },
            content: "File input",
            container: false
          }),
          getBlock({
            name: "File input",
            tag: "input",
            class: "form-control",
            attributes: {
              type: "file",
              id: "formFile"
            },
            childless: true,
            container: false
          })
        ]
      }),
      getBlock({
        name: "Submit group",
        tag: "div",
        container: true,
        content: [
          getBlock({
            name: "Submit",
            tag: "button",
            class: "btn btn-primary",
            content: "Submit",
            attributes: {
              type: "submit"
            },
            container: false
          })
        ]
      })
    ],
    attributes: {
      action: "#"
    },
    properties,
    availableProperties,
    container: true,
    draggable: true,
    removable: true,
  });
