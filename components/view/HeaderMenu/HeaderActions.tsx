import { Button } from "../../common";
import {
  CopyIcon,
  DownloadIcon,
  EditIcon,
  PreviewIcon,
  TrashIcon,
} from "../../common/ButtonIcons/ButtonIcons";
import { classname } from "../../../utils/classname";
import styles from "./HeaderMenu.module.scss";

type HeaderActionsProps = {
  onClean: () => void;
  onDownloadHtml: () => void;
  onDownloadReact: () => void;
  onEdit: () => void;
  onFeedback: () => void;
  onPreview: () => void;
  onViewCode: () => void;
};

type HeaderCommand = {
  className?: string;
  icon?: JSX.Element;
  label: string;
  onClick: () => void;
};

function HeaderCommandButton({ command }: { command: HeaderCommand }) {
  return (
    <Button
      className={command.className || styles.headerButton}
      variant="rounded"
      background="secondary"
      onClick={command.onClick}
      icon={command.icon}
    >
      {command.label}
    </Button>
  );
}

export function HeaderActions({
  onClean,
  onDownloadHtml,
  onDownloadReact,
  onEdit,
  onFeedback,
  onPreview,
  onViewCode,
}: HeaderActionsProps) {
  const commands: HeaderCommand[] = [
    {
      className: classname(styles.firstButton, styles.headerButton),
      icon: <EditIcon />,
      label: "Edit",
      onClick: onEdit,
    },
    { icon: <PreviewIcon />, label: "Preview", onClick: onPreview },
    { icon: <CopyIcon />, label: "View Code", onClick: onViewCode },
    { icon: <DownloadIcon />, label: "Download", onClick: onDownloadHtml },
    {
      icon: <DownloadIcon />,
      label: "Download React",
      onClick: onDownloadReact,
    },
  ];

  return (
    <>
      {commands.map((command) => (
        <HeaderCommandButton command={command} key={command.label} />
      ))}
      <button
        className={styles.button}
        onClick={onClean}
        type="button"
        aria-label="Reset layout"
      >
        <TrashIcon className={styles.icon} />
      </button>
      <Button
        className={classname(styles.headerButton, styles.feedbackButton)}
        variant="rounded"
        background="primary"
        onClick={onFeedback}
      >
        Feedback
      </Button>
    </>
  );
}
