'use client'
import { useEffect } from 'react'
import { Teaser as TeaserProps } from '@/types/components'
import { Link } from '@/components'
import { isDataInLiveEdit, resolveCta } from '@/utils'
import { Image } from '../common/Image'
import { Video } from '../common/Video'

const Teaser: React.FC<TeaserProps> = (props: TeaserProps) => {
    const { $, heading, content, cta, image, video, styles, id, isABEnabled } = props

    const ctaLink = resolveCta(cta)
    let position_css

    if (styles && styles?.text_align === 'Top Left'){
        position_css = 'pt-24 ml-8 items-start justify-start'
    }
    else if (styles && styles?.text_align === 'Top Center') {
        position_css = 'pt-24 mx-auto text-center items-start justify-center'
    }
    else if (styles && styles?.text_align === 'Top Right') {
        position_css = 'pt-24 ml-auto mr-8 text-right items-start justify-end'
    }
    else if (styles && styles?.text_align === 'Middle Left') {
        position_css = 'ml-8  items-center justify-start'
    }
    else if (styles && styles?.text_align === 'Middle Center') {
        position_css = 'mx-auto text-center items-center justify-center'
    }
    else if (styles && styles?.text_align === 'Middle Right') {
        position_css = 'ml-auto mr-8 text-right items-center justify-end'
    }
    else if (styles && styles?.text_align === 'Bottom Left') {
        position_css = 'ml-8 pb-8 items-end justify-start'
    }
    else if (styles && styles?.text_align === 'Bottom Center') {
        position_css = 'mx-auto pb-8 text-center items-end justify-center'
    }
    else if (styles && styles?.text_align === 'Bottom Right') {
        position_css = 'ml-auto pb-8 mr-8 text-right items-end justify-end'
    }


    useEffect(() => {
        document.querySelectorAll('.teaser-container').forEach((element)=>{
            if(element.getAttribute('id')=='teaser-0'){
                element?.classList.add('h-[calc(100vh-0px)]', 'mt-0')
            } else {
                element?.classList.add('my-32','py-44')
            }
        })
    })

    
    return (
        <div
            id={id}
            className={'teaser-container relative bg-cover bg-no-repeat bg-[#424656]'}
        >
            <div className='absolute inset-0 overflow-hidden'>
                {image?.[0]?.image?.url !== undefined
                    // eslint-disable-next-line jsx-a11y/alt-text
                    ? <Image
                        {...image[0]}
                        addDataCslp={isDataInLiveEdit()}
                        className='h-full w-full object-cover object-center opacity-100'
                    /> 
                    : <Video
                        {...video}
                        addDataCslp={isDataInLiveEdit()}
                        className='h-full w-full object-cover object-center opacity-100'    
                    />
                }
            </div>
            <div className={`h-full max-w-3xl flex flex-row ${position_css}`}>
                <div>
                    {heading && <h2 data-id='h2-text' {...$?.heading} className={'text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'}>{heading}</h2>}
                    {content && <p data-id='paragraph-text' {...$?.content} className={'font-medium text-lg !leading-8 text-white mb-8 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.9)] line-clamp-5 whitespace-pre-wrap'}>
                        {content}
                    </p>}
                    {cta?.[0]?.text && ctaLink && <span {...$?.cta}><Link
                        url={ctaLink}
                        isABEnabled={isABEnabled}
                        className={'relative max-w-full w-max btnPrimary py-3'}
                    >
                        {cta[0].text}
                    </Link></span>}
                </div>
            </div>
        </div>
    )
}

export { Teaser }