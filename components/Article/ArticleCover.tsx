
import React from 'react'
import { Hero, Text } from '@/components'
import { ArticleCover as ArticleCoverType } from '@/types/components'
import { isDataInLiveEdit } from '@/utils'

/**
 * ArticleCover component displays the hero banner and summary of an article
 * @param {Object} props - Component props
 * @param {string} props.title - Title of the article
 * @param {Object} props.cover_image - Cover image object for the article
 * @param {string} props.summary - Summary text of the article
 * @param {string} props._content_type_uid - Content type UID
 * @param {Object} props.$ - Optional object containing data-cslp attributes
 * @returns {JSX.Element} ArticleCover component
 */

const ArticleCover:React.FC<ArticleCoverType> = (props:ArticleCoverType) => {
    const {title, cover_image, summary ,_content_type_uid, $} = props
    return( 
        <div
            id='article-cover'
        >
            <Hero
                title={title}
                cover_image={cover_image}
                $={$}
                _content_type_uid={_content_type_uid}
                id={'hero-banner'}
                className='mb-0'
            />
            {/* This Text component is used to display the summary of the article as per new figma design in sprint22 */}
            <Text
                content={`<p class='mb-0 !pb-0'><strong ${(isDataInLiveEdit()) ? `data-cslp='${$?.summary?.['data-cslp']}'` : ''}>${summary}</strong></p>`}
                $ = {(!isDataInLiveEdit()) ? {
                    ... $,
                    content: {
                        'data-cslp': $?.summary?.['data-cslp'] || ''
                    }
                } : {}}
                className='mt-[2.23rem] mb-0'
                id={'article-summary'}
            />
        </div>
    )
}

export {ArticleCover}