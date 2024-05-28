import React, { memo } from 'react'
import { getFontInfo } from '~/hooks/use-font-info'
import { IFontData } from '~/hooks/use-font-info/typings'
import useSection from '~/hooks/use-section'
import useTemplate from '~/hooks/use-template'
import { useFlyoutStore } from '~/state/flyout'

interface IOtherInfoProps {
  description: string
  padding?: number
  limitLines?: number
  opacity?: number
}

const OtherInfo = ({ description, padding = 10, limitLines, opacity = 1 }: IOtherInfoProps) => {
  const activeSectionIndex = useFlyoutStore((state) => state.activeSectionIndex)

  const section = useSection(activeSectionIndex)

  const template = useTemplate(section)

  const fontInfo: IFontData = getFontInfo(template?.fontInfoCssVars, 'productCellSingleSubName', {
    fontSize: '9px',
    fontFamily: template?.fonts?.families?.[1]?.name ?? undefined,
    lineHeight: '20px',
    textTransform: 'uppercase',
    fontWeight: 500,
  })

  return (
    description && (
      <div
        style={{
          padding,
          opacity,
        }}
      >
        <div
          className="w-full whitespace-pre-line"
          style={{
            ...fontInfo,
            ...(limitLines
              ? {
                  display: '-webkit-box',
                  WebkitLineClamp: limitLines,
                  WebkitBoxOrient: 'vertical',
                  // whiteSpace: 'normal',
                  overflow: 'hidden',
                  fontSize: 12,
                }
              : {}),
          }}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    )
  )
}

export default memo(OtherInfo)
