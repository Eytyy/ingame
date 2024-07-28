import { type SchemaTypeDefinition } from "sanity";
import home from "./schames/home";
import { blocks } from "./schames/blocks";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [home, ...blocks],
};
