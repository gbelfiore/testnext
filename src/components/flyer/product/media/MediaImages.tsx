import { useCallback, useMemo } from 'react'
import { getStaticPath, getStaticPathForWebP } from '~/hooks/use-static-path'
import { type IMediaProductOpt } from '~/typings/schemaopt'
import { EventTracker } from '~/utilities/event-tracker'
import { EventNames } from '~/utilities/event-tracker/enums'
import MediaGif from './MediaGif'
import MediaImage from './MediaImage'
import MediaVideo from './MediaVideo'
import { type MediaProductProps } from './typings'
import MediaMultiImages from './MediaMultiImages/MediaMultiImages'

const MediaProduct = ({ media, sectionIndex, productIndex }: MediaProductProps) => {
  const shouldTrackMediaProduct = media?.tracking

  const onClickCta = useCallback(async () => {
    if (shouldTrackMediaProduct) {
      await EventTracker.sendEvent<EventNames.MEDIA_CLICK>(EventNames.MEDIA_CLICK, {
        sectionIndex,
        productIndex,
      })
    }
  }, [shouldTrackMediaProduct, productIndex, sectionIndex])

  const onStartVideo = useCallback(
    async (positionVideo: number) => {
      if (shouldTrackMediaProduct) {
        await EventTracker.sendEvent<EventNames.MEDIA_START_VIDEO>(EventNames.MEDIA_START_VIDEO, {
          sectionIndex,
          productIndex,
          positionVideo,
        })
      }
    },
    [shouldTrackMediaProduct, productIndex, sectionIndex]
  )

  const onGoalPercentageVideo = useCallback(
    async (positionStartVideo: number, isSeekVideo: boolean, percentageVideo: number) => {
      if (shouldTrackMediaProduct) {
        await EventTracker.sendEvent<EventNames.MEDIA_VIEW_VIDEO>(EventNames.MEDIA_VIEW_VIDEO, {
          sectionIndex,
          productIndex,
          positionStartVideo,
          isSeekVideo,
          percentageVideo,
        })
      }
    },
    [shouldTrackMediaProduct, productIndex, sectionIndex]
  )

  const onToggleVideo = useCallback(
    async (positionVideo: number) => {
      if (shouldTrackMediaProduct) {
        await EventTracker.sendEvent<EventNames.MEDIA_TOGGLE_VIDEO>(EventNames.MEDIA_TOGGLE_VIDEO, {
          sectionIndex,
          productIndex,
          positionVideo,
        })
      }
    },
    [shouldTrackMediaProduct, productIndex, sectionIndex]
  )

  const getMediaProduct = useMemo(() => {
    if (!media) return null

    if (media.type === 'image') {
      const image = media as IMediaProductOpt<'image'>
      const url = getStaticPath(image.props?.src)
      const urlWebP = getStaticPathForWebP(image.props?.src)
      const ctaUrl = image.props?.ctaUrl

      return <MediaImage url={url} urlWebP={urlWebP} ctaUrl={ctaUrl} onClickCta={onClickCta} />
    } else if (media.type === 'externalImage') {
      const externalImage = media as IMediaProductOpt<'externalImage'>
      const url = externalImage.props?.url ?? ''
      const ctaUrl = externalImage.props?.ctaUrl
      return <MediaImage url={url} ctaUrl={ctaUrl} onClickCta={onClickCta} />
    } else if (media.type === 'gif') {
      const gif = media as IMediaProductOpt<'gif'>
      const url = getStaticPath(gif.props?.src)
      const urlWebP = getStaticPathForWebP(gif.props?.src)
      const ctaUrl = gif.props?.ctaUrl
      return <MediaGif url={url} urlWebP={urlWebP} ctaUrl={ctaUrl} onClickCta={onClickCta} />
    } else if (media.type === 'externalGif') {
      const externalGif = media as IMediaProductOpt<'externalGif'>
      const url = externalGif.props?.url ?? ''
      const ctaUrl = externalGif.props?.ctaUrl
      return <MediaGif url={url} ctaUrl={ctaUrl} onClickCta={onClickCta} />
    } else if (media.type === 'video') {
      const video = media as IMediaProductOpt<'video'>
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
          onClickCta={onClickCta}
          onStartVideo={onStartVideo}
          onGoalPercentageVideo={onGoalPercentageVideo}
          onToggleVideo={onToggleVideo}
        />
      )
    } else if (media.type === 'externalVideo') {
      const externalVideo = media as IMediaProductOpt<'externalVideo'>
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
          onClickCta={onClickCta}
          onStartVideo={onStartVideo}
          onGoalPercentageVideo={onGoalPercentageVideo}
          onToggleVideo={onToggleVideo}
        />
      )
    } else if (media.type === 'multiImages') {
      return <MediaMultiImages {...media.props} />
    }
    return null
  }, [media, onClickCta, onGoalPercentageVideo, onStartVideo, onToggleVideo])

  return getMediaProduct
}

export default MediaProduct
