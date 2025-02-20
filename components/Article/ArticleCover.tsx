import React from 'react'
import { Image } from '@/components'
import { ArticleCover as ArticleCoverType } from '@/types/components'

/**
 * Article cover component that displays title, cover image, and summary
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.title] - Article title
 * @param {string} [props.summary] - Article summary
 * @param {Object} props.cover_image - Cover image object
 * @param {Object} [props.$] - Optional object containing data-cslp attributes
 * @returns {JSX.Element} Article cover component
 */

const ArticleCover:React.FC<ArticleCoverType> = (props:ArticleCoverType) => {
    const {title, summary, cover_image, $} = props
    return( <div className={'px-8 pt-16 mb-8'}>
        <div
            className='container mx-auto'
            id='article-cover'
        >
            {title && <h1 data-id='h1-text' {...$?.title}>{title}</h1>}
            <div className={'relative overflow-hidden mt-6'}>
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image
                    image={cover_image}
                    $={$}
                    className={'w-full max-auto object-cover aspect-[2] md:aspect-[5/2] object-center bg-white/5 shadow-2xl ring-1 ring-white/10 dark:text-white'}
                />
            </div>
            {summary && <p data-id='paragraph-text' className='mt-2 !text-lg leading-5 text-black/60 dark:text-white' {...$?.summary}>
                {summary}
            </p>}
        </div>
       
    </div>)
}

export {ArticleCover}