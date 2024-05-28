/* eslint-disable react/no-unknown-property */
import { useMemo } from 'react'
import { getStaticPathForWebP } from '~/hooks/use-static-path'
import { ISchemaOpt } from '~/typings/schemaopt'
import { type ITplSchema } from '~/typings/template'

interface IPreloadImageProps {
  template: ITplSchema | null
  schema: ISchemaOpt
}

const PreloadImage = ({ schema }: IPreloadImageProps) => {
  const getCover = useMemo(() => {
    if (schema.coverImage) {
      // const path = getStaticPath(schema.coverImage, schema?.basePath);
      const pathWebp = getStaticPathForWebP(schema.coverImage, schema?.basePath)
      return (
        <>
          <link rel="preload" fetchPriority={'high'} as="image" href={pathWebp} type="image/webp" />
          {/* <link
            rel="preload"
            fetchPriority={"high"}
            as="image"
            href={path}
            type="image/*"
          /> */}
        </>
      )
    }
    return null
  }, [schema])

  return getCover
}

export { PreloadImage }
