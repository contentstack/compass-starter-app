import React from 'react'
import { isString } from 'lodash'
import { Image, Link } from '@/components'
import { ImageCardItem } from '@/types/components'
import { classNames, resolveCardCta } from '@/utils'

/**
 * Card component that displays an image, title, content, and call-to-action
 * @param {Object} props - Component props
 * @param {Object} props.$ - Optional object containing data-cslp attributes for live preview
 * @param {string|Object} props.image - Contentstack image object
 * @param {string} props.image_alt_text - Alt text for the image
 * @param {string} props.title - Card title
 * @param {string|Object} props.cta - Call-to-action object containing text and url information
 * @param {string} props.content - Card content
 * @param {number} props.count - Number of cards in the grid
 * @param {string|number} props.id - Unique identifier for the card
 * @returns {JSX.Element} Card component
 */
const Card: React.FC<ImageCardItem> = (props: ImageCardItem) => {
    const { $, image, image_alt_text, title, cta, content, count, id } = props

    {/* eslint-disable-next-line jsx-a11y/alt-text */ }
    const cardImage = <Image
        image={image}
        $={$}
        image_alt_text={image_alt_text}
        className={classNames(
            count === 1 ? 'h-[24rem] w-auto'
                : count === 2 ? 'h-[24rem] lg:h-64'
                    : count === 3 ? 'h-48 lg:h-52'
                        : count && count >= 4 ? 'h-48 lg:h-52'
                            : '',
            'w-full object-center object-fit object-cover hover:opacity-90 hover:cursor-pointer'
        )}
    /> 

    return (
        <Link
            url={resolveCardCta(cta)}
        >
            <div
                id={`card-${id}`}
                className={'group h-full relative flex flex-col justify-between'}
            >
                <div className='flex flex-col'>
                    
                    {cardImage}

                    <div className='mt-6 text-xl text-black dark:text-white'>
                        {title
                            && <h4
                                data-id='h4-text'
                                className='font-bold card-title'
                                {...$?.title}>
                                {title}
                            </h4>
                        }
                    </div>
                    {content && <p
                        data-id='paragraph-text'
                        className='mt-4 p-0 text-base leading-5 text-black dark:text-white card-content whitespace-break-spaces'
                        {...$?.content}
                    >
                        {content}
                    </p>
                    }
                </div>
                <div>
                    {cta && !isString(cta) && cta?.text && <p className='mt-3 text-base font-semibold !text-purple'
                        {...cta.$?.link}>
                        <>
                            {cta.text && cta.text !== '' ? <span {...cta?.$?.text}>{cta.text}</span> : <span {...cta?.$?.text}>CTA PLACEHOLDER</span>}
                        </> &rarr;
                    </p>
                    }
                </div>
            </div>
        </Link>
    )
}

export { Card }