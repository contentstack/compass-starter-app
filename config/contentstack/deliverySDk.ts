import Contentstack from '@contentstack/delivery-sdk'
import ContentstackLivePreview, { IStackSdk } from '@contentstack/live-preview-utils'
import { LivePreviewMode } from '@/types/common'

export const Stack = Contentstack.stack({
    apiKey: process.env.CONTENTSTACK_API_KEY as string,
    deliveryToken: process.env.CONTENTSTACK_DELIVERY_TOKEN as string,
    environment: process.env.CONTENTSTACK_ENVIRONMENT as string,
    branch: process.env.CONTENTSTACK_BRANCH,
    host: process.env.CONTENTSTACK_HOST,
    live_preview: {
        enable: process.env.isLivePreviewEnabled === 'true' ? true : false,
        host: process.env.CONTENTSTACK_PREVIEW_HOST,
        preview_token: process.env.CONTENTSTACK_PREVIEW_TOKEN
    }
})

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

export const onEntryChange = ContentstackLivePreview.onEntryChange
export const isLivePreviewEnabled = process.env.isLivePreviewEnabled === 'true'
export const isEditButtonsEnabled = process.env.isEditButtonsEnabled === 'true'