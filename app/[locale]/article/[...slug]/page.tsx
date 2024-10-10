'use client'
import { useEffect, useState } from 'react'
import { isNull } from 'lodash'
import { getArticle, getArticleListingPageByTaxonomy, getArticles } from '@/loaders'
import { RenderComponents } from '@/components'
import { Page } from '@/types'
import { ArticleCover, NotFoundComponent, PageWrapper, RelatedArticles, RelatedLinks } from '@/components'
import { ImageCardItem } from '@/types/components'
import { onEntryChange } from '@/config'
import { getPersonalizeAttribute, isDataInLiveEdit, removeSpecialChar } from '@/utils'
import useRouterHook from '@/hooks/useRouterHook'
import { setDataForChromeExtension } from '@/utils'
import { usePersonalization } from '@/context'


export default function Article () {
    const { personalizationSDK, personalizeConfig } = usePersonalization()
    const [data, setData] = useState<Page.ArticlePage['entry'] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [articles, setArticles] = useState<Page.ArticlePage['articles'] | null>(null)
    const [relatedLinks, setRelatedLinks] = useState<Page.ArticleListingPage['entry'][] | []>([])
    const { path, locale } = useRouterHook()

    const taxonomy_path = personalizeConfig?.taxonomy_path

    useEffect(() => {
        const setAttribute = async () => {
            const audiences = personalizeConfig?.audiences
            const criteria = (taxonomy_path?.toLowerCase() === data?.taxonomies?.[0]?.taxonomy_uid.toLowerCase()) ? data?.taxonomies?.[0]?.term_uid.toLowerCase() : data?.taxonomies?.[1]?.term_uid.toLowerCase()
            const attributes = getPersonalizeAttribute(audiences, removeSpecialChar(String(criteria)))
            await personalizationSDK.set({ ...attributes })
        }

        if(personalizeConfig) setAttribute()

    }, [personalizeConfig])

    const fetchData = async () => {
        try {
            const entryData = await getArticle(path, locale) as Page.ArticlePage['entry']
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
    const fetchArticles = async () => {
        try {
            if (data && data?.taxonomies?.length > 0) {
                if (show_related_links) {
                    const listingData = await getArticleListingPageByTaxonomy(locale, data?.taxonomies) as Page.ArticleListingPage['entry'][]
                    listingData && setRelatedLinks(listingData)
                }
                if (show_related_articles) {
                    let articlesData = await getArticles(locale, data?.taxonomies, 7) as Page.ArticlePage['articles']
                    articlesData = articlesData?.filter((article) => article.uid !== data?.uid)
                    articlesData && setArticles(articlesData)
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

    useEffect(() => {
        onEntryChange(fetchData)
    }, [path])

    useEffect(() => {
        fetchArticles()
    }, [data])


    const { content, title, summary, cover_image, show_related_links, related_links, show_related_articles, related_articles, $ } = data || {}

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
            <PageWrapper {...data} contentType='article'>
                <ArticleCover
                    title={title}
                    summary={summary}
                    cover_image={cover_image}
                    $={$}
                />
                <RenderComponents components={[{
                    text: {
                        content,
                        $: $
                    }
                }]}
                />
                {show_related_links && <RelatedLinks
                    relatedLinks={relatedLinks}
                    relatedLinksLabel={related_links}
                    $={data?.$}
                />}
                {show_related_articles && <RelatedArticles
                    related_articles={related_articles}
                    cards={relatedArticles}
                />}
            </PageWrapper>

        </>
            : !loading && !isDataInLiveEdit() && <NotFoundComponent />
    )

}
