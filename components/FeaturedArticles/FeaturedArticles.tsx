import { FeaturedArticles as FeaturedArticlesProps, ImageCardItem } from '@/types/components'
import { CardCollectionHeader } from '../CardCollection/CardCollectionHeader'
import { CardCollectionBody } from '../CardCollection/CardCollectionBody'

/**
 * FeaturedArticles component displays a collection of featured articles with images
 * @component
 * @param {Object} props - Component props
 * @param {string} props.heading - Main heading text for the featured articles section
 * @param {string} props.sub_heading - Sub heading text displayed below the main heading
 * @param {Array} props.articles - Array of article objects 
 * @param {string} props.id - Unique identifier for the component
 * @param {Object} props.$ - Object containing data-cslp attributes for live preview
 * @returns {JSX.Element} Rendered FeaturedArticles component
 */
const FeaturedArticles: React.FC<FeaturedArticlesProps> = (props: FeaturedArticlesProps) => {

    const { heading, sub_heading, articles, id, $ } = props

    const cards: ImageCardItem[] | [] =  articles?.map((article) => {
        return ({
            title: article?.title,
            content: article?.summary,
            image: article?.cover_image,
            $: article?.$,
            cta: article?.url
        })
    }) as ImageCardItem[] | []

    return (
        <div
            id={id}
            className={'mb-25 mx-[2.25rem] md:mx-[5.25rem] '}
        >
            <div className='mx-auto'>
                <CardCollectionHeader
                    heading={heading}
                    sub_heading={sub_heading}
                    $={$}
                />
                <CardCollectionBody 
                    cards={cards}
                    id={id}
                    count={cards?.length || 0}
                    $={$}
                    editKey='articles' // this prefix is used for accessing data-cslp attributes (edit tags) of object key 'articles'

                />
            </div>
        </div>
    )

}

export { FeaturedArticles }