'use client'
import { Hero as HeroProps } from '@/types/components'
import { Image, Link, Video } from '@/components'
import { isDataInLiveEdit, resolveCta } from '@/utils'
import { getLocalaizeData } from '@/utils'

/**
 * Hero component that displays a banner with image/video, heading, content, and CTA
 * It is used as a banner on the homepage and individual article page
 * @param {Object} props - Component props
 * @param {Object} props.$ - Optional object containing data-cslp attributes
 * @param {string} props.heading - Banner heading text
 * @param {string} props.content - Banner content text
 * @param {Array} props.cta - Call to action buttons array
 * @param {Array} props.image - Banner image array
 * @param {Object} props.video - Banner video object
 * @param {Object} props.styles - Styling options object
 * @param {string} props.id - Component ID
 * @param {boolean} props.isABEnabled - A/B testing flag
 * @param {string} props._content_type_uid - Content type identifier
 * @param {string} props.summary - Article summary text
 * @param {string} props.title - Article title
 * @param {Object} props.cover_image - Article cover image
 * @param {string} props.url - Article URL
 * @param {string} props.locale - Locale used to fetch localized data
 * @param {boolean} props.className - To add custom CSS element
 * @returns {JSX.Element} Hero component 
 */

const Hero: React.FC<HeroProps> = (props: HeroProps) => {
    const { $, heading, content, cta, image, video, styles, id, isABEnabled, _content_type_uid, summary, title, cover_image, url, locale, className } = props

    const bannerHeading = _content_type_uid === 'article' ? title : heading
    const dataCslpHeading = _content_type_uid === 'article' ? $?.title : $?.heading
    const bannerContent = _content_type_uid === 'article' ? summary : content
    const dataCslpContent: { 'data-cslp'?: string } = _content_type_uid === 'article' ? $?.summary || {} : $?.content || {}
    const bannerImage = _content_type_uid === 'article' ? [{
        image: cover_image,
        image_alt_text: title,
        $: cover_image?.$
    }] : image || []
    const bannerVideo = video
    const bannerCta = _content_type_uid === 'article' ? [{
        text: getLocalaizeData(locale || 'en'),
        external_url: url,
        $: {
            link: $?.url || undefined
        }
    }] : cta || []

    const ctaLink = resolveCta(bannerCta)
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
            className={`banner-container relative bg-cover bg-no-repeat my-25 h-[100vh] mt-0 ${className}`}
        >
            <div className='absolute inset-0 overflow-hidden'>
                {!bannerImage?.[0]?.image?.url && bannerVideo?.video?.url 
                    ? <Video
                        {...bannerVideo}
                        addDataCslp={isDataInLiveEdit()}
                        className='h-full w-full object-cover object-center opacity-100'    
                    />
                    // eslint-disable-next-line jsx-a11y/alt-text
                    : <Image
                        {...bannerImage?.[0]}
                        $={bannerImage?.[0]?.$}
                        addDataCslp={isDataInLiveEdit()}
                        className='h-full w-full object-cover object-center opacity-100'
                    />}
                
            </div>
            <div className={`dark h-full flex flex-row ${position_css}`}>
                <div className='lg:max-w-[45.635%] mx-[2.25rem] md:mx-[5.25rem]'>
                    {bannerHeading && <h2 data-id='h2-text' {...dataCslpHeading} 
                        className={`text-3xl md:text-4xl font-semibold tracking-[0.125rem] p-0 text-white lg:text-6xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] mt-[2.055rem] ${(position_css?.includes('text-right') ? 'text-right' : '')}`}>
                        {bannerHeading}</h2>}
                    {bannerContent && <p data-id='paragraph-text' {...dataCslpContent}  
                        className={'font-light text-md md:text-xl tracking-[0.063rem] p-0 text-white mt-[1.748rem] drop-shadow-[0_2.5px_2.5px_rgba(0,0,0,0.8)] whitespace-break-spaces line-clamp-5'}>
                        {bannerContent}
                    </p>}
                    {bannerCta?.[0]?.text && ctaLink && <span {...bannerCta?.[0]?.$?.link}><Link
                        url={ctaLink}
                        isABEnabled={isABEnabled}
                        className={`relative mt-[1.748rem] max-w-full w-max btn-primary ${(position_css?.includes('justify-end') ? 'justify-self-end' : '')}`}
                    >
                        <span {...bannerCta?.[0]?.$?.text}>{bannerCta?.[0]?.text} </span>
                    </Link></span>}
                </div>
            </div>
        </div>
    )
}

export { Hero }
