import Link from 'next/link'

/**
 * NotFoundComponent - A React component that displays a 404 error message on page
 * @returns {JSX.Element} A React component for the 404 error page
 */
const NotFoundComponent = () => {
    return (
        <div 
            className='grid min-h-full place-items-center dark:!bg-black bg-white px-6 py-24 sm:py-28 lg:px-8'
            id='not-found-component' 
            data-id='not-found-component' 
        >
            <div className='text-center'>
                <p data-id='paragraph-text' className='text-5xl font-semibold text-purple text-center'>404</p>
                <h1 id='h1-text' className='mt-20.5 tracking-normal text-stone dark:text-white'>Page not found</h1>
                <p data-id='paragraph-text' className='mt-6 text-base text-gray-600 dark:text-white'>Sorry, we couldn&prime;t find the page you&prime;re looking for.</p>
                <div className='mt-10 flex items-center justify-center gap-x-6'>
                    <Link
                        href='/'
                        className='text-sm font-semibold text-stone dark:text-white hover:text-purple'
                    >
                        Go back home <span aria-hidden='true'>&rarr;</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export {NotFoundComponent}