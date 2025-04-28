import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

/**
 * A paginator component that displays navigation controls and current Item status
 * @param {Object} props - The component props
 * @param {number} props.count - Total number of items
 * @param {number} props.currentItem - Current active Item number
 * @param {function} props.setCurrentItem - Function to update the current Item
 * @returns {JSX.Element} A paginator with previous/next buttons and Item counter
 */
export const Paginator = ({count, currentItem, setCurrentItem, className} : {count: number, currentItem: number, setCurrentItem: any, className?: string}) => {
    const formattedCount = count.toString().padStart(2, '0')
    const formattedCurrentItem = currentItem.toString().padStart(2, '0')
    return (
        <div 
            className={`w-full h-[4.563rem] flex items-center gap-4 lg:gap-[1.883rem] px-8 lg:px-[3.531rem]
                ${className ? className : ''}`
            }
        >
            <div className='w-fit flex items-center justify-center gap-2 lg:gap-[1.308rem]'>
                <ChevronLeftIcon 
                    className={`h-12 w-12 lg:w-[64px] lg:h-[64px] text-white rounded-full border border-[0.124rem] border-white p-2 lg:p-4 ${currentItem === 1 ? 'opacity-30' : 'hover:bg-[#ffffff4D] cursor-pointer'}`}
                    onClick={() => currentItem!== 1 && setCurrentItem(currentItem - 1)}
                    role='button'
                />
                <ChevronRightIcon 
                    className={`h-12 w-12 lg:w-[64px] lg:h-[64px] text-white rounded-full border border-[0.124rem] border-white p-2 lg:p-4 ${currentItem === count ? 'opacity-30 cursor-disabled' : 'hover:bg-[#ffffff4D] cursor-pointer'}`}
                    onClick={() => currentItem!== count && setCurrentItem(currentItem + 1)}
                    role='button'
                />
            </div>
            <div className='h-2 w-full border-b-2'></div>
            <span className='text-5xl text-white font-extralight'>{formattedCurrentItem}/{formattedCount}</span>
        </div>
    )

}