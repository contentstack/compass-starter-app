'use client'
import { useEffect, useState } from 'react'
import { getHomePage } from '@/loaders'
import { RenderComponents } from '@/components'
import { Page } from '@/types'
import { NotFoundComponent, PageWrapper } from '@/components'
import { onEntryChange } from '@/config'
import useRouterHook from '@/hooks/useRouterHook'
import { isDataInLiveEdit, setDataForChromeExtension } from '@/utils'

export default function Home () {

    const [data, setData] = useState<Page.LandingPage['entry'] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const { path, locale } = useRouterHook()

    const fetchData = async () => {
        try {
            const res = await getHomePage(path, locale) as Page.LandingPage['entry']
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

    useEffect(() => {
        onEntryChange(fetchData)
    }, [])

    return (
        <>
            {data
                ? <PageWrapper {...data} contentType='landing_page'>
                    {data?.components && Object.keys(data.components)?.length
                        ? <RenderComponents
                            components={[
                                // eslint-disable-next-line no-unsafe-optional-chaining
                                ...data?.components,
                                { featured_articles: data?.featured_articles }
                            ]}
                        /> : ''}
                </PageWrapper>
                : <>
                    {!loading && !isDataInLiveEdit() && <NotFoundComponent />}
                </>}
        </>
    )
}
