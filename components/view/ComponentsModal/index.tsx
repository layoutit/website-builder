import { IModal } from "../../../types/index";
import { SourceCodeBody } from "../HeaderMenu/SourceCodeBody";
import { DownloadFooter } from "../HeaderMenu/DownloadFooter";

export const BootstrapModal: IModal = {
  title: "Generated HTML",
  body: <SourceCodeBody />,
  footer: <DownloadFooter />,
};
