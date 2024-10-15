'use client'

import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import Personalize from '@contentstack/personalize-edge-sdk'
import { getPersonalizeConfigData } from '@/loaders'
import { Common } from '@/types'

const personalizeConfiguration: Common.PersonalizeConfig = {
    uid: '',
    audiences: {},
    taxonomy_path: ''
}

const PersonalizationContext = createContext({
    isInitialized: false,
    personalizationSDK: Personalize,
    personalizeConfig: personalizeConfiguration
})

export const usePersonalization = () => {
    return useContext(PersonalizationContext)
}

export const PersonalizationProvider = ({ children }: { children: ReactNode }) => {

    const [personalizeConfig, setPersonalizeConfig] = useState<Common.PersonalizeConfig | undefined>()

    const [isInitialized, setIsInitialized] = useState<boolean>(false)

    const initializePersonalizationSDK = async () => {
        try {
            if (!process.env.CONTENTSTACK_PERSONALIZE_PROJECT_UID) {
                throw Error('PERSONALIZATION_PROJECT_UID not found')
            }
            
            if (process.env.CONTENTSTACK_PERSONALIZE_EDGE_API_URL) {
                Personalize.setEdgeApiUrl(process.env.CONTENTSTACK_PERSONALIZE_EDGE_API_URL)
            }
    
            await Personalize.init(
                process.env.CONTENTSTACK_PERSONALIZE_PROJECT_UID
            )
        }

        catch(e) {

            console.error({initError: e})

        }

    }

    const getPersonalizationConfigFromCMS = async () => {
        try{
            const personalize_config = await getPersonalizeConfigData(process.env.DEFAULT_LOCALE) || null
            if (personalize_config && personalize_config?.length > 0) {
                setPersonalizeConfig(personalize_config[0])
            } else {
                throw 'Unable to fetch Personalize Config | 404'
            }
        } catch(e){
            console.error({fetchError: e})
        }

    }

    useEffect(() => {
        initializePersonalizationSDK().then(() => {
            setIsInitialized(true)
            getPersonalizationConfigFromCMS()
        })
    }, [])

    return (
        <PersonalizationContext.Provider
            value={{ isInitialized, personalizationSDK: Personalize, personalizeConfig: personalizeConfig! }}
        >
            {isInitialized && children}
        </PersonalizationContext.Provider>
    )
}