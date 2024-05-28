import React, { CSSProperties, memo } from 'react'

import { ICollapsibleSectionContentDataOpt } from '~/typings/schemaopt'
import { useStaticPath } from '~/hooks/use-static-path'

const VideoComponent: React.FC<ICollapsibleSectionContentDataOpt['video']> = (props) => {
  const videoSrc = useStaticPath(props?.data?.src)
  if (!props?.data?.src) return null

  const wrapperStyle: CSSProperties = {
    paddingTop: `${(960 / 480) * 100}%`,
    marginBottom: 25,
    position: 'relative',
  }

  const videoStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  }

  return (
    <div style={wrapperStyle}>
      <video style={videoStyle} playsInline controls>
        <source src={videoSrc} type="video/mp4" />
      </video>
    </div>
  )
}

export const Video = memo(VideoComponent)
