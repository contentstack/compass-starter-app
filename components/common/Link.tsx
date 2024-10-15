import Personalize from '@contentstack/personalize-edge-sdk'

import { useRouter } from 'next/navigation'
import { buildLinkUrl } from '@/utils'
import { LinkComponent as LinkComponentType } from '@/types/components'
import { useLocaleContext } from '@/context'

const LinkComponent: React.FC<LinkComponentType> = (props: LinkComponentType) => {
    const { url, children, className, target, isABEnabled,  $ } = props
    const elemattr = {className, target: target || '_self', ['data-title']: props?.['data-title'], ...$ }
    const router = useRouter()

    const { currentLocale } = useLocaleContext()
    
    let internal_link, external_link
    if ( typeof url !== 'string') {
        internal_link = url
    } else {
        external_link = url
    }
    
    const href = buildLinkUrl(internal_link, external_link, currentLocale)

    const onClickHandler = (e: { preventDefault: () => void }) => {
        if(isABEnabled){ 
            e.preventDefault()
            Personalize.triggerEvent(process.env.CONTENTSTACK_AB_PRIMARY_EVENT??'Clicked')
            if(href) router.push(href)
        }
    }
            
    const LinkWrapper = () => <a onClick={onClickHandler} data-id='link-href' href={`${href}`} {...elemattr}>
        {children}
    </a>

    const LinkPlaceholder = () => {
        
        elemattr.className = className + '!cursor-default hover:!no-underline hover:!border-transparent'

        return(
            <span onClick={onClickHandler} data-id='link-placeholder' {...elemattr}>
                {children}
            </span>
        )

    }

    return (<>{href ? <LinkWrapper /> : <LinkPlaceholder />}</>)
}
export { LinkComponent }