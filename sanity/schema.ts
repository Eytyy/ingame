import { type SchemaTypeDefinition } from "sanity";
import home from "./schames/home";
import { blocks } from "./schames/blocks";
import settings from "./schames/settings";
import location from "./schames/location";
import anchorLink from "./schames/anchorLink";
import linkExternal from "./schames/linkExternal";
import partner from "./schames/partner";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    home,
    settings,
    location,
    anchorLink,
    linkExternal,
    partner,
    ...blocks,
  ],
};
