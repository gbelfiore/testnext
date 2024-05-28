import { isEmpty } from 'lodash-es'
import { TMedia } from '~/typings/schema'
import { IMediaProductOpt, IMediaOpt } from '~/typings/schemaopt'
import QueryUrlUtility from '../query-url-utility/QueryUrlUtility'
import { VirtualizationConfig } from './VirtualizationUtility'

class MediaUtils {
  static getImageInfoFromPath(imagePath: string): Record<string, any> | void {
    if (!imagePath) return
    const url = new URL('http://' + imagePath)
    const search = new URLSearchParams(url.search)
    const queryStrings = QueryUrlUtility.getObjectFromEntries(search.entries())

    try {
      if (queryStrings.ar) {
        return queryStrings
      }
      if (queryStrings.w && queryStrings.h && !queryStrings.ar) {
        return {
          ...queryStrings,
          ar: parseFloat(queryStrings.w) / parseFloat(queryStrings.h),
        }
      }
    } catch (error) {
      console.error(error)
    }

    return queryStrings
  }

  static getImageHeight(src?: string): number {
    if (!src) return 0
    const imageInfo = MediaUtils.getImageInfoFromPath(src)
    if (imageInfo?.ar) return VirtualizationConfig.windowWidth / Number(imageInfo.ar)

    return 0
  }

  static getMediaHeight(media: IMediaProductOpt<TMedia> | IMediaOpt<TMedia>, isDesktop?: boolean): number {
    let mediaHeight = 0
    if (media.type === 'image') {
      const image = media as IMediaProductOpt<'image'>
      mediaHeight = MediaUtils.getImageHeight(image.props?.src || '')
    } else if (media.type === 'externalImage') {
      const externalImage = media as IMediaProductOpt<'externalImage'>
      mediaHeight = MediaUtils.getImageHeight(externalImage.props?.url || '')
    } else if (media.type === 'gif') {
      const gif = media as IMediaProductOpt<'gif'>
      mediaHeight = MediaUtils.getImageHeight(gif.props?.src || '')
    } else if (media.type === 'externalGif') {
      const externalGif = media as IMediaProductOpt<'externalGif'>
      mediaHeight = MediaUtils.getImageHeight(externalGif.props?.url || '')
    } else if (media.type === 'video') {
      const video = media as IMediaProductOpt<'video'>
      mediaHeight = MediaUtils.getImageHeight(video.props?.src || '')
    } else if (media.type === 'externalVideo') {
      const externalVideo = media as IMediaProductOpt<'externalVideo'>
      mediaHeight = MediaUtils.getImageHeight(externalVideo.props?.url || '')
    } else if (media.type === 'multiImages') {
      const multiImages = media as IMediaProductOpt<'multiImages'>
      const firstImage = multiImages.props?.src[0]
      mediaHeight = firstImage ? MediaUtils.getImageHeight(firstImage) : VirtualizationConfig.mediaMultiImages
      mediaHeight = isDesktop ? mediaHeight / 2 : mediaHeight
      mediaHeight += VirtualizationConfig.dotsMediaMultiImages
      if (!isEmpty(multiImages.props?.title) || !isEmpty(multiImages.props?.icon)) mediaHeight += VirtualizationConfig.headerMediaMultiImages
    }

    return mediaHeight
  }
}

export default MediaUtils
