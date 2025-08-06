'use client'
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid'
import { useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Pagination as PaginationProps } from '@/types/components'

/**
 * @name Pagination Component
 * 
 * @param { length } number
 * @param { dataPerPage } number
 * @param { currentPage } number
 * @param { setCurrentPage } Dispatch<SetStateAction<number>>
 * 
*/

const Pagination: React.FC<PaginationProps> = ({ length, dataPerPage, currentPage, setCurrentPage }: PaginationProps) => {

    const numberOfPages: number = Math.ceil(length / dataPerPage)

    const router = useRouter()
    const searchParams = useSearchParams()
    const path = usePathname()

    const addPageNumberinURL = (page: string) => {
        window?.history?.replaceState(null, '', `${path}?page=${page}`)
    }

    useEffect(() => {
        if (searchParams.getAll('page').length !== 0 && searchParams.has('page')) {
            const queryPage: number = parseInt(searchParams.get('page') as string, 10)
            if (queryPage >= 1 && queryPage <= numberOfPages && queryPage !== undefined) {
                handlePageNumberQueryParam(queryPage) // for tabs to change if page query typed in url
            } else {
                addPageNumberinURL('1')
            }
            return
        }
        addPageNumberinURL('1')
    }, [router])

    /**
     * @description Handle the update in URL query param and page number on page load - NO SCROLL
     * @type function
     * @param { number } page
     * @returns null
     */
    const handlePageNumberQueryParam = (page: number) => {
        if (page < 1) return
        if (page > numberOfPages) return
        setCurrentPage(page)
        addPageNumberinURL(page.toString())
    }

    /**
     * @description Handle the update in URL query param and page number on pagination click - WILL SCROLL
     * @type function
     * @param { number } page
     * @returns null
     */
    const handlePageClick = (page: number) => {
        if (page < 1) return
        if (page > numberOfPages) return
        setCurrentPage(page)
        addPageNumberinURL(page.toString())
        handleScroll()
    }

    /**
     * @description Scrolls to the pre-defined anchor after pagination page number updates. Scroll anchor is preset to the starting of the article cards section.
     * @type function
     * @returns null
     */
    const handleScroll = () => {
        const myDiv = document.getElementById('pagination-scroll-anchor')
        let box: DOMRect | null
        try {
            box = myDiv && myDiv.getBoundingClientRect()
            window?.scrollBy(0, box!.y - 85)

        } catch (e) {
            console.error('🚀 ~ handleScroll ~ e:', e)
            return
        }
    }

    const renderPageNumbers = () => {
        return [...Array(numberOfPages)].map((_, index: number) => {
            return (
                <div
                    role='button'
                    key={index + 1}
                    className={`inline-flex items-center border-t-2 px-4 pt-4 text-base font-medium ${currentPage === index + 1 ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    onClick={() => handlePageClick(index + 1)}
                    id={`pagination-btn-${index}`}
                >
                    {index + 1}
                </div>
            )
        })
    }
    return (
        <nav id='pagination-component' className='flex items-center justify-between border-t border-gray-200 px-4 sm:px-0'>
            <div className='-mt-px flex w-0 flex-1'>
                <div
                    role='button'
                    className={`inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-base font-medium text-gray-500 
                    hover:border-gray-300 hover:text-gray-700 ${((currentPage - 1) < 1) ? 'pointer-events-none cursor-default opacity-50 select-none' : ''}`}
                    onClick={() => handlePageClick(currentPage - 1)}
                    id='pagination-prev-btn'
                >
                    <ArrowLongLeftIcon className='mr-3 h-5 w-5 text-gray-400' aria-hidden='true' />
                    <span className='hidden sm:block'>Previous</span>
                </div>
            </div>
            <div className='md:-mt-px md:flex'>
                {
                    renderPageNumbers()
                }
            </div>
            <div className='-mt-px flex w-0 flex-1 justify-end'>
                <div
                    role='button'
                    className={`inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-base font-medium text-gray-500 
                    hover:border-gray-300 hover:text-gray-700 ${((currentPage + 1) > numberOfPages) ? 'pointer-events-none cursor-default opacity-50 select-none' : ''}`}
                    onClick={() => handlePageClick(currentPage + 1)}
                    id='pagination-next-btn'
                >
                    <span className='hidden sm:block'>Next</span>
                    <ArrowLongRightIcon className='ml-3 h-5 w-5 text-gray-400' aria-hidden='true' />
                </div>
            </div>
        </nav>
    )
}

export { Pagination }