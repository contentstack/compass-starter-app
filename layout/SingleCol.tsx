'use client'

import React, { useEffect, useState } from 'react'
import { Footer, Header } from '@/components'
import { App } from '@/types'

import { getAppConfigData } from '@/loaders'
import { onEntryChange } from '@/config'
import useRouterHook from '@/hooks/useRouterHook'
import { LocaleContext } from '@/context'

const SingleCol: React.FC<App.SingleColLayout> = (
    props: React.PropsWithChildren<App.SingleColLayout>
) => {

    const [appConfig, setAppConfig] = useState<App.csWebConfig>()
    const { locale } = useRouterHook()

    const fetchAppConfig = async () => {
        try {
            const web_config= await getAppConfigData(locale) as App.csWebConfig[]

            if (web_config && web_config?.length > 0) {

                setAppConfig(web_config[0])

            } else {

                throw 'Unable to fetch Web Config | 404'

            }

        } catch (err) {
            console.error('Single Col Layout failed to load,\n', err)
        }
    }

    useEffect(() => {
        onEntryChange(fetchAppConfig)
    }, [])

    return (
        <>
            {locale && <LocaleContext.Provider
                value={{
                    currentLocale: locale
                }}
            >
                {
                    appConfig?.main_navigation?.[0] && appConfig?.logo
                    && <Header
                        {...appConfig.main_navigation[0]}
                        logo={appConfig.logo}
                    />
                }
                <div className='single-col mx-auto h-10 !min-h-[100vh]'>
                    {props.children}
                </div>
                {
                    appConfig?.footer_navigation?.[0] && appConfig?.logo
                    && <Footer
                        {...appConfig.footer_navigation[0]}
                        logo={appConfig.logo}
                    />
                }
            </LocaleContext.Provider>}
        </>
    )
}

export { SingleCol }