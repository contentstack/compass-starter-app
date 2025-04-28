import { CardCollectionHeader as CardCollectionHeaderType} from '@/types/components'

/**
 * A component that renders the header for a collection of cards.
 * 
 * @component
 * @param {CardCollectionHeaderType} props - The props for the CardCollectionHeader component.
 * @param {Object} props.$ - Optional object containing data-cslp attributes
 * @param {string} props.heading - The heading for the CardCollectionHeader component.
 * @param {string} props.sub_heading - The sub heading for the CardCollectionHeader component.
 * @returns {JSX.Element} The header for a collection of cards.
 */ 
const CardCollectionHeader: React.FC<CardCollectionHeaderType> = (props: CardCollectionHeaderType): JSX.Element => {
    const { $, heading, sub_heading } = props

    return (
        <div className='relative flex flex-col items-start lg:max-w-[calc((100vw)*0.45635)] mb-14 md:mb-25'>
            {heading && <h2
                data-id='h2-text'
                {...$?.heading}
                className={`text-3xl md:text-4xl lg:text-6xl md:leading-[3.75rem] font-bold inline-block text-stone pt-[2rem] ${sub_heading && 'mb-[1.894rem]'}`}
            >
                {heading}
            </h2>}
            {sub_heading && <p
                data-id='paragraph-text'
                // className='text-sm font-semibold tracking-wider text-black/50 !leading-[20px]'
                className='text-md md:text-xl p-0 text-stone font-medium whitespace-break-spaces'
                {...$?.sub_heading}
            >
                {sub_heading}
            </p>}
        </div>
    )
}


export { CardCollectionHeader }