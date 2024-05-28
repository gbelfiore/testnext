import { BottomSheetRef } from "react-spring-bottom-sheet"
import { RefsManager } from "./refs-manager"
import { RefKeys } from "./refs-manager/enum"
import { BrowserService } from "./browser-service"

export function getFlyoutHeaderHeight(isDesktop: boolean) {
  return isDesktop ? 52 : 48
}

export function getFlyoutBackdropHeight() {
  return 50 + (BrowserService.isBackoffice ? 64 : 0)
}

export function getOpenFlyoutHeight() {
  return globalThis.innerHeight - getFlyoutBackdropHeight()
}

export function openFlyout() {
  const flyout = RefsManager.getRef<BottomSheetRef>(RefKeys.FLYOUT_CONTENT)
  const to = getOpenFlyoutHeight()

  requestAnimationFrame(() => {
    flyout?.ref.snapTo(to)
  })
}
