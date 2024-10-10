import { CardCollection, FeaturedArticles, Teaser, Text, TextAndImage } from '@/components'
import { Page } from '@/types'


function RenderComponents ({components, isABEnabled = false}: Page.pageRenderProps) {

    return (<>
        {components?.map((
            component, key: number) => {
            if (component.teaser) {
                return <Teaser id={`teaser-${key}`} key={`component-${key}`} {...component.teaser} isABEnabled={isABEnabled}/>
            }
            if (component.text_and_image) {
                return <TextAndImage id={`text-image-${key}`}  key={`component-${key}`} {...component.text_and_image} />
            }
            if (component.card_collection) {
                return <CardCollection id={`card-collection-${key}`} key={`component-${key}`} {...component.card_collection} />
            }
            if (component.text) {
                return <Text id={`text-${key}`} key={`component-${key}`} {...component.text} />
            }
            if(component.featured_articles) {
                return <FeaturedArticles id={`card-collection-${key}`} key={`component-${key}`} {...component.featured_articles}/>
            }
        })}</>
    )
}

export { RenderComponents }