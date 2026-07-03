type LayoutHistoryMode = "replaceOnly";

export type LayoutHistory = {
  mode: LayoutHistoryMode;
  write: (nextUrl: string, currentHref: string) => void;
};

export const replaceOnlyLayoutHistory: LayoutHistory = {
  mode: "replaceOnly",
  write(nextUrl, currentHref) {
    if (nextUrl !== currentHref) {
      window.history.replaceState({ layoutHistory: "replaceOnly" }, "", nextUrl);
    }
  },
};
