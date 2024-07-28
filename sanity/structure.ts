import { StructureBuilder } from 'sanity/structure'

const excludeTypes = [
  'home',
]

export const structure = (S: StructureBuilder) => {
  const defaultListItems = S.documentTypeListItems().filter(
    (listItem) =>
      !excludeTypes.includes(listItem.getId() as (typeof excludeTypes)[number]),
  )
  return S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Home')
        .child(
          S.editor()
            .id('home')
            .schemaType('home')
            .documentId('home'),
        ),
      ...defaultListItems,
    ])
}
