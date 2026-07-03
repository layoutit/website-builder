import { SOURCE_MODE_OPTIONS, SourceMode } from "./sourceMode";
import styles from "./SourceCodeBody.module.scss";

type SourceModeSwitchProps = {
  sourceMode: SourceMode;
  setSourceMode: (sourceMode: SourceMode) => void;
};

export function SourceModeSwitch({
  sourceMode,
  setSourceMode,
}: SourceModeSwitchProps) {
  return (
    <div className={styles.modeSwitch} aria-label="Code type">
      {SOURCE_MODE_OPTIONS.map((option) => {
        const active = sourceMode === option.mode;

        return (
          <button
            className={active ? styles.modeButtonActive : styles.modeButton}
            type="button"
            aria-pressed={active}
            onClick={() => setSourceMode(option.mode)}
            key={option.mode}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
