import { Page } from '@/types'
import { useLocaleContext } from '@/context'
import packageInfo from '@/package.json'
import { getAbsolutePageUrl } from '@/utils'

/**
 * SEO Component for managing meta tags and document head elements
 * @component
 * @param {Object} props - Component properties
 * @param {Object} props.seo - SEO-specific properties
 * @param {boolean} props.seo.no_follow - Whether to set nofollow directive
 * @param {boolean} props.seo.no_index - Whether to set noindex directive
 * @param {string} props.seo.description - Meta description content
 * @param {string} props.seo.canonical_url - Canonical URL for the page
 * @param {string} props.locale - Current locale code
 * @param {string} props.summary - Alternative description for meta tag
 * @param {string} props.url - url from the page's entry 
 * @param {Array} props.locales - Available locale options
 * @returns {JSX.Element} SEO component with meta tags
 */

const SEO: React.FC<Page.SeoProps> = (props: Page.SeoProps) => {

    const { seo: {no_follow, no_index, description, canonical_url} = {}, locale, summary, url, locales} = props    
    const { currentLocale } = useLocaleContext()

    // construct canonical url from current locale, and canonical_url / entry url
    const canonicalUrl = getAbsolutePageUrl(`/${currentLocale}${canonical_url || url || ''}` )

    // Add version in meta tag for internal tracking and DOM visibility
    const { version } = packageInfo

    const alternateMetaLinks = locales?.map((lang: { code: string }) => ({
        hrefLang: lang?.code,
        href: getAbsolutePageUrl(`/${lang?.code}${url}`)
    }))

    let robots
    if (no_follow && no_index) {
        robots = 'noindex,nofollow'
    } else if (no_follow) {
        robots = 'index,nofollow'
    } else if (no_index) {
        robots = 'noindex,follow'
    } else {
        robots = 'index,follow'
    }

    return (
        <>
            {props?.seo?.title ? <title>{props?.seo?.title}</title> : <title>{props?.title}</title>}
            <meta
                name='application-name'
                content='Universal Demo'
            />
            <meta charSet='utf-8' />
            <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
            <meta
                name='viewport'
                content='width=device-width,initial-scale=1,minimum-scale=1'
            />
            <meta
                name='description'
                content={summary ? summary : description ? description : ''}
            />
            <meta
                name='version'
                content={version ? version : ''}
            />
            <meta
                name='robots'
                content={robots} key='robots'
            />
            <meta
                property='og:locale'
                content={locale || 'en'}
            />
            <meta
                httpEquiv='content-language'
                content={locale}
            />

            {alternateMetaLinks && (alternateMetaLinks?.length > 0) && alternateMetaLinks?.map((li: { hrefLang: string, href: string }) => li?.href && li?.hrefLang && li?.hrefLang !== currentLocale && <link
                rel='alternate'
                hrefLang={li.hrefLang}
                href={li.href}
                key={li.hrefLang}
            />)}
            <link
                rel='canonical'
                href={canonicalUrl}
            />
            <link
                rel='icon'
                href='/favicon.ico'
            />
        </>
    )
}

export { SEO }