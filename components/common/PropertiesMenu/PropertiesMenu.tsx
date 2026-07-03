import React from "react";
import { Select } from "../Select";
import { Button } from "../Button";
import { useBlockActionsContext } from "../../../store";
import { IAvailableProperties, SelectedProperties } from "../../../types";
import { beautifyString } from "../../../utils/string";

export function PropertiesMenu(
  props: React.PropsWithChildren<{
    availableProperties: IAvailableProperties[] | undefined;
    selectedProperties: SelectedProperties;
    setOnProperties: React.Dispatch<
      React.SetStateAction<SelectedProperties>
    >;
    id: string;
  }>
) {
  const { updateBlockProperties } = useBlockActionsContext();
  const { selectedProperties, setOnProperties } = props;
  const handleChange = React.useCallback(
    (property: IAvailableProperties) => {
      return function (e: React.ChangeEvent<HTMLSelectElement>) {
        const nextSelectedProperties = {
          ...selectedProperties,
          [property.name]: e.target.value,
        };
        setOnProperties(nextSelectedProperties);
        updateBlockProperties(props.id, nextSelectedProperties);
      };
    },
    [props.id, selectedProperties, setOnProperties, updateBlockProperties]
  );

  const handleClick = React.useCallback(
    (property: IAvailableProperties) => {
      return function () {
        const propertyDefinitions = property.properties;
        const nextSelectedProperties = {
          ...selectedProperties,
          [property.name]: selectedProperties[property.name]
            ? ""
            : Object.values(propertyDefinitions).join(" "),
        };
        setOnProperties(nextSelectedProperties);
        updateBlockProperties(props.id, nextSelectedProperties);
      };
    },
    [props.id, selectedProperties, setOnProperties, updateBlockProperties]
  );

  return (
    <>
      {props.availableProperties?.map((property) => (
        <React.Fragment key={property.name}>
          {property.type === "boolean" && (
            <Button
              disabled={
                props.selectedProperties[property.name] === "" ||
                props.selectedProperties[property.name] === undefined
              }
              onClick={handleClick(property)}
              background="primary"
            >
              {beautifyString(property.name)}
            </Button>
          )}
          {property.type === "list" && (
            <Select
              name={property.name}
              defaultValue={property.name}
              onChange={handleChange(property)}
            >
              <option value={property.name} disabled>
                {beautifyString(property.name)}
              </option>
              {Object.entries(property.properties).map(([name, value]) => (
                <option key={name} value={value}>
                  {beautifyString(name)}
                </option>
              ))}
            </Select>
          )}
        </React.Fragment>
      ))}
    </>
  );
}
