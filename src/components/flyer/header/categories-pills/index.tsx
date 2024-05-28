import { type CategoriesPillsProps } from '~/components/flyer/header/categories-pills/typings'
import { CategoryPill } from '~/components/flyer/header/categories-pills/category-pill'

const CategoriesPillsComponent = ({ schema, navKey, isFullPage }: CategoriesPillsProps) => {
  const sections = schema?.sections

  if (!sections) return null

  return (
    <>
      {sections.map(({ id, name }, index) => (
        <CategoryPill
          key={`categoryPill_${id}_${index}`}
          schema={schema}
          //openSection={openSection}
          id={id}
          name={name}
          navKey={navKey}
          isFullPage={isFullPage}
        />
      ))}
    </>
  )
}

export const CategoriesPills = CategoriesPillsComponent
