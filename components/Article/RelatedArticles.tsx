import React from 'react'
import { RelatedArticlesComponent } from '@/types/components'
import { CardCollection } from '../CardCollection'

/**
 * RelatedArticles component displays a collection of related article cards
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.related_articles - Related articles configuration
 * @param {string} props.related_articles.heading - Main heading for the related articles section
 * @param {string} props.related_articles.sub_heading - Sub heading for the related articles section
 * @param {Object} props.related_articles.$ - Additional related articles configuration object containing data-cslp attributes
 * @param {Array} props.cards - Array of card data to be displayed
 * @returns {JSX.Element} RelatedArticles component
 */

const RelatedArticles:React.FC<RelatedArticlesComponent> = (props:RelatedArticlesComponent) => {

    const { related_articles, cards } = props
    const { heading, sub_heading, $ } = {...related_articles}
    
    return(<div>
        <CardCollection 
            header={{heading, sub_heading, $}} 
            cards={cards} 
            id='related-articles-card-collection' 
            className='mx-[2.25rem] md:mx-[5.25rem]'    
        />
    </div>
    )
}

export { RelatedArticles }