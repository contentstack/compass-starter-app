import { getEntries, getEntryByUrl } from '@/services/contentstack'
import { Taxonomy } from '@/types/pages'
import { Page } from '@/types'
import { articleJSONRtePathIncludes } from './loaders.helper'

export const getArticle = (cmsUrlPath: string, locale: string) => {
    const jsonRtePaths = [...articleJSONRtePathIncludes]
    return getEntryByUrl<Page.ArticlePage['entry']>('article', locale, `${cmsUrlPath}`, [], jsonRtePaths)  
}

export const getArticles = (locale: string , taxonomies?:Taxonomy[], limit?: number) => {

    const groupedData = taxonomies?.reduce((acc, taxonomy) => {
        if (!acc[taxonomy.taxonomy_uid]) {
            acc[taxonomy.taxonomy_uid] = []
        }
        acc[taxonomy.taxonomy_uid].push(taxonomy)
        return acc
    }, {} as Record<string, Taxonomy[]>)
      
    const outputData = groupedData && Object.entries(groupedData)?.length > 0 ? Object.entries(groupedData).map(([taxonomy_uid, terms]) => ({
        taxonomy_uid: taxonomy_uid,
        term_uids: terms.map(term => term.term_uid)
    })) : []

    let filterQuery: { [x: string]: string[]; }[] = []
    if (outputData?.length > 0) {
        filterQuery = outputData.map((dt :  {taxonomy_uid:string, term_uids:string[]}) => ({[`taxonomies.${dt.taxonomy_uid}`]: dt.term_uids }))
    }

    return getEntries<Page.ArticlePage['articles'][]>('article', locale, [], [], {
        queryOperator: 'or',
        filterQuery
    },limit)  
}

export const getArticlesByTaxonomy = async (taxonomyPath: string , locale: string) => {
    const pathArray = taxonomyPath.split('/')
    const uid = pathArray?.[2]
    const term = pathArray?.[3]?.replaceAll('-', '_')

    if (!term) { //check if term exist in url
        throw new Error('Invalid parameters. Valid pageUrl format is /articles/taxonomy_uid/term')
    }

    const filterQuery = { key: `taxonomies.${uid}`, value: term }
    return getEntries<Page.ArticlePage['entry'][]>('article', locale, [], [], {filterQuery} ) 

}