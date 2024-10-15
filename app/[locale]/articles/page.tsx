'use client'
import { useEffect, useState } from 'react'
import { isNull } from 'lodash'
import { getArticleListingPage, getArticles } from '@/loaders'
import { CardCollection, NoArticles, PageWrapper, Pagination } from '@/components'
import { RenderComponents } from '@/components'
import { ImageCardItem } from '@/types/components'
import {  Page } from '@/types'
import { onEntryChange } from '@/config'
import useRouterHook from '@/hooks/useRouterHook'
import { setDataForChromeExtension } from '@/utils'

export default function ArticleListing () { 

    const [data, setData] = useState<Page.ArticleListingPage['entry'] | null>(null)
    const [articles, setArticles] = useState<Page.ArticleListingPage['articles'] | null>(null)
    const [cards, setCards] = useState<ImageCardItem[] | []>([])
    const noArticles = articles && articles?.length > 0 ? false : true
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [articlesPerPage] = useState<number>(12)
    const {path, locale} = useRouterHook()

    const RenderCardCollection = () => {
        const lastIndex = currentPage * articlesPerPage
        const firstIndex = lastIndex - articlesPerPage
        const articlesList: ImageCardItem[] | [] = cards?.slice(firstIndex, lastIndex)
        return(
            !isNull(articles) && noArticles ? <NoArticles />
                : <>
                    {cards?.length > 0
                    && <CardCollection
                        id='articles-card-collection'
                        cards={articlesList}
                        totalCount={cards?.length}
                    /> }
                </> 
        )

    }

    const fetchData = async () => {
        try{
            const res = await getArticleListingPage(path, locale) as Page.ArticleListingPage['entry']
            setData(res)
            setDataForChromeExtension({ entryUid: res?.uid || '', contenttype: 'article_listing_page', locale: locale })
        } catch(error) {
            console.error('Error while fetching ArticleListingPage:', error)
        }
    }
    const fetchArticles = async () => {
        try{
            const articleCollection = await getArticles(locale) as Page.Article['articles'][]
            setArticles(articleCollection)
        } catch(error) {
            console.error('Error while fetching Articles:', error)
        }
    }

    useEffect(() => {
        fetchArticles()
        onEntryChange(fetchData)
    }, [])

    useEffect(() => {
        const cardsData: ImageCardItem[] | []  =  articles?.map((article) => {
            return ({
                title: article?.title,
                content: article?.summary,
                image: article?.cover_image,
                $: article?.$,
                cta: article?.url
            })
        }) as ImageCardItem[] | [] 
        setCards(cardsData)
    }, [articles])

    return ( <>
        {data && <PageWrapper {...data} contentType='article_listing_page'>
            {data?.title && <div className='pt-16 px-8 mb-16 bg-background-primary dark:bg-white text-center max-w-7xl mx-auto'>
                <h1 data-id='h1' className='mx-auto text-black' {...data?.$?.title}>{data?.title}</h1>
            </div>}
            {data?.components && Object.keys(data.components)?.length ? (
                <RenderComponents
                    components={data?.components}
                />
            ) : <></>}
        </PageWrapper>}
        <div className='card-collection mt-16' id='pagination-scroll-anchor'>
            <RenderCardCollection />
            { // Paginaion component
                cards?.length > 12 && <div className='py-8 px-8 xl:px-0 bg-background-primary dark:bg-transparent text-center max-w-7xl mx-auto'>
                    <Pagination
                        length={cards?.length}
                        dataPerPage={articlesPerPage}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            }
        </div>
    </>
    )
}