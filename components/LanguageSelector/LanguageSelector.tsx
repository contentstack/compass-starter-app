'use client'

import { FunctionComponent, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
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
                <MenuItem
                    key={`language-option-${index}`}
                    as='div'
                >
                    <a
                        className={classNames(
                            (locale?.code === currentLocale || (currentLocale === 'us' && locale?.code === 'en')) ? 'bg-stone text-white rounded' : 'text-stone',
                            'group flex items-center px-4 py-2 text-sm font-medium gap-3 cursor-pointer'
                        )}
                        onClick={() => handleLanguageSwitch(locale)}
                        aria-label={`${locale?.name}`}
                    >
                        <span className={`fi fi-${flagCode}`} aria-hidden='true' />
                        <span>{locale?.name}</span>
                    </a>
                </MenuItem>
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
            className='relative inline-block text-left items-center justify-center'
        >
            <MenuButton
                className={`inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2  ${(!Opac) ? 'bg-opacity-100' : 'bg-opacity-20'}`}
                aria-label={`Current language is ${locales?.find(locale => getFlagCode(locale.code) === currentLocale)?.name || 'English'}. Click to change language`}
                aria-haspopup='true'
            >
                <span className={`fi fi-${(currentLocale === 'en') ? 'us' : currentLocale} mt-1`} aria-hidden='true'></span>
            </MenuButton>

            <Transition
                as={'div'}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
            >
                <MenuItems
                    className='absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
                    as='div'
                    aria-orientation='vertical'
                    aria-labelledby='language-menu'
                >
                    {
                        renderDropdownOptions()
                    }
                </MenuItems>
            </Transition>
        </Menu>
    )
}

export { LanguageSelector }