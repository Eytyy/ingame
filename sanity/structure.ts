import { FaCog, FaHome } from "react-icons/fa";
import { StructureBuilder } from "sanity/structure";

const excludeTypes = ["home", "settings"];

export const structure = (S: StructureBuilder) => {
  const defaultListItems = S.documentTypeListItems().filter(
    (listItem) =>
      !excludeTypes.includes(listItem.getId() as (typeof excludeTypes)[number]),
  );
  return S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Home")
        .icon(FaHome)
        .child(S.editor().id("home").schemaType("home").documentId("home")),
      S.listItem().title("Settings").icon(FaCog).child(
        S.editor()

          .id("settings")
          .schemaType("settings")
          .documentId("settings"),
      ),
      ...defaultListItems,
    ]);
};
