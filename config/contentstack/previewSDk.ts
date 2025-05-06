import ContentstackLivePreview, { IStackSdk, VB_EmptyBlockParentClass } from '@contentstack/live-preview-utils'
import { LivePreviewMode } from '@/types/common'
import { Stack } from './deliverySDk'

const getLocaleForURL = () => {
    if (typeof window === 'undefined') return 'en'
    return window.location.pathname?.split('/').filter(Boolean)[0]
}

ContentstackLivePreview.init({
    enable: process.env.isLivePreviewEnabled === 'true' ? true : false,
    mode: process.env.CONTENTSTACK_VISUAL_BUILDER_MODE as LivePreviewMode,
    clientUrlParams: { host: process.env.CONTENTSTACK_APP_HOST },
    stackDetails: {
        apiKey: process.env.CONTENTSTACK_API_KEY,
        environment: process.env.CONTENTSTACK_ENVIRONMENT,
        branch: process.env.CONTENTSTACK_BRANCH,
        locale: getLocaleForURL()
    },
    stackSdk: Stack.config as IStackSdk,
    ssr: false
})

export const previewSdk = {
    onEntryChange: ContentstackLivePreview.onEntryChange,
    VB_EmptyBlockParentClass: VB_EmptyBlockParentClass
}