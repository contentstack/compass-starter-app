import { CardCollectionBody as CardCollectionBodyProps , ImageCardItem } from '@/types/components'
import { LivePreviewTypeMapper } from '@/types/common'
import { Card } from '../Card'

/**
 * A component that renders a collection of cards in a grid layout.
 * 
 * @param {CardCollectionBodyProps} props - Component props
 * @param {Array<ImageCardItem>} props.cards - Array of card objects
 * @param {number} props.count - Total number of cards
 * @param {string} props.id - Unique identifier for the card collection
 * @param {Object} props.$ - Optional object containing data-cslp attributes
 * @param {string} props.editKey - Key used for editing the cards
 * @returns {JSX.Element} Collection of cards in a grid layout
 */
const CardCollectionBody = ({cards, count, id, $, editKey}: CardCollectionBodyProps): JSX.Element => {
    
    editKey = editKey || 'cards'
    
    return (
        cards && cards?.length > 0 ? <div
            className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-12 sm:gap-x-6 xl:gap-x-8'
            {...$?.[editKey as keyof LivePreviewTypeMapper<CardCollectionBodyProps>] }
        >
            {cards?.map((cardData: ImageCardItem, idx: number) => {
                const prefix = editKey ? `${editKey}__${idx}` : `card__${idx}`
                return (
                    <div
                        {...$?.[prefix as keyof LivePreviewTypeMapper<CardCollectionBodyProps>]}
                        key={idx}
                    >
                        <Card
                            id={id}
                            key={idx}
                            {...cardData}
                            count={count}
                        />
                    </div>
                )
            })
            }
        </div> : <></>
    )
}

export {CardCollectionBody}