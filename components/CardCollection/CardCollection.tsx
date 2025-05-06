import React from 'react'

import { CardCollection as CardCollectionProps } from '@/types/components'
import { CardCollectionHeader } from './CardCollectionHeader'
import { CardCollectionBody } from './CardCollectionBody'

/**
 * React component that renders a collection of cards
 * 
 * @param {CardCollectionProps} props - Component props
 * @param {string} props.header - Header object containing heading and sub-heading
 * @param {Array} props.cards - Array of card objects
 * @param {number} props.count - Total number of cards 
 * @param {string} props.id - Unique identifier for the card collection
 * @param {Object} props.$ - Optional object containing data-cslp attributes
 * @param {string} props.className - Optoinal string containing additional class for styling
 * @returns {JSX.Element} Collection of cards or card tiles
 */
const CardCollection: React.FC<CardCollectionProps> = (props: CardCollectionProps): JSX.Element => {
    const { header, cards, count, id, className, $ } = props

    if ((!cards || cards.length === 0) && (!header || (header.heading === '' && header.sub_heading === ''))) {
        return <></>
    }

    return (

        <div
            id={id}
            className={`${className} my-25`}
        >
            <div className='mx-auto'>

                {header && (header.heading != '' || header.sub_heading != '') && <CardCollectionHeader
                    id={id}
                    heading={header?.heading}
                    sub_heading={header?.sub_heading}
                    $={{ ...header?.$ }}
                />}

                <CardCollectionBody
                    id={id}
                    cards={cards}
                    count={count ? count : (cards ? cards?.length : 0)}
                    $={$}
                />
            </div>
        </div>

    )
}

export { CardCollection }