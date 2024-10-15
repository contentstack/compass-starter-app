import Personalize from '@contentstack/personalize-edge-sdk'

export function deserializeVariantIds () : string {
    return Personalize.getVariantAliases().join(',')
}