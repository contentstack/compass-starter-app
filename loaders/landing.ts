import { getEntryByUrl } from '@/services'
import { Page } from '@/types'
import { imageCardsReferenceIncludes, teaserReferenceIncludes, textAndImageReferenceIncludes, textJSONRtePaths } from './loaders.helper'

export const getLandingPage = (cmsUrlPath: string | undefined, locale: string) => {
    const refUids = [
        ...textAndImageReferenceIncludes,
        ...teaserReferenceIncludes,
        ...imageCardsReferenceIncludes
    ]
    const jsonRtePaths = [
        ...textJSONRtePaths
    ]
    
    return getEntryByUrl<Page.LandingPage['entry']>('landing_page',locale, `${cmsUrlPath}`, refUids, jsonRtePaths)  
}
