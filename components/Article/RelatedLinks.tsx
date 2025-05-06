import React from 'react'
import { Link } from '@/components'
import { RelatedLinksComponent } from '@/types/components'

/**
 * RelatedLinks component displays a list of related links with an optional label
 * @component
 * @param {Object} props - Component props
 * @param {Array} props.relatedLinks - Array of related link objects containing url and title
 * @param {Object} props.relatedLinksLabel - Label object containing text and metadata
 * @param {Object} props.$ - Optional object containing data-cslp attributes
 * @returns {JSX.Element} RelatedLinks component
 */

const RelatedLinks: React.FC<RelatedLinksComponent> = (props: RelatedLinksComponent) => {
    const { relatedLinks, relatedLinksLabel, $ } = props

    return (<div id='related-region-topics' className='mx-[2.25rem] md:mx-[5.25rem]'>
        {relatedLinks && <><h2 {...relatedLinksLabel?.$?.text} data-id='span-text' className='w-full text-6xl font-[43.75rem] inline-block mb-[2.227rem] text-stone'>{relatedLinksLabel?.text || 'Related Links'}</h2>
            <div className='flex flex-wrap space-x-5'>
                {relatedLinks.map((elem, ind: number) => (
                    <span key={`related-link-${ind}`} {...$?.[`taxonomies__${ind}`]}>
                        <Link url={elem?.url}
                            className='taxonomies-label'
                        >
                            {elem?.title ?? ''}
                        </Link>
                    </span>
                ))}
            </div>
        </>}
    </div>)
}

export { RelatedLinks }