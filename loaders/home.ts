import { getEntryByUrl } from '@/services'
import { Page } from '@/types'
import { featuredArticlesReferenceIncludes, imageCardsReferenceIncludes, teaserReferenceIncludes, textAndImageReferenceIncludes, textJSONRtePaths } from './loaders.helper'

export const getHomePage = ( cmsUrlPath: string, locale: string) => {
    const refUids = [
        ...textAndImageReferenceIncludes,
        ...teaserReferenceIncludes,
        ...imageCardsReferenceIncludes,
        ...featuredArticlesReferenceIncludes 
    ]

    const jsonRTEPaths = [
        ...textJSONRtePaths
    ]

    return getEntryByUrl<Page.Homepage['entry']>('home_page',locale, cmsUrlPath , refUids, jsonRTEPaths)
}