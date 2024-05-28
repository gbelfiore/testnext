import { CSSProperties, useCallback, useEffect, useMemo, useRef } from 'react'
import { type ITransformOrigin } from '~/typings/common'
import { BrowserService } from '~/utilities/browser-service'
import { VirtualizationConfig } from '~/utilities/product/VirtualizationUtility'

interface MediaVideoProps {
  url?: string
  ctaUrl?: string
  ctaIcon?: string
  ctaIconWidth?: string
  ctaIconHeight?: string
  ctaIconTranslateX?: string
  ctaIconTranslateY?: string
  ctaIconTransformOrigin?: ITransformOrigin
  autoPlay?: boolean
  controls?: boolean
  muted?: boolean
  loop?: boolean
  onClickCta?: () => void
  onStartVideo?: (positionVideo: number) => void
  onGoalPercentageVideo?: (positionStartVideo: number, isSeekVideo: boolean, percentageVideo: number) => void
  onToggleVideo?: (positionVideo: number) => void
}

const videoGoalsRange = [0, 20, 40, 60, 80, 97, 100]

const MediaVideo = ({
  url,
  ctaUrl,
  ctaIconWidth,
  ctaIconHeight,
  ctaIconTranslateX,
  ctaIconTranslateY,
  ctaIconTransformOrigin,
  ctaIcon,
  autoPlay,
  controls,
  muted,
  loop,
  onClickCta,
  onStartVideo,
  onGoalPercentageVideo,
  onToggleVideo,
}: MediaVideoProps) => {
  const refVideo = useRef<HTMLVideoElement | null>(null)
  const refVideoStartView = useRef<number>(0)
  const refVideoSeeking = useRef<boolean>(false)
  const refVideoPercentageView = useRef<number>(0)

  const listnerPlay = useCallback(
    (evt: HTMLVideoElementEventMap['play']) => {
      refVideoPercentageView.current = -1
      refVideoStartView.current = refVideo?.current?.currentTime ?? 0
      onStartVideo && onStartVideo(refVideo?.current?.currentTime ?? 0)
    },
    [onStartVideo]
  )

  const listnerSeeking = useCallback(() => {
    refVideoSeeking.current = true
    onToggleVideo && onToggleVideo(refVideo?.current?.currentTime ?? 0)
  }, [onToggleVideo])

  const listnerTimeupdate = useCallback(
    (evt: HTMLVideoElementEventMap['play']) => {
      if (!refVideo?.current) return
      const currentTime = refVideo.current.currentTime
      const duration = refVideo.current.duration

      const percentageView = (currentTime / duration) * 100

      const goalVideo = videoGoalsRange.find((r, index) => {
        if (
          videoGoalsRange[index + 1] &&
          percentageView >= r &&
          percentageView <= videoGoalsRange[index + 1]! &&
          r !== refVideoPercentageView.current
        ) {
          refVideoPercentageView.current = r
          return true
        }
        return false
      })

      if (goalVideo !== undefined) {
        onGoalPercentageVideo && onGoalPercentageVideo(refVideoStartView.current, refVideoSeeking.current, goalVideo === 97 ? 100 : goalVideo)
      }
    },
    [refVideoPercentageView, onGoalPercentageVideo]
  )

  const cleanRefVideoEvent = useCallback(() => {
    if (refVideo?.current) {
      refVideo.current.removeEventListener('play', listnerPlay)
      refVideo.current.removeEventListener('seeking', listnerSeeking)
      refVideo.current.removeEventListener('progress', listnerTimeupdate)
    }
  }, [listnerPlay, listnerSeeking, listnerTimeupdate])

  useEffect(() => {
    refVideo?.current?.addEventListener('play', listnerPlay)
    refVideo?.current?.addEventListener('timeupdate', listnerTimeupdate)
    refVideo?.current?.addEventListener('seeking', listnerSeeking)
    return cleanRefVideoEvent
  }, [cleanRefVideoEvent, listnerPlay, listnerSeeking, listnerTimeupdate])

  const getSize = useMemo((): { width: number; height: number } => {
    let height = 0
    const windowWidth = VirtualizationConfig.windowWidth
    const urlSearch = new URL(url!)
    const queryStrings = BrowserService.getQuerystring(urlSearch.search)
    if (queryStrings.ar) {
      height = windowWidth / Number(queryStrings.ar)
    }

    return { width: windowWidth, height: height }
  }, [url])

  const getVideo = useMemo(() => {
    const size = getSize

    const defaultAutoPlay = autoPlay !== null && autoPlay !== undefined ? Boolean(autoPlay) : true
    const defaultControls = autoPlay !== null && autoPlay !== undefined ? Boolean(controls) : false
    const defaultMuted = defaultAutoPlay || (muted !== null && muted !== undefined ? Boolean(muted) : true)
    const defaultLoop = loop !== null && loop !== undefined ? Boolean(loop) : true

    return (
      <video
        ref={refVideo}
        width={size.width}
        height={size.height}
        autoPlay={defaultAutoPlay}
        controls={defaultControls}
        muted={defaultMuted}
        loop={defaultLoop}
        playsInline
      >
        <source src={url} type={'video/mp4'} />
      </video>
    )
  }, [autoPlay, controls, getSize, loop, muted, url])

  const styleCta = useMemo((): CSSProperties => {
    return {
      width: ctaIconWidth,
      height: ctaIconHeight,
      position: 'absolute',
      zIndex: 2000,
      top: ctaIconTranslateY,
      left: ctaIconTranslateX,
      transform: `translate(-${ctaIconTranslateX}, -${ctaIconTranslateY})`,
      transformOrigin: ctaIconTransformOrigin,
      backgroundImage: `url("${ctaIcon}")`,
      backgroundPosition: 'center',
      backgroundSize: '100%',
      backgroundRepeat: 'no-repeat',
    }
  }, [ctaIcon, ctaIconHeight, ctaIconTransformOrigin, ctaIconTranslateX, ctaIconTranslateY, ctaIconWidth])

  return (
    <>
      {ctaUrl && (
        <div style={getSize} className={'relative'}>
          {getVideo}
          <a
            className={'h-auto w-full no-underline visited:no-underline hover:no-underline active:no-underline '}
            target={'_BLANK_'}
            href={ctaUrl}
            onClick={() => onClickCta && onClickCta()}
          >
            <div style={styleCta}></div>
          </a>
        </div>
      )}
      {!ctaUrl && getVideo}
    </>
  )
}

export default MediaVideo
