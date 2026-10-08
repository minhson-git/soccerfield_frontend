import { useClipboard, useShare } from '@vueuse/core'

/** Native share sheet on mobile, copy-to-clipboard fallback elsewhere. */
export function useShareLink() {
  const { share: nativeShare, isSupported } = useShare()
  const { copy, copied } = useClipboard({ copiedDuring: 2000 })

  async function share(data: { title: string; url: string }): Promise<void> {
    if (isSupported.value) {
      try {
        await nativeShare(data)
        return
      } catch {
        // User closed the share sheet
        return
      }
    }
    await copy(data.url)
  }

  return { share, copied }
}
