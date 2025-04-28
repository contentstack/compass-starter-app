import { CardCollection, FeaturedArticles, Hero, Teaser, Text, TextAndImageCarousel } from '@/components'
import { VB_EmptyBlockParentClass } from '@/config'
import { Page } from '@/types'
import { pageBlocks } from '@/types/pages'
import { isDataInLiveEdit } from '@/utils'

/**
 * Renders different components based on the provided page data
 * @param {Object} props - Component properties
 * @param {Array} props.components - Array of page components to render
 * @param {Object} props.featured_articles - Featured articles data
 * @param {Object} props.$ - Optional object containing data-cslp attributes
 * @param {boolean} [props.isABEnabled=false] - Flag to enable A/B testing
 * @returns {JSX.Element} Rendered components
 */

function RenderComponents ({ hero, components, featured_articles, $, isABEnabled = false}: Page.pageRenderProps) {

    const componentMapper = (component: pageBlocks, key: number) => {

        switch (true) {

        case (!!component.teaser):
            return (

                <Teaser
                    id={`teaser-${key}`}
                    {...component.teaser}
                />

            )

        case (!!component.text_and_image_carousel):
            return (

                <TextAndImageCarousel
                    id={`text-image-carousel-${key}`}
                    {...component.text_and_image_carousel}
                />

            )

        case (!!component.card_collection):
            return (

                <CardCollection
                    id={`card-collection-${key}`}
                    {...component.card_collection}
                    className='mx-[2.25rem] md:mx-[5.25rem] mb-25'
                />

            )

        case (!!component.text):
            return (

                <Text
                    id={`text-${key}`}
                    {...component.text}
                />

            )

        default:
            return null
        }

    }

    return (
        <>
            {hero && <Hero id='hero-banner' {...hero} isABEnabled={isABEnabled} {...$?.hero}/>}
            <div 
                {...((isDataInLiveEdit() && $?.components) || {})} //Parent wrapper
                className={components?.length ? undefined : `${VB_EmptyBlockParentClass} max-height mt-32`}
            >
                {components?.map((component, key: number) => <div
                    key={`component-${key}`} id={`component-${key}`}
                    {...(isDataInLiveEdit() && $?.[`components__${key}`])}
                >
                    {
                        componentMapper(component, key)
                    }
                </div>)}
            </div>
            {featured_articles && <FeaturedArticles id='card-collection-FeaturedArticles' {...featured_articles} {...$?.featured_articles} />}
        </>
    )
}

export { RenderComponents }