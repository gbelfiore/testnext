import React, { useCallback, useMemo } from "react";
import styles from './ShareButton.module.css';
import { getConfigForCountry } from "~/config";
import { useSchemaStore } from "~/state/schema";
import { useFlyoutStore } from "~/state/flyout";
import { StringManipulator } from "~/utilities/string-manipulator";
import { BrowserService } from "~/utilities/browser-service";

export const ShareButton: React.FC = () => {
  const config = useMemo(getConfigForCountry, [])

  const retailerName = useSchemaStore((state) => state.schema?.retailer?.name)
  const productName = useFlyoutStore((state) => state.activeProduct?.name)
  const description = useFlyoutStore((state) => {
    let desc = state.activeProduct?.description ?? ''
    desc = StringManipulator.replaceAll(desc, '<br>', '\n')
    desc = StringManipulator.replaceAll(desc, '<br/>', '\n')
    desc = StringManipulator.replaceAll(desc, '<br />', '\n')
    desc = desc.replace(/(&lt;([^>]+)>)/gi, '').trim()
    return desc
  })
  const productId = useFlyoutStore((state) => state.activeProduct?.id)

  const sectionIndex = useSchemaStore((state) => {
    const sections = state.schema?.sections
    if (sections && productId) {
      return sections.findIndex((section) => section.products?.map((product) => product.id).includes(productId))
    }
  })

  const shareLink = useMemo(() => {
    if (sectionIndex != undefined) {
      const sectionId = useSchemaStore.getState().schema?.sections?.[sectionIndex]?.id ?? ''
      return BrowserService.getShareProductLink(sectionId, productId)
    }
  }, [productId, sectionIndex])

  const title = useMemo(() => {
    // let dateComposer = [];
    const titleComposer = []
    // if (dateFrom) dateComposer.push('valido dal ' + dateFrom);
    // if (dateTo) dateComposer.push('al ' + dateTo);
    if (retailerName) titleComposer.push(retailerName)
    // if (dateComposer.length > 0) titleComposer.push(dateComposer.join(' '));
    if (productName) titleComposer.push(productName)
    return titleComposer.join(' - ')
  }, [productName, retailerName])

  const shareText = useMemo(() => {
    const shareText = description + '\n'
    if (title) return title + '\n\n' + shareText
    return shareText
  }, [description, title])

  const onClick = useCallback(async () => {
    try {
      if (!navigator.share) await import('share-api-polyfill')

      const shareData: ShareData = {
        text: shareText,
        url: shareLink,
        title: title,
      }

      //TODO[GB]: da sistemare perchè l'immagine non si vede
      // if (productImageSrc) {
      // 	try {
      // 		const blob = await fetch(productImageSrc).then((r) => r.blob());
      // 		const file = new File([blob], 'file.png', { type: blob.type });
      // 		if (file) shareData.files = [file];
      // 	} catch (error) {
      // 		console.error(error);
      // 	}
      // }

      await navigator.share?.(shareData, {
        copy: true,
        email: true,
        whatsapp: true,
        twitter: false,
        print: false,
        sms: false,
        facebook: false,
        telegram: false,
        skype: false,
        linkedin: false,
        pinterest: false,
        language: config.SHARE.LANG,
      })


    } catch (error) {
      console.error(error)
    }
  }, [config, shareText, shareLink, title])

  return (
    <button onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" className={styles.svg} viewBox="0 0 40 40" fill="none">
        <mask id="mask0_7734_1092" className={styles.mask} maskUnits="userSpaceOnUse" x="8" y="8" width="24" height="24">
          <rect x="8" y="8" width="24" height="24" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_7734_1092)">
          <path d="M25.6164 29C24.9116 29 24.3121 28.7532 23.8181 28.2596C23.324 27.766 23.0769 27.1667 23.0769 26.4615C23.0769 26.3463 23.0861 26.227 23.1044 26.1035C23.1228 25.9801 23.1503 25.8663 23.187 25.7621L16.3597 21.7645C16.116 22.0071 15.8384 22.1967 15.5272 22.3334C15.216 22.4701 14.8864 22.5384 14.5384 22.5384C13.8333 22.5384 13.234 22.2917 12.7404 21.7984C12.2468 21.305 12 20.7059 12 20.001C12 19.2962 12.2468 18.6967 12.7404 18.2027C13.234 17.7086 13.8333 17.4615 14.5384 17.4615C14.8864 17.4615 15.216 17.5299 15.5272 17.6666C15.8384 17.8033 16.116 17.9929 16.3597 18.2355L23.187 14.2379C23.1503 14.1337 23.1228 14.0199 23.1044 13.8965C23.0861 13.773 23.0769 13.6537 23.0769 13.5384C23.0769 12.8333 23.3236 12.234 23.817 11.7404C24.3104 11.2468 24.9095 11 25.6143 11C26.3192 11 26.9186 11.2467 27.4127 11.7401C27.9068 12.2335 28.1538 12.8326 28.1538 13.5374C28.1538 14.2422 27.907 14.8417 27.4134 15.3358C26.9199 15.8298 26.3205 16.0769 25.6154 16.0769C25.2675 16.0769 24.9379 16.0085 24.6266 15.8719C24.3154 15.7352 24.0379 15.5455 23.7941 15.3029L16.9668 19.3006C17.0035 19.4047 17.031 19.5183 17.0494 19.6414C17.0677 19.7644 17.0769 19.8833 17.0769 19.9981C17.0769 20.113 17.0677 20.2325 17.0494 20.3568C17.031 20.4811 17.0035 20.5953 16.9668 20.6994L23.7941 24.697C24.0379 24.4544 24.3154 24.2648 24.6266 24.1281C24.9379 23.9914 25.2675 23.9231 25.6154 23.9231C26.3205 23.9231 26.9199 24.1698 27.4134 24.6632C27.907 25.1566 28.1538 25.7557 28.1538 26.4605C28.1538 27.1653 27.9071 27.7648 27.4137 28.2589C26.9204 28.7529 26.3212 29 25.6164 29ZM25.6154 14.6923C25.9361 14.6923 26.2086 14.5802 26.4329 14.3559C26.6571 14.1316 26.7693 13.8591 26.7693 13.5384C26.7693 13.2177 26.6571 12.9452 26.4329 12.7209C26.2086 12.4967 25.9361 12.3846 25.6154 12.3846C25.2947 12.3846 25.0222 12.4967 24.7979 12.721C24.5736 12.9452 24.4615 13.2177 24.4615 13.5384C24.4615 13.8592 24.5736 14.1316 24.7979 14.3559C25.0222 14.5802 25.2947 14.6923 25.6154 14.6923ZM14.5384 21.1538C14.8591 21.1538 15.1316 21.0417 15.3559 20.8174C15.5802 20.5932 15.6923 20.3207 15.6923 20C15.6923 19.6793 15.5802 19.4068 15.3559 19.1825C15.1316 18.9582 14.8591 18.8461 14.5384 18.8461C14.2177 18.8461 13.9452 18.9582 13.721 19.1825C13.4967 19.4068 13.3846 19.6793 13.3846 20C13.3846 20.3207 13.4967 20.5932 13.721 20.8175C13.9452 21.0417 14.2177 21.1538 14.5384 21.1538ZM25.6154 27.6154C25.9361 27.6154 26.2086 27.5033 26.4329 27.279C26.6571 27.0547 26.7693 26.7822 26.7693 26.4615C26.7693 26.1408 26.6571 25.8683 26.4329 25.644C26.2086 25.4198 25.9361 25.3077 25.6154 25.3077C25.2947 25.3077 25.0222 25.4198 24.7979 25.6441C24.5736 25.8683 24.4615 26.1408 24.4615 26.4615C24.4615 26.7822 24.5736 27.0547 24.7979 27.279C25.0222 27.5033 25.2947 27.6154 25.6154 27.6154Z" fill="#282832" />
        </g>
      </svg>
    </button>
  )
}