'use client'
import { useEffect, useState } from 'react'
import { isNull } from 'lodash'
import { Text } from '@/components'
import { Page } from '@/types'
import { ArticleCover, NotFoundComponent, PageWrapper, RelatedArticles, RelatedLinks } from '@/components'
import { ImageCardItem } from '@/types/components'
import { onEntryChange } from '@/config'
import { getPersonalizeAttribute, isDataInLiveEdit, removeSpecialChar } from '@/utils'
import useRouterHook from '@/hooks/useRouterHook'
import { setDataForChromeExtension } from '@/utils'
import { usePersonalization } from '@/context'
import { articleJSONRtePathIncludes } from '@/services/helper'
import { getEntries, getEntryByUrl } from '@/services'

/**
 * @component Article - Article Component (Slug Based)
 * 
 * @route '/{locale}/article/{slug}'
 * @description Component that renders the article page based on the slug
 * 
 * @returns {JSX.Element}
 */

export default function Article () {
    const { personalizationSDK, personalizeConfig } = usePersonalization()
    const [data, setData] = useState<Page.ArticlePage['entry'] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [articles, setArticles] = useState<Page.ArticlePage['articles'] | null>(null)
    const [relatedLinks, setRelatedLinks] = useState<Page.ArticleListingPage['entry'][] | []>([])
    const { path, locale } = useRouterHook()

    const taxonomy_path = personalizeConfig?.taxonomy_path

    /**
     * useEffect that sets the required attributes for personalization
     * */ 
    useEffect(() => {
        const setAttribute = async () => {
            const audiences = personalizeConfig?.audiences
            const criteria = (taxonomy_path?.toLowerCase() === data?.taxonomies?.[0]?.taxonomy_uid.toLowerCase()) ? data?.taxonomies?.[0]?.term_uid.toLowerCase() : data?.taxonomies?.[1]?.term_uid.toLowerCase()
            const attributes = getPersonalizeAttribute(audiences, removeSpecialChar(String(criteria)))
            await personalizationSDK?.set({ ...attributes })
        }

        if(personalizeConfig) setAttribute()

    }, [personalizeConfig, taxonomy_path, data])

    /**
     * @method fetchData
     * @description method to fetch the article data based on the slug
     * 
     * @async
     * */ 
    const fetchData = async () => {
        try {
            const jsonRtePaths = [...articleJSONRtePathIncludes]
            const entryData = await getEntryByUrl('article', locale, path, [], jsonRtePaths, personalizationSDK) as Page.ArticlePage['entry']
            setData(entryData)
            setDataForChromeExtension({ entryUid: entryData?.uid || '', contenttype: 'article', locale: locale })
            if (!entryData && !isNull(entryData)) {
                throw '404'
            }
        } catch (err) {
            console.error('🚀 ~ article.tsx ~ fetchData ~ err:', err)
            setLoading(false)
        }
    }

    /**
     * @method fetchArticles
     * @description method to fetch the related articles based on the current article's taxonomy data
     * 
     * @async
     * */ 
    const fetchArticles = async () => {
        try {
            if (data && data?.taxonomies?.length > 0) {

                if (show_related_links) {
                    // filterQuery is an array of objects, where each objects contains article listing page URL based on the taxonomy data
                    const filterQuery = data.taxonomies?.map((elem) => ( {
                        url: `/articles/${elem.taxonomy_uid}/${elem.term_uid.replaceAll('_', '-')}` as string
                    }) )
                    
                    // filterQuery is matched against article_listing_page content-type to fetch related listing pages.
                    const listingData = await getEntries('article_listing_page', locale, [], [], {
                        queryOperator: 'or',
                        filterQuery
                    }, personalizationSDK) as Page.ArticleListingPage['entry'][]
                    listingData && setRelatedLinks(listingData)
                }

                if (show_related_articles) {
                    // Group taxonomies by their UID
                    const groupedData = data.taxonomies?.reduce((acc, { taxonomy_uid, term_uid }) => {
                        acc[taxonomy_uid] = acc[taxonomy_uid] || []
                        acc[taxonomy_uid].push(term_uid)
                        return acc
                    }, {} as Record<string, string[]>)

                    // The filterQuery is an array of objects, with each object representing a filter condition based on taxonomy_uid and its associated terms.
                    const filterQuery = Object.entries(groupedData || {}).map(([taxonomy_uid, term_uids]) => ({
                        [`taxonomies.${taxonomy_uid}`]: term_uids
                    }))
                    const articlesData = await getEntries<Page.ArticlePage['articles'][]>('article', locale, [], [], {
                        queryOperator: 'or',
                        filterQuery
                    }, personalizationSDK)
                    const filteredArticles = articlesData?.filter((article) => article.uid !== data?.uid)
                    filteredArticles && setArticles(filteredArticles as any)
                }
            } else {
                setRelatedLinks([])
                setArticles([])
            }

        } catch (err) {
            console.error('🚀 ~ article.tsx ~ fetchArticles ~ err:', err)
            setArticles([])
        }
    }

    /**
     * useEffect that handles data fetching on pageLoad and live preview
     * */ 
    useEffect(() => {
        onEntryChange(fetchData)
    }, [path])

    /**
     * useEffect that handles fetching of related articles
     * */ 
    useEffect(() => {
        fetchArticles()
    }, [data])


    const { content, title, summary, cover_image, show_related_links, related_links, show_related_articles, related_articles, $ } = data || {}

    /**
     * Restructuring fetched articles data into cards to display as Related Articles
     * */ 
    const cards: ImageCardItem[] | [] = articles?.map((article) => {
        return ({
            title: article?.title,
            content: article?.summary,
            image: article?.cover_image,
            $: article?.$,
            cta: article?.url
        })
    }) as ImageCardItem[] | []

    const relatedArticles = cards && cards.splice(0, (data?.related_articles?.number_of_articles && data?.related_articles?.number_of_articles <= 6) ? related_articles?.number_of_articles : 6)

    return (
        data ? <>
            <PageWrapper {...data}>
                <ArticleCover title={title}
                    summary={summary}
                    cover_image={cover_image}
                    $={$}
                    _content_type_uid={'article'}
                />
                <Text
                    content={content}
                    $={$}
                    id={'article-content'}
                />
                {data?.taxonomies?.length > 0 && show_related_links && <RelatedLinks
                    relatedLinks={relatedLinks}
                    relatedLinksLabel={related_links}
                    $={data?.$}
                />}
                {show_related_articles && relatedArticles && relatedArticles.length > 0 && <RelatedArticles
                    related_articles={related_articles}
                    cards={relatedArticles}
                />}
            </PageWrapper>

        </>
            : !loading && !isDataInLiveEdit() && <NotFoundComponent />
    )

}
