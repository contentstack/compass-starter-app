'use client'

import _, { isString } from 'lodash'
import { CTA, InternalLink } from '@/types/common'

/**
 * Resolves a card CTA (Call To Action) to its appropriate link value
 * @param cta - Optional parameter that can be either a string or CTA object
 * @returns 
 * - If cta is undefined or null, returns undefined
 * - If cta is a string, returns the string directly
 * - If cta is a CTA object with a link property, returns the link array
 */
export const resolveCardCta = (cta?: string | CTA) => {
    if(!cta) return
    if(isString(cta) ) return cta
    if(cta?.link && cta?.link?.length >= 0) return cta.link
}

/**
 * Resolves a CTA (Call To Action) array to either an internal link array or external URL
 * @param cta - Optional array of CTA objects
 * @returns 
 * - If cta is undefined or null, returns undefined
 * - If first CTA has link property with length > 0, returns the link array as InternalLink[]
 * - If first CTA has external_url property, returns the external_url as string
 */
export const resolveCta = (cta?: CTA[]) => {
    if(!cta) return
    if(cta?.length > 0 && cta?.[0]?.link && cta?.[0]?.link?.length > 0) return cta[0].link as InternalLink[]
    if(cta?.[0]?.external_url) return cta?.[0]?.external_url as string
}


/**
 * Builds a URL from internal link data, URL string, and locale
 * @param internalLink - Optional array of internal link objects containing url property
 * @param url - Optional URL string that can be query params, absolute URL, or www domain
 * @param locale - Optional locale string for internationalization
 * @returns 
 * - For internal links: Uses internalLink's URL if availabel, appends query params if valid, prepends locale and returns
 * - For external URLs: Returns full URL if starts with http/https/www
 * - For relative URLs: Prepends locale if provided
 * - Returns empty string if no valid URL can be constructed
 */
export const buildLinkUrl = (internalLink?: InternalLink[], url?: string, locale?: string) => {
    let result = ''

    if (internalLink && internalLink.length) {
        if (internalLink[0].url) {
            result = internalLink[0].url
            if (url) {
                if (url.startsWith('?')) {
                    result = result.concat(url)
                } else {
                    if (!_.isEmpty(url)) {
                        console.debug('URL field information not used - no valid Query Parameters found', url)
                    }
                }
            }
        } else {
            console.warn('Internal link not resolved', internalLink)
        }
        if (locale) {
            result = `/${locale}${result}`
        }
    } else if (url && (url.startsWith('https://') || url.startsWith('http://') || url.startsWith('/'))) {
        result = url
    } else if (url && url.startsWith('www.')) {
        result = 'https://'.concat(url)
    } else {
        if (!_.isEmpty(url)) {
            console.debug('Static URL is not valid', url)
        }
    }

    if(url && !(url.startsWith('https://') || url.startsWith('http://')) && !url.startsWith('www.')) {
        if (locale) {
            result = `/${locale}${result}`
        }
    } 
    return result

}

/**
 * Removes the locale prefix from a path string
 * @param path - The full path string that may contain a locale prefix
 * @param locale - Optional locale string to remove from the path
 * @returns 
 * - If locale is provided: Returns path with locale prefix removed
 * - If no locale: Returns original path unchanged
 */
export const getUnlocalizedRelativePath = (path: string, locale?: string): string => {
    if (locale) {
        return path.substring(path.lastIndexOf(locale) + locale.length)
    } else {
        return path
    }
}

/**
 * Constructs an absolute URL by combining a current origin with current page's path
 * @param path - The current page path
 * @returns The complete absolute URL formed by concatenating the base URL and path
 */
export const getAbsolutePageUrl = (path:string) => {
    if (!window) return path
    return window.location.origin + path
}