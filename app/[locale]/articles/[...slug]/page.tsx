'use client'
import { useEffect, useState } from 'react'
import { isNull } from 'lodash'
import {  Page } from '@/types'
import { CardCollection, NoArticles, NotFoundComponent, PageWrapper, Pagination } from '@/components'
import { RenderComponents } from '@/components'
import { ImageCardItem } from '@/types/components'
import { getPersonalizeAttribute, isDataInLiveEdit, removeSpecialChar } from '@/utils'
import { onEntryChange } from '@/config'
import useRouterHook from '@/hooks/useRouterHook'
import { setDataForChromeExtension } from '@/utils'
import { usePersonalization } from '@/context'
import { imageCardsReferenceIncludes, teaserReferenceIncludes, textAndImageReferenceIncludes, textJSONRtePaths } from '@/services/helper'
import { getEntries, getEntryByUrl } from '@/services'

/**
 * @component Article - ArticleListing Component (Slug Based)
 * 
 * @route '/{locale}/articles/{slug}'
 * @description Component that renders the all articles page based on the slug (region/topic)
 * 
 * @returns {JSX.Element}
 */
export default function Article () {

    const { personalizationSDK, personalizeConfig } = usePersonalization()

    const [data, setData] = useState<Page.ArticleListingPage['entry'] | null>(null)
    const [articles, setArticles] = useState<Page.ArticleListingPage['articles'] | null>(null)
    const noArticles = articles && articles?.length > 0 ? false : true
    const [cards, setCards] = useState<ImageCardItem[] | []>([])
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [articlesPerPage] = useState<number>(12)
    const {path, locale} = useRouterHook()

    const pathArray = path.split('/')
    const taxonomyUid = pathArray?.[2]
    const taxonomyTerm = pathArray?.[3]?.replaceAll('-', '_')
    
    /**
     * @method RenderCardCollection
     * 
     * @description Method that renders the card collection based on the restructured data
     * @returns {JSX.Element} Card collections or Not Found component conditionally
     * */ 
    const RenderCardCollection = () => {
        const lastIndex = currentPage * articlesPerPage
        const firstIndex = lastIndex - articlesPerPage
        const articlesList: ImageCardItem[] | [] = cards?.slice(firstIndex, lastIndex)
        return(
            !isNull(articles) && noArticles
                ? !isNull(data) && typeof data !=='undefined' ? <NoArticles /> 
                    : <> {!isDataInLiveEdit() && <NotFoundComponent />} </> // No articles, no entryData and not in live edit mode will render NotFound component
                : <>
                    {cards?.length > 0
                && <CardCollection
                    cards={articlesList}
                    count={cards?.length}
                    className='mb-25'
                /> }
                </>
        )
    }

    /**
     * @method fetchData
     * @description method that fetches data of the article listing page itself, primarily for setting data for the Chrome extension
     * 
     * @async
     * */ 
    const fetchData = async () => {
        try{
            const refUids = [
                ...textAndImageReferenceIncludes,
                ...teaserReferenceIncludes,
                ...imageCardsReferenceIncludes
            ]
            const jsonRtePaths = [
                ...textJSONRtePaths
            ]
            // fetch article listing page content by page Url
            const res = await getEntryByUrl('article_listing_page', locale, path, refUids, jsonRtePaths, personalizationSDK) as Page.ArticleListingPage['entry']
            setData(res)
            setDataForChromeExtension({ entryUid: res?.uid || '', contenttype: 'article_listing_page', locale: locale })
        } catch(error) {
            console.error('Error while fetching ArticleListingPage:', error)
        }
    }

    /**
     * @method fetchArticles
     * @description method that fetches the articles based on the slug
     * 
     * @async
     */
    const fetchArticles = async () => {
        try{
            if (!taxonomyTerm) { //check if term exist in url
                throw new Error('Invalid parameters. Valid pageUrl format is /articles/taxonomy_uid/term')
            }
            // fetch article by taxonomy term and uid provided in page url
            const filterQuery = { key: `taxonomies.${taxonomyUid}`, value: taxonomyTerm }
            const articleCollection = await getEntries('article', locale, [], [], {filterQuery}, personalizationSDK ) as Page.ArticlePage['entry'][]
            setArticles(articleCollection)
        } catch(error) {
            console.error('Error while fetching Articles:', error)
            setArticles([])
        }
    }

    /**
     * useEffect that fetched page and articles data
     * */ 
    useEffect(() => {
        onEntryChange(fetchData)
        fetchArticles()
    }, [])

    /**
     * useEffect that sets the required attributes based on the slug for personalization
     * */ 
    useEffect(() => {
        const setAttribute = async () => {
            const audiences = personalizeConfig?.audiences
            const criteria = path.substring(path.lastIndexOf('/')+1,path.length)
            const attributes = getPersonalizeAttribute(audiences, removeSpecialChar(String(criteria)))
            await personalizationSDK?.set({...attributes})
        }

        if(personalizeConfig) setAttribute()
    }
    , [personalizeConfig, path])

    /**
     * useEffect that maps over the fetched articles data and structure them as cards to display on the page
     * */  
    useEffect(() => {
        const cardsData: ImageCardItem[] | [] =  articles?.map((article) => {
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

    return (<>
        {data && <PageWrapper {...data}>
            {data?.title && <div className='my-25 mx-[2.25rem] md:mx-[5.25rem] bg-background-primary dark:bg-white'>
                <h1 className='text-stone max-w-max' {...data?.$?.title}>{data?.title}</h1>
            </div>}
            {(data?.components?.length > 0) ? (
                <RenderComponents $={data?.$}
                    components={data?.components}
                />
            ) : <></>}
        </PageWrapper>}
        <div className='card-collection mx-[2.25rem] md:mx-[5.25rem]' id='pagination-scroll-anchor'>
            <RenderCardCollection />
            { // Pagination component
                cards?.length > 12 && <div className='my-25 bg-background-primary dark:bg-transparent text-center'>
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