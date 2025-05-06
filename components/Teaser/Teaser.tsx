'use client'
import { Teaser as TeaserProps } from '@/types/components'
import { Image, Link, Video } from '@/components'
import { isDataInLiveEdit, resolveCta } from '@/utils'

/**
 * Teaser Component
 * 
 * A React component that displays a teaser section with background media (image or video),
 * heading, content, and a call-to-action button.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.$ - Optional object containing data-cslp attributes
 * @param {string} props.heading - The main heading text
 * @param {string} props.content - The content text
 * @param {Array} props.cta - Call-to-action button configuration
 * @param {Array} props.image - Image configuration for background
 * @param {Object} props.video - Video configuration for background
 * @param {Object} props.styles - Styling configuration object
 * @param {string} props.styles.text_align - Text alignment position (e.g., 'Top Left', 'Middle Center', etc.)
 * @param {string} props.id - Unique identifier for the teaser
 * 
 * @returns {React.ReactElement} A teaser section with background media and content
 */

const Teaser: React.FC<TeaserProps> = (props: TeaserProps) => {
    const { $, heading, content, cta, image, video, styles, id } = props

    const ctaLink = resolveCta(cta)
    let position_css

    if (styles && styles?.text_align === 'Right') {
        position_css = 'ml-auto text-right items-center justify-end'
    }
    else{ // Default to Left
        position_css = 'items-center justify-start'
    }

    
    return (
        <div
            id={id}
            className={'teaser-container my-25 py-[5.2rem] h-full relative bg-cover bg-no-repeat bg-stone'}
        >
            <div className='absolute inset-0 overflow-hidden'>
                {!image?.[0]?.image?.url && video?.video?.url 
                    ? <Video
                        {...video}
                        addDataCslp={isDataInLiveEdit()}
                        className='h-full w-full object-cover object-center opacity-100'    
                    />
                    // eslint-disable-next-line jsx-a11y/alt-text
                    : <Image
                        {...image?.[0]}
                        $={image?.[0]?.$}
                        addDataCslp={isDataInLiveEdit()}
                        className='h-full w-full object-cover object-center opacity-100'
                    />}
                
            </div>
            <div className={`dark flex flex-row ${position_css}`}>
                <div className='mx-[2.25rem] md:mx-[5.25rem] md:max-w-[45.635%]'>
                    {heading && <h2 data-id='h2-text' {...$?.heading} 
                        className={`text-4xl md:text-6xl font-medium md:font-semibold tracking-[0.125rem] p-0 text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] mt-8.9 ${(position_css?.includes('text-right') ? 'text-right' : '')}`}>
                        {heading}</h2>}
                    {content && <p data-id='paragraph-text' {...$?.content} className={'font-extralight text-md md:text-xl tracking-[0.063rem] p-0 text-white mt-7.5 drop-shadow-[0_2.5px_2.5px_rgba(0,0,0,0.8)] line-clamp-5 whitespace-break-spaces'}>
                        {content}
                    </p>}
                    {cta?.[0]?.text && ctaLink && <span {...cta?.[0]?.$?.link}><Link
                        url={ctaLink}
                        className={`relative tracking-normal mt-8.9 max-w-full w-max btn-primary ${(position_css?.includes('justify-end') ? 'justify-self-end' : '')}`}
                    >
                        <span {...cta?.[0]?.$?.text}>{cta[0].text}</span>
                    </Link></span>}
                </div>
            </div>
        </div>
    )
}

export { Teaser }