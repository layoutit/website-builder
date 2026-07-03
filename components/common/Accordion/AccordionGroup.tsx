import React from "react";
interface IAccordionProps {
  name: string;
  selected?: string;
  defaultSelected?: string;
  toggleAccordion?: boolean;
  setSelected?: React.Dispatch<React.SetStateAction<string>>;
  setToggleAccordion?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AccordionStore = React.createContext<IAccordionProps>({
  name: "",
  defaultSelected: "",
  toggleAccordion: true,
  setSelected: () => {},
  setToggleAccordion: () => {},
});

export function AccordionGroup(
  props: React.PropsWithChildren<IAccordionProps>
) {
  const [selected, setSelected] = React.useState<string>(props.selected || "");
  const [toggleAccordion, setToggleAccordion] = React.useState<boolean>(
    props.toggleAccordion || false
  );

  return (
    <AccordionStore.Provider
      value={{
        defaultSelected: props.defaultSelected,
        name: props.name,
        selected,
        setSelected,
        toggleAccordion,
        setToggleAccordion,
      }}
    >
      {props.children}
    </AccordionStore.Provider>
  );
}
