import { classNames, resolveCta } from '@/utils'
import { Link } from '../common'

/**
 * A text block component that displays heading, content, and a call-to-action button
 * @param {Object} props - The component props
 * @param {string} [props.heading] - The heading text to display
 * @param {string} [props.content] - The content text to display
 * @param {Array<{text: string, link: string, $: Object}>} [props.cta] - Call-to-action button configuration
 * @param {Object} [props.$] - Object containing live-preview data-cslp attributes
 * @returns {JSX.Element} The rendered text block component
 */

export const TextBlock = ({heading, content, cta, $}: any) => {
    const ctaLink = resolveCta(cta)
    return <div
        className={classNames(
            'mx-auto flex flex-col justify-center h-full sm:w-[80%]'
        )}
    >
        {heading && <h2
            data-id='h2-text'
            className='xs:text-3xl sm:text-5xl !leading-[3.5rem] mt-8.9 text-stone dark:text-white break-words'
            {...$?.heading}>
            {heading}
        </h2>}
        {content && <p
            data-id='paragraph-text'
            className='mt-7.5 text-md text-stone dark:text-white whitespace-break-spaces'
            {...$?.content}>
            {content}
        </p>}
        <div
            className='flex items-center gap-x-6'
        >
            {cta?.[0]?.text && ctaLink && <Link
                url={ctaLink}
                className='btn-primary !border-[0.0875rem] !rounded-[3.4375rem] md:!min-h-[3.929rem] flex text-lg lg:!text-2xl !h-auto !leading-[1.5rem] py-[0.849rem] mt-8.9 md:px-10.48'
                $={{...cta?.[0]?.$?.link}}
            >
                <span {...cta?.[0]?.$?.text}>{cta[0].text}</span>
            </Link>}
        </div>
    </div>
}