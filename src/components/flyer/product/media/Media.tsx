import React, { useCallback, useMemo } from 'react'
import { getStaticPath, getStaticPathForWebP } from '~/hooks/use-static-path'
import { type IMediaOpt } from '~/typings/schemaopt'
import { EventTracker } from '~/utilities/event-tracker'
import { EventNames } from '~/utilities/event-tracker/enums'
import MediaGif from './MediaGif'
import MediaImage from './MediaImage'
import MediaVideo from './MediaVideo'
import { type MediaProps } from './typings'
import useSection from '~/hooks/use-section'

const Media = ({ sectionIndex, position }: MediaProps) => {
  const section = useSection(sectionIndex)
  const media = position === 'header' ? section?.header : section?.footer

  const onStartVideo = useCallback(
    async (positionVideo: number) => {
      if (!section) return
      const params = {
        section: section,
        media,
        positionVideo,
        positionMedia: position,
      }
      await EventTracker.sendEvent<EventNames.MEDIA_SECTION_START_VIDEO>(EventNames.MEDIA_SECTION_START_VIDEO, params)
    },
    [media, position, section]
  )

  const onGoalPercentageVideo = useCallback(
    async (positionStartVideo: number, isSeekVideo: boolean, percentageVideo: number) => {
      if (!section) return
      const params = {
        section: section,
        media,
        positionStartVideo,
        isSeekVideo,
        percentageVideo,
        positionMedia: position,
      }
      await EventTracker.sendEvent<EventNames.MEDIA_SECTION_VIEW_VIDEO>(EventNames.MEDIA_SECTION_VIEW_VIDEO, params)
    },
    [media, position, section]
  )
  const onToggleVideo = useCallback(
    async (positionVideo: number) => {
      if (!section) return
      const params = {
        section: section,
        media,
        positionVideo,
        positionMedia: position,
      }
      await EventTracker.sendEvent<EventNames.MEDIA_SECTION_TOGGLE_VIDEO>(EventNames.MEDIA_SECTION_TOGGLE_VIDEO, params)
    },
    [media, position, section]
  )

  const getMedia = useMemo(() => {
    if (!media) return null
    if (media.type === 'image') {
      const image = media as IMediaOpt<'image'>
      const url = getStaticPath(image.props?.src)
      const urlWebP = getStaticPathForWebP(image.props?.src)
      const ctaUrl = image.props?.ctaUrl
      return <MediaImage url={url} urlWebP={urlWebP} ctaUrl={ctaUrl} />
    } else if (media.type === 'externalImage') {
      const externalImage = media as IMediaOpt<'externalImage'>
      const url = externalImage.props?.url
      const ctaUrl = externalImage.props?.ctaUrl
      return <MediaImage url={url} ctaUrl={ctaUrl} />
    } else if (media.type === 'gif') {
      const gif = media as IMediaOpt<'gif'>
      const url = getStaticPath(gif.props?.src)
      const urlWebP = getStaticPathForWebP(gif.props?.src)
      const ctaUrl = gif.props?.ctaUrl
      return <MediaGif url={url} urlWebP={urlWebP} ctaUrl={ctaUrl} />
    } else if (media.type === 'externalGif') {
      const externalGif = media as IMediaOpt<'externalGif'>
      const url = externalGif.props?.url
      const ctaUrl = externalGif.props?.ctaUrl
      return <MediaGif url={url} ctaUrl={ctaUrl} />
    } else if (media.type === 'video') {
      const video = media as IMediaOpt<'video'>
      const url = getStaticPath(video.props?.src)
      const ctaIcon = getStaticPath(video.props?.ctaIcon)

      return (
        <MediaVideo
          url={url}
          ctaUrl={video.props?.ctaUrl}
          ctaIconHeight={video.props?.ctaIconHeight}
          ctaIconWidth={video.props?.ctaIconWidth}
          ctaIconTranslateX={video.props?.ctaIconTranslateX}
          ctaIconTranslateY={video.props?.ctaIconTranslateY}
          ctaIconTransformOrigin={video.props?.ctaIconTransformOrigin}
          ctaIcon={ctaIcon}
          autoPlay={video.props?.autoPlay}
          controls={video.props?.controls}
          muted={video.props?.muted}
          loop={video.props?.loop}
          onStartVideo={onStartVideo}
          onGoalPercentageVideo={onGoalPercentageVideo}
          onToggleVideo={onToggleVideo}
        />
      )
    } else if (media.type === 'externalVideo') {
      const externalVideo = media as IMediaOpt<'externalVideo'>
      const url = externalVideo.props?.url
      const ctaIcon = getStaticPath(externalVideo.props?.ctaIcon)
      return (
        <MediaVideo
          url={url}
          ctaUrl={externalVideo.props?.ctaUrl}
          ctaIconHeight={externalVideo.props?.ctaIconHeight}
          ctaIconWidth={externalVideo.props?.ctaIconWidth}
          ctaIconTranslateX={externalVideo.props?.ctaIconTranslateX}
          ctaIconTranslateY={externalVideo.props?.ctaIconTranslateY}
          ctaIconTransformOrigin={externalVideo.props?.ctaIconTransformOrigin}
          ctaIcon={ctaIcon}
          autoPlay={externalVideo.props?.autoPlay}
          controls={externalVideo.props?.controls}
          muted={externalVideo.props?.muted}
          loop={externalVideo.props?.loop}
          onStartVideo={onStartVideo}
          onGoalPercentageVideo={onGoalPercentageVideo}
          onToggleVideo={onToggleVideo}
        />
      )
    }
    return null
  }, [media, onGoalPercentageVideo, onStartVideo, onToggleVideo])

  if (!media) return null
  return getMedia
}

export default Media
