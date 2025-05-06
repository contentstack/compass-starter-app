import { isEditButtonsEnabled } from '@/config'
import { Common } from '@/types'

export const prefixReferenceIncludes = (mbId: string, ...references: string[]) => {
    const result = references.map(e => mbId + '.' + e)
    return result
}

export const inIframe = () => {
    try {
        return window.self !== window.top
    } catch (e) {
        console.error('🚀 ~ inIframe ~ e:', e)
        return true
    }
}

export const isDataInLiveEdit = () => {
    return inIframe() && isEditButtonsEnabled
}

export const addToDateNow = (seconds: number) => {
    const newDate = new Date()
    newDate.setTime(new Date().getTime() + (seconds * 1000))
    return newDate
}

export const capitalizeFirstLetter = (text:string) => {
    return text.charAt(0).toUpperCase() + text.slice(1)
}

export const removeSpecialChar = (text: string) => {
    return (text?.indexOf('_') > 0 ? text?.replaceAll('_', ' ') : text?.replaceAll('-', ' '))
}

export const getPersonalizeAttribute = (audiences: Common.Audiences, criteria: string) => {
    const retAttr: {[key: string]: string} = {}

    const group = audiences?.group

    group && group.length > 0 && group.map((groupItem: any) => {
        if (groupItem?.name.toLowerCase() === criteria) {
            groupItem?.attributes.map((attribute: any) =>{
                retAttr[attribute.key] = attribute.value
            })           
        }
    })

    return Object.keys(retAttr).length > 0 ? retAttr : {}
}

// get localized data for cta text in Hero Component
export const getLocalaizeData = (locale: string): string => {
    const translatedContent: { [key: string]: string } = { 'en': 'Explore More', 'fr': 'Explorer davantage', 'de': 'Entdecken Sie mehr', 'es': 'Explora más' }
    return translatedContent[locale]
}