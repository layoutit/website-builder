import { useCatalogContext } from "../../../store";
import { Accordion, AccordionGroup } from "../../common";
import { DraggingItem } from "../../common/DraggingItem";
import { DraggingGrid } from "../../common/DraggingGrid";
import { withStableIds } from "../../../utils/block";

const toStablePrefix = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export function ComponentsSidebar() {
  const { frameworkComponents, framework } = useCatalogContext();

  return (
    <>
      {/* <FrameworkSelector /> */}
      <AccordionGroup
        name="cssSystemMenu"
        selected={frameworkComponents[Object.keys(frameworkComponents)?.[0]]?.name}
      >
        {Object.values(frameworkComponents).map((category) => {
          const categoryPrefix = toStablePrefix(category.name);

          return (
            <Accordion key={category.name} title={category.name} tooltipDescription={category.description} tooltipLink={category.link} linkText={category.linkText}>
              {category.name === frameworkComponents?.grid?.name
              ? category.components.map((component) => {
                const previewSeed = `preview-${categoryPrefix}-${component.id}`;
                return (
                  <DraggingGrid
                    key={component.id}
                    type={component.id}
                    block={withStableIds(component.create(previewSeed), previewSeed)}
                  />
                );
              })
              : category.components.map((component) => {
                const previewSeed = `preview-${categoryPrefix}-${component.id}`;
                return (
                  <DraggingItem
                    key={component.id}
                    type={component.id}
                    block={withStableIds(component.create(previewSeed), previewSeed)}
                    framework={framework}
                  />
                );
              })}
            </Accordion>
          );
        })}
      </AccordionGroup>
    </>
  );
}
