import { Taxonomy } from '@/types/pages'
import { getEntries, getEntryByUrl } from '@/services'
import { Page } from '@/types'
import { imageCardsReferenceIncludes, teaserReferenceIncludes, textAndImageReferenceIncludes, textJSONRtePaths } from './loaders.helper'

export const getArticleListingPage = (cmsUrlPath: string, locale: string) => {
    const refUids = [
        ...textAndImageReferenceIncludes,
        ...teaserReferenceIncludes,
        ...imageCardsReferenceIncludes
    ]
    const jsonRtePaths = [
        ...textJSONRtePaths
    ]
    return getEntryByUrl<Page.ArticleListingPage['entry']>('article_listing_page', locale, cmsUrlPath, refUids, jsonRtePaths)  
}

export const getArticleListingPageByTaxonomy = (locale: string , taxonomies?:Taxonomy[]) => {
    const filterQuery = taxonomies?.map((elem) => ( {
        url: `/articles/${elem.taxonomy_uid}/${elem.term_uid.replaceAll('_', '-')}` as string
    }) )
    
    return getEntries<Page.ArticleListingPage['entry'][]>('article_listing_page', locale, [], [], {
        queryOperator: 'or',
        filterQuery
    })  
}