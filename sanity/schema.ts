import { type SchemaTypeDefinition } from "sanity";
import home from "./schames/home";
import { blocks } from "./schames/blocks";
import settings from "./schames/settings";
import { objects } from "./schames/objects";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [home, settings, ...blocks, ...objects],
};
