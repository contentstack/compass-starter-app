'use client'
import { useEffect, useState } from 'react'
import {isNull}  from 'lodash'
import Personalize from '@contentstack/personalize-edge-sdk'
import { RenderComponents } from '@/components'
import { Page } from '@/types'
import { isDataInLiveEdit } from '@/utils'
import { NotFoundComponent, PageWrapper } from '@/components'
import { onEntryChange } from '@/config'
import useRouterHook from '@/hooks/useRouterHook'
import { setDataForChromeExtension } from '@/utils'
import { heroReferenceIncludes, imageCardsReferenceIncludes, teaserReferenceIncludes, textAndImageReferenceIncludes, textJSONRtePaths } from '@/services/helper'
import { getEntryByUrl } from '@/services'
import { usePersonalization } from '@/context'

/**
 * @component LandingPage - Slug Based
 * 
 * @route '/{locale}/{slug}'
 * @description Component that renders the landing page based on the slug
 * 
 * @returns {JSX.Element}
 */
export default function LandingPage () {

    const [data, setData] = useState<Page.LandingPage['entry'] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const {path, locale} = useRouterHook()
    const [isABTestEnabled, setIsABTestEnabled] = useState<boolean>(false)
    const { personalizationSDK } = usePersonalization()

    /**
     * useEffect to conditionally trigger and impression for a configured AB testing 
     * */ 
    useEffect(() => {
        const variants = personalizationSDK?.getVariants() ?? {}
        if (path === process.env.CONTENTSTACK_AB_LANDING_PAGE_PATH 
            && Personalize.getInitializationStatus() 
            && Personalize.getInitializationStatus() === 'success'
            && variants[process.env.CONTENTSTACK_AB_EXPERIENCE_ID??'1']) {
            setIsABTestEnabled(true)
            personalizationSDK?.triggerImpression(process.env.CONTENTSTACK_AB_EXPERIENCE_ID??'1' as string)
        }
    }, [Personalize.getInitializationStatus()])

    /**
     * useEffect that fetches data to be rendered on the page
     * */ 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const refUids = [
                    ...heroReferenceIncludes,
                    ...textAndImageReferenceIncludes,
                    ...teaserReferenceIncludes,
                    ...imageCardsReferenceIncludes
                ]
                const jsonRtePaths = [
                    ...textJSONRtePaths
                ]
                const res = await getEntryByUrl<Page.LandingPage['entry']>('landing_page',locale, path, refUids, jsonRtePaths, personalizationSDK) as Page.LandingPage['entry']
                setData(res)
                setDataForChromeExtension({ entryUid: res?.uid || '', contenttype: 'landing_page', locale: locale })
                if (!res && !isNull(res)) {
                    throw '404'
                }
            }
            catch (err) {
                console.error('Error while fetching Landing page : ', err)
                setLoading(false)
            }
        }
        onEntryChange(fetchData)
    }, [path])


    return (<>
        {data
            ? <PageWrapper {...data}>
                {data?.components
                    ? <RenderComponents $={data?.$}
                        hero={data?.hero && Array.isArray(data.hero) ? data.hero[0] : data.hero}
                        components={data?.components}
                        isABEnabled={isABTestEnabled}
                    /> : ''}
            </PageWrapper>
            : <>
                {!loading && !isDataInLiveEdit() && <NotFoundComponent />}
            </>}
    </>
    )
}
