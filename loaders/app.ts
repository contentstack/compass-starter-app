import { getEntries } from '@/services'
import { footerJsonRtePathIncludes,footerReferenceIncludes, navigationReferenceIncludes } from './loaders.helper'

export const getAppConfigData = async (locale:string) => {
    const refUids = [
        ...navigationReferenceIncludes,
        ...footerReferenceIncludes
    ]
    const jsonRtePaths = [
        ...footerJsonRtePathIncludes
    ]

    const webConf= await getEntries('web_configuration', locale, refUids, jsonRtePaths, {})
    if (!webConf || webConf === null) {
        return null
    }
    return webConf
}