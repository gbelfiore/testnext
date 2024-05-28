import { useMemo } from 'react'
import PictureWebP from '~/components/picture-webp/PictureWebP'
import { BrowserService } from '~/utilities/browser-service'
import { VirtualizationConfig } from '~/utilities/product/VirtualizationUtility'

interface MediaGifProps {
  url: string
  urlWebP?: string
  ctaUrl?: string
  onClickCta?: () => void
}

const MediaGif = ({ url, urlWebP, ctaUrl, onClickCta }: MediaGifProps) => {
  const getSize = useMemo((): { width: number; height: number } => {
    let height = 0
    const windowWidth = VirtualizationConfig.windowWidth
    const urlSearch = new URL(url as string)
    const queryStrings = BrowserService.getQuerystring(urlSearch.search)
    if (queryStrings.ar) {
      height = windowWidth / Number(queryStrings.ar)
    }

    return { width: windowWidth, height: height }
  }, [url])

  const getImage = useMemo(() => {
    return (
      <PictureWebP
        src={url}
        webp={urlWebP}
        style={{
          width: getSize.width,
          height: getSize.height,
          objectFit: 'cover',
        }}
        alt="media"
      />
    )
  }, [getSize, url, urlWebP])

  return (
    <>
      {ctaUrl && (
        <a
          className={'h-auto w-full no-underline visited:no-underline hover:no-underline active:no-underline '}
          target={'_BLANK_'}
          href={ctaUrl}
          style={getSize}
          onClick={() => onClickCta && onClickCta()}
        >
          {getImage}
        </a>
      )}
      {!ctaUrl && <div style={getSize}>{getImage}</div>}
    </>
  )
}

export default MediaGif
