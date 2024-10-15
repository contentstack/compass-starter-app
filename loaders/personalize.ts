import { getEntries } from '@/services'
import { Common } from '@/types'

export const getPersonalizeConfigData = async (locale:string|undefined) => {
    const personalizeConf = await getEntries('personalize_config', locale ?? process.env.DEFAULT_LOCALE ?? 'en', [],[], {}) as Common.PersonalizeConfig[]

    if (!personalizeConf || personalizeConf === null) {
        return null
    }
    
    return personalizeConf

}