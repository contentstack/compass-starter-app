'use client'
import { useEffect, useState } from 'react'
import { RenderComponents } from '@/components'
import { Page } from '@/types'
import { NotFoundComponent, PageWrapper } from '@/components'
import { onEntryChange } from '@/config'
import useRouterHook from '@/hooks/useRouterHook'
import { isDataInLiveEdit, setDataForChromeExtension } from '@/utils'
import { featuredArticlesReferenceIncludes, heroReferenceIncludes, imageCardsReferenceIncludes, teaserReferenceIncludes, textAndImageReferenceIncludes, textJSONRtePaths } from '@/services/helper'
import { getEntryByUrl } from '@/services'
import { usePersonalization } from '@/context'

/**
 * @component Home 
 * 
 * @route '/{locale}/'
 * @description component that renders the home page of the app
 *  
 * @returns {JSX.Element} The rendered homepage content
 */
export default function Home () {

    const [data, setData] = useState<Page.LandingPage['entry'] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const { path, locale } = useRouterHook()
    const {personalizationSDK} = usePersonalization()

    /**
    * @method fetchData
    * @description Method that fetches the home page data and populates state with it
    *
    * @async
    * @returns {Promise<void>}
    */
    const fetchData = async () => {
        try {
            const refUids = [
                ...heroReferenceIncludes,
                ...textAndImageReferenceIncludes,
                ...teaserReferenceIncludes,
                ...imageCardsReferenceIncludes,
                ...featuredArticlesReferenceIncludes
            ]
            const jsonRTEPaths = [
                ...textJSONRtePaths
            ]
            const res = await getEntryByUrl<Page.Homepage['entry']>('home_page', locale, path , refUids, jsonRTEPaths, personalizationSDK) as Page.LandingPage['entry']
            setData(res)
            setDataForChromeExtension({ entryUid: res?.uid ?? '', contenttype: 'home_page', locale: locale })
            if (!res) {
                throw '404'
            }
        } catch (err) {
            console.error('🚀 ~ fetchData ~ err:', err)
            setLoading(false)
        }
    }

    /**
     * useEffect to fetch data to be rendered on the page
     * */ 
    useEffect(() => {
        onEntryChange(fetchData)
    }, [])

    return (
        <>
            {data
                ? <PageWrapper {...data}>
                    {data?.components
                        ? <RenderComponents $={data?.$}
                            hero={data?.hero && Array.isArray(data.hero) ? data.hero[0] : data.hero}
                            components={[
                                // eslint-disable-next-line no-unsafe-optional-chaining
                                ...data?.components
                            ]}
                            featured_articles={data?.featured_articles}
                        /> : ''}
                </PageWrapper>
                : <>
                    {!loading && !isDataInLiveEdit() && <NotFoundComponent />}
                </>}
        </>
    )
}
