import Contentstack from '@contentstack/delivery-sdk'
import ContentstackLivePreview from '@contentstack/live-preview-utils'
// import { IStackSdk } from '@contentstack/live-preview-utils/dist/src/utils/types' 
export const Stack = Contentstack.stack({
    apiKey: process.env.CONTENTSTACK_API_KEY as string,
    deliveryToken: process.env.CONTENTSTACK_DELIVERY_TOKEN as string,
    environment: process.env.CONTENTSTACK_ENVIRONMENT as string,
    branch: process.env.CONTENTSTACK_BRANCH,
    host: process.env.CONTENTSTACK_HOST,
    live_preview: {
        enable: true,
        host: process.env.CONTENTSTACK_PREVIEW_HOST,
        preview_token: process.env.CONTENTSTACK_PREVIEW_TOKEN
    }
})


ContentstackLivePreview.init({
    clientUrlParams: { host: process.env.CONTENTSTACK_APP_HOST },
    stackDetails: {
        apiKey: process.env.CONTENTSTACK_API_KEY,
        environment: process.env.CONTENTSTACK_ENVIRONMENT,
        branch: process.env.CONTENTSTACK_BRANCH
    },
    stackSdk: Stack.config as any, // once type definition is availble from SDK any need to be replaced with IStackSdk
    ssr: false
})

export const onEntryChange = ContentstackLivePreview.onEntryChange
export const isLivePreviewEnabled= process.env.isLivePreviewEnabled === 'true'
export const isEditButtonsEnabled= process.env.isEditButtonsEnabled === 'true'