'use client'

import { Fragment, FunctionComponent, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import _ from 'lodash'

import { App } from '@/types'
import { Locale } from '@/types/common'
import useRouterHook from '@/hooks/useRouterHook'
import { classNames, getFlagCode } from '@/utils'

const LanguageSelector: FunctionComponent<App.LangaugeSelector> = (props: App.LangaugeSelector) => {

    const pathname = usePathname()
    const router = useRouterHook()

    const [currentLocale, setCurrentLocale] = useState('en')

    const { locales, Opac } = props

    // ? Method to handle the switching of Language
    // * 1. URL routing -> Page will refresh
    // * 2. Context API -> Page won't refresh
    const handleLanguageSwitch = (locale: Locale) => {

        setCurrentLocale(getFlagCode(locale?.code))

        const updatedRoute = `/${locale?.code}${router.path}`

        // router.replace(updatedRoute) -- The edit button is not working when page is loaded using useRouterHook. The page need full refresh to enable the Edit button.
        window.location.href = updatedRoute

    }

    // ? Method to render the language dropdown options
    const renderDropdownOptions = () => {

        return locales && locales?.length > 0 && _.sortBy(locales, ['name'])?.map((locale, index: number) => {
            const flagCode = getFlagCode(locale?.code)

            return (
                <Menu.Item
                >
                    <a
                        className={classNames(
                            (currentLocale === locale?.code) ? 'bg-gray-100 text-black rounded' : 'text-gray-700',
                            'group flex items-center px-4 py-2 text-sm font-medium gap-3 cursor-pointer'
                        )}
                        onClick={() => handleLanguageSwitch(locale)}
                        key={`language-option-${index}`}
                    >
                        <span className={`fi fi-${flagCode}`} />
                        <span className=''>
                            {locale?.name}
                        </span>
                    </a>
                </Menu.Item>
            )

        })

    }

    useEffect(() => {

        const locale = getFlagCode(router.locale)

        locale && setCurrentLocale(locale)

    }, [pathname])

    return (
        <Menu
            as='div'
            className='relative inline-block text-left'
        >
            <div>
                <Menu.Button 
                    className={`inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 border border-transparent hover:border-gray-300 ${(!Opac) ? 'bg-opacity-100' : 'bg-opacity-20'}`}
                >
                    <span className={`fi fi-${(currentLocale === 'en') ? 'us' : currentLocale} mt-1`}></span>
                    <ChevronDownIcon className='h-5 w-5 flex-none text-gray-900  ui-open:transform ui-open:rotate-180' aria-hidden='true' />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
            >
                <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                    {
                        renderDropdownOptions()
                    }
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export { LanguageSelector }