import { useState } from 'react'
import { Component } from '@/types'
import { Image } from '@/components'
import { classNames } from '@/utils'
import { LivePreviewTypeMapper } from '@/types/common'
import { Paginator, TextBlock } from './index'

/**
 * TextAndImageCarousel Component
 * 
 * A React component that displays a carousel of text and image content with pagination controls.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.$ - Optional object containing data-cslp attributes
 * @param {string} props.id - Unique identifier for the carousel
 * @param {Array} props.carousel_items - Array of carousel items containing text and image content
 * @param {Object} props.styles - Styling configuration object
 * @param {string} props.styles.image_position - Position of the image ('left', 'right', or other)
 * 
 * @param {Object} props.carousel_items[].heading - Heading text for each carousel item
 * @param {Object} props.carousel_items[].content - Main content for each carousel item
 * @param {Object} props.carousel_items[].image - Image object for each carousel item
 * @param {string} props.carousel_items[].image_alt_text - Alt text for the image
 * @param {Object} props.carousel_items[].cta - Call to action object
 * @param {Object} props.carousel_items[].styles - Individual item styling
 * @param {string} props.carousel_items[].styles.theme - Theme for each item ('dark' or default)
 * @param {boolean} props.carousel_items[].is_thumbnail - Whether the image should be displayed as thumbnail
 * 
 * @returns {JSX.Element} A carousel component with text content and images
 */
/* eslint-disable jsx-a11y/alt-text */

export function TextAndImageCarousel (props: Component.TextAndImageCarousel) {
    const { $, id, carousel_items, styles: { image_position } } = props

    const [currentItem, setCurrentItem] = useState<number>(1)
    const currentItemData = carousel_items?.length > 0 ? carousel_items.slice(currentItem - 1, currentItem)  : []

    return (
        <div 
            id={id}
            className='text-and-image-carousel'
            {...$?.carousel_items}
        >
            {currentItemData?.length > 0 ? currentItemData.map((item, index: number) => {
                const { heading, content, image, image_alt_text, cta, styles: { theme }, is_thumbnail } = item

                return <div 
                    key={`${id}-${index}`} 
                    className={`${theme === 'dark' ? 'dark' : ''}`}
                    {...$?.[`carousel_items__${index}` as keyof LivePreviewTypeMapper<Component.TextAndImageCarousel>]}
                >
                    <div
                        className={classNames(
                            `${image_position === 'right' ? 'sm:flex-row flex-col'
                                : image_position === 'left' ? 'sm:flex-row-reverse flex-col'
                                    : 'xs:flex-row-reverse flex-col-reverse'}`,
                    
                            'flex my-25',
                            'text-stone bg-white dark:text-white dark:bg-stone'
                        )}
                    >
                        <div className='mx-[2.25rem] sm:mx-[0] max-w-full sm:max-w-7xl py-12 sm:w-[50%]' >
                            <TextBlock 
                                heading={heading}
                                content={content}
                                cta={cta}
                                $={item.$}
                            />
                        </div>
                        <div className='relative flex-[0_0_50%] sm:max-w-[50%] max-w-full'>
                            <Image
                                image={image}
                                $={item.$}
                                image_alt_text={image_alt_text}
                                is_thumbnail={is_thumbnail}
                                className='w-full overflow-hidden max-h-screen-1/2 sm:h-screen xl:aspect-[6/3] aspect-[3/2] bg-white/5 shadow-2xl ring-1 ring-white/10 object-cover object-center dark:text-white'
                            />
                            <Paginator 
                                count={carousel_items.length || 0}
                                setCurrentItem={setCurrentItem}
                                currentItem={currentItem}
                                className='relative bottom-[calc(4.5rem+53px)]'
                            />
                        </div>
                    </div>
                </div>
            }) : <div className='text-center text-gray-400 py-16'>No carousel items available. Click + to add one.</div>}
        </div>
    )
}