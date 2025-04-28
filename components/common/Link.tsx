import { useRouter } from 'next/navigation'
import { buildLinkUrl } from '@/utils'
import { LinkComponent as LinkComponentType } from '@/types/components'
import { useLocaleContext, usePersonalization } from '@/context'

/**
 * A versatile link component that handles both internal and external links with personalization capabilities.
 * 
 * @component
 * @param {Object} props - The component props
 * @param {string|Object} props.url - URL for the link, can be either a string (external) or object (internal url i.e reference object)
 * @param {React.ReactNode} props.children - Child elements to be rendered within the link
 * @param {string} props.className - CSS classes to be applied to the link
 * @param {string} props.target - Target attribute for the link (_self, _blank, etc.)
 * @param {boolean} props.isABEnabled - Flag to trigger A/B testing event for personalization
 * @param {Object} props.$ - Optional object containing data-cslp attributes
 * @param {string} props.'data-title' - Data attribute for title
 * 
 * @returns {React.ReactElement} Rendered link component
 */

const LinkComponent: React.FC<LinkComponentType> = (props: LinkComponentType) => {
    const { url, children, className, target, isABEnabled,  $ } = props
    const elemattr = {className, target: target || '_self', ['data-title']: props?.['data-title'], ...$ }
    const router = useRouter()
    const { personalizationSDK } = usePersonalization()

    const { currentLocale } = useLocaleContext()
    
    /**
     * Determine if URL is internal or external based on type
     * Internal links are objects, external links are strings
     */
    let internal_link, external_link
    if ( typeof url !== 'string') {
        internal_link = url
    } else {
        external_link = url
    }
    
    /**
     * Builds the final href URL by combining internal/external link with locale
     * @type {string}
     */
    const href: string = buildLinkUrl(internal_link, external_link, currentLocale)

    /**
     * Handles click events on the link.
     * If A/B testing is enabled, prevents default behavior, triggers personalization event,
     * and programmatically navigates to href if present.
     * 
     * @param {Object} e - Click event object
     * @param {Function} e.preventDefault - Function to prevent default event behavior
     */
    const onClickHandler = (e: { preventDefault: () => void }) => {
        if(isABEnabled){ 
            e.preventDefault()
            personalizationSDK?.triggerEvent(process.env.CONTENTSTACK_AB_PRIMARY_EVENT??'Clicked')
            if(href) router.push(href)
        }
    }
            
    /**
     * Renders a link component with an href.
     * Handles click events and applies provided attributes.
     * 
     * @returns {React.ReactElement} An anchor element with href and event handlers
     */
    const LinkWrapper = () => <a onClick={onClickHandler} data-id='link-href' href={`${href}`} {...elemattr}>
        {children}
    </a>

    /**
     * Renders a placeholder link component when no href is provided.
     * Modifies the className to disable cursor and hover effects.
     * 
     * @returns {React.ReactElement} A span element with modified attributes
     */
    const LinkPlaceholder = () => {
        
        elemattr.className = className + ' !cursor-default hover:!no-underline hover:!border-transparent'

        return(
            <span onClick={onClickHandler} data-id='link-placeholder' {...elemattr}>
                {children}
            </span>
        )

    }

    return (<>{href ? <LinkWrapper /> : <LinkPlaceholder />}</>)
}
export { LinkComponent }