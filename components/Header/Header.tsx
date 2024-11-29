'use client'
/* eslint-disable @next/next/no-img-element */
import { Fragment, useEffect, useState } from 'react'
import { Dialog, DialogPanel, Disclosure, Popover, PopoverBackdrop, PopoverButton, PopoverGroup, PopoverPanel, Transition } from '@headlessui/react'
import {
    Bars3Icon,
    ChevronRightIcon,
    XMarkIcon
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'
import { Carousel, CTAGroup, Link } from '@/components'
import { App } from '@/types'
import useRouterHook from '@/hooks/useRouterHook'
import { getJsonCookie, getPersonalizeAttribute, isCookieExist } from '@/utils'
import { localeCookieName } from '@/config'
import { Locale } from '@/types/common'
import { usePersonalization } from '@/context'
import { LanguageSelector } from '../LanguageSelector'

function Header (props: App.Header) {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [data, setData] = useState(props)
    const { logo, items } = props

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [Opac, setOpac] = useState<boolean>(true)
    const [currPanel, setCurrPanel] = useState('')
    const [, setOpen] = useState(false)
    const [locales, setLocales] = useState<Locale[] | []>([])
    const { path } = useRouterHook()
    const isHome: boolean = (path === '/' || path === process.env.CONTENTSTACK_AB_LANDING_PAGE_PATH) ? true : false

    const { personalizationSDK, personalizeConfig } = usePersonalization()

    const audiences = personalizeConfig?.audiences

    const router = useRouterHook()

    useEffect(() => {
        setData(props)
        if (isCookieExist(localeCookieName)) setLocales(getJsonCookie(localeCookieName))
    }, [props])

    const listenScrollEvent = () => {
        if (window?.scrollY > 0)
            setOpac(false)
        else
            setOpac(true)
    }

    useEffect(() => {
        const top = document.querySelector('.teaser-container')?.getBoundingClientRect()?.top
        if (top && top < 100) {
            setOpac(true)
        }

        window.addEventListener('scroll', listenScrollEvent)
        return () => {
            window.removeEventListener('scroll', listenScrollEvent)
        }
    }, [])

    const handleMouseOver = (e: React.MouseEvent) => {
        const title = (e.target as HTMLElement).getAttribute('data-title') || (e.target as HTMLElement)?.parentElement?.getAttribute('data-title')
        if (title && title !== null) {
            setCurrPanel(title)
        }
    }

    const resetNav = () => {
        setCurrPanel('')
    }

    const handleClose = (e: React.MouseEvent) => {
        const boundingRect = document.querySelector('.panel.block')?.getBoundingClientRect()
        let isSectionActive = false
        boundingRect && (e.clientY < boundingRect?.bottom) ? isSectionActive = true : isSectionActive = false
        !isSectionActive && resetNav()
    }

    const resetMobileNav = () => {
        setOpen(false)
    }

    const setAttribute = async (region: string, mobile = false) => {
        const criteria = region.toLowerCase()
        const attributes = getPersonalizeAttribute(audiences, criteria)
        await personalizationSDK.set({ ...attributes })

        if (mobile) resetMobileNav()
    }


    return (
        <header id='header-component' className={`${isHome ? 'mt-[-80px]' : ''} bg-white sticky top-0 z-50 hover:bg-white ${(!Opac) ? 'bg-opacity-100' : 'bg-opacity-20'}`}>
            <nav className={`mx-auto flex items-center justify-between px-4 py-5 lg:px-8 ${mobileMenuOpen ? 'hidden sm:block' : ''}`} aria-label='Global'>
                <div className='flex lg:flex-1`'>
                    {logo?.url && <Link url='/' className={'-m-1.5 ml-1.5 p-1.5'}>
                        <span className='sr-only'>Site Logo</span>
                        <img
                            className='h-8 w-auto'
                            src={logo?.url}
                            alt={logo?.title}
                            {...logo?.$?.url}
                        />
                    </Link>}
                </div>
                <div className='flex lg:hidden'>
                    <div
                        className='relative flex items-center justify-center mr-14 bottom-[7px]'
                    >
                        {/* * [MOBILE] LANGUAGE SELECTOR */}
                        {/* ? Language selecter will be hidden when the mobile menu is open */}
                        {
                            (!mobileMenuOpen)
                            && <div className='h-6 w-6'>
                                <LanguageSelector
                                    locales={locales}
                                    Opac={Opac}
                                />
                            </div>
                        }
                    </div>
                    <button
                        type='button'
                        className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-black'
                        onClick={() => {
                            setMobileMenuOpen((prevState) => !prevState)
                        }}
                    >
                        <span className='sr-only'>Open main menu</span>
                        {!mobileMenuOpen && <Bars3Icon className='h-6 w-6' aria-hidden='true' onClick={() => { setCurrPanel('') }} />}
                    </button>
                </div>

                {/* DESKTOP MENU */}
                <PopoverGroup className='hidden lg:flex lg:gap-x-12'>
                    {items?.map((item, itemInd) => (
                        item?.mega_menu?.length ? <Popover key={item.text} data-id={`navItem-${itemInd}`} className='flex'>
                            <PopoverButton
                                className='flex items-center gap-x-1 text-m font-semibold leading-6 text-gray-900 outline-none'
                            >
                                <span
                                    className='flex items-center gap-x-1π'
                                >
                                    {item.text}<ChevronDownIcon className='h-5 w-5 flex-none text-gray-900  ui-open:transform ui-open:rotate-180' aria-hidden='true' />
                                </span>
                            </PopoverButton>
                            <PopoverBackdrop className='fixed inset-0 bg-transparent -z-20' />
                            <Transition
                                as={Fragment}
                                enter='transition ease-out duration-200'
                                enterFrom='opacity-0 -translate-y-1'
                                enterTo='opacity-100 translate-y-0'
                                leave='transition ease-in duration-150'
                                leaveFrom='opacity-100 translate-y-0'
                                leaveTo='opacity-0 -translate-y-1'
                            >
                                <PopoverPanel
                                    className='absolute inset-x-0 top-0 -z-10 bg-white pt-14 shadow-lg ring-1 ring-gray-900/5 opacity-100 translate-y-0'
                                >
                                    {item?.mega_menu?.[0]?.sections?.[0]?.links?.length && <div className='px-8'>
                                        <Carousel
                                            className='mx-auto px-6 xl:pr-0 xl:pl-8 py-10'
                                        >
                                            {item?.mega_menu?.[0]?.sections?.[0]?.links?.map((linkData, ind) => (
                                                <div
                                                    key={linkData?.text}
                                                    className={'mb-8 mt-4 w-72 xl:w-40 xl:pr-8 pr-14'}
                                                    data-id={`navItem-${itemInd}-card-${ind}`}
                                                >
                                                    <div {...item?.mega_menu?.[0]?.sections?.[0].$?.[`links__${ind}`]}>
                                                        {linkData?.text && <p
                                                            data-id='paragraph-text'
                                                            className='font-semibold text-gray-900 text-m mb-4'
                                                            {...linkData?.$?.text}
                                                        >{linkData.text}
                                                        </p>}
                                                        <a
                                                            href={'/' + router.locale + linkData?.link?.[0]?.url}
                                                            className='flex flex-col outline-none'
                                                            onClick={() => setAttribute(String(linkData.text))}
                                                            {...linkData?.$?.link}
                                                        >
                                                            {linkData?.thumbnail?.url && <img
                                                                src={linkData.thumbnail.url.indexOf('?') > -1 ? `${linkData.thumbnail.url}&auto=webp&format=pjpg` : `${linkData.thumbnail.url}?auto=webp&format=pjpg`} className='object-cover h-40'
                                                                alt={linkData?.thumbnail?.title}
                                                                {...linkData?.$?.thumbnail}></img>
                                                            }
                                                            {linkData?.link?.[0]?.url && <span
                                                                className='mt-4 font-light inline font-montserrat'
                                                                {...linkData?.$?.link}
                                                            >
                                                                <span {...linkData?.$?.link_text}>{linkData?.link_text && linkData?.link_text}</span> <ChevronRightIcon className='h-4 my-auto inline-block mb-1' />
                                                            </span>}
                                                        </a>
                                                    </div>
                                                </div>
                                            ))}
                                        </Carousel>
                                    </div>}
                                    {item?.mega_menu?.[0]?.cta_group?.[0] && CTAGroup(item.mega_menu[0].cta_group[0])}
                                </PopoverPanel>
                            </Transition>
                        </Popover> : <>
                            {item?.link?.[0]?.url && <span {...item?.$?.link} className='flex items-center gap-x-1 text-m font-semibold leading-6 text-gray-900'><Link
                                url={item.link[0].url}
                            >
                                <span {...item?.$?.text}>{item.text}</span>
                            </Link> </span>}
                        </>
                    ))}
                    {/* * [DESKTOP] LANGUAGE SELECTOR */}
                    <LanguageSelector
                        locales={locales}
                    />
                </PopoverGroup>
            </nav>

            {/* MOBILE MENU */}
            <Dialog as='div' className='lg:hidden' open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className='fixed inset-0 z-50' />
                <DialogPanel className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
                    <div className='flex items-center justify-between'>
                        <div className='flex lg:flex-1'>
                            {logo?.url && <Link url='/' className='-m-1.5 ml-1.5 p-1.5'>
                                <span className='sr-only'>Site Logo</span>
                                <img
                                    className='h-8 w-auto'
                                    src={logo?.url}
                                    alt={logo?.title}
                                    {...logo?.$?.url}
                                />
                            </Link>}
                        </div>
                        <div />
                        <button
                            type='button'
                            className='-m-2.5 rounded-md pr-6 text-gray-700'
                            onClick={() => {
                                setMobileMenuOpen(false)
                                resetNav()
                            }}
                        >
                            <span className='sr-only'>Close menu</span>
                            <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                        </button>
                    </div>
                    <div className='mt-6 flow-root'>
                        <div className='-my-6 divide-y divide-gray-500/10'>
                            <div className='space-y-2 py-6'>
                                <Disclosure as='div' className=''>
                                    {items && items?.map((item, i: number) => (
                                        item?.text
                                        && <Fragment key={`mobile-navItem-${i}`}>
                                            <div
                                                className={'flex justify-between items-center py-2 pr-3'}
                                                data-id={`menuItem-${i}`}
                                            >
                                                <span className={`${currPanel === item?.text ? '' : 'text-[#253143]'} block ml-6 mr-3 text-sm font-semibold font-montserrat leading-7 text-gray-900 hover:bg-gray-50`}
                                                    {...((item?.mega_menu?.[0]?.sections) ? '' : item?.$?.link)}>
                                                    <Link
                                                        url={item?.link}
                                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                                        // @ts-ignore
                                                    >
                                                        <span {...((item?.mega_menu?.[0]?.sections) ? '' : item?.$?.text)}>{item.text}</span>
                                                    </Link>
                                                </span>
                                                {item && item?.mega_menu?.[0]?.sections && item?.mega_menu?.[0]?.sections?.length > 0 && <>
                                                    {currPanel === item?.text
                                                        ? <button
                                                            onClick={handleClose}
                                                            className='outine'
                                                            type='button'
                                                            data-title={item?.text}

                                                        >
                                                            <ChevronUpIcon
                                                                className='block h-4 w-8 cursor-pointer'
                                                            />
                                                        </button>
                                                        : <button
                                                            onClick={(e: React.MouseEvent) => { handleMouseOver(e) }}
                                                            type='button'
                                                            data-title={item?.text}

                                                        >
                                                            <ChevronDownIcon
                                                                className='block h-4 w-8 cursor-pointer'
                                                            />
                                                        </button>}
                                                </>}

                                            </div>
                                            <div className='flex flex-col items-start px-4 w-full'>
                                                {item && item?.mega_menu?.[0]?.sections?.map((sect, ind) => (
                                                    <div
                                                        key={`section-${ind}`}
                                                        data-id={`section-${ind}`}
                                                        className={`!items-start w-full ${currPanel === item?.text ? '' : 'hidden'}`}
                                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                                    // @ts-ignore
                                                    >
                                                        <div onClick={resetMobileNav}>
                                                            {sect?.title && <Link
                                                                url={sect?.link}
                                                                className='font-medium font-montserrat text-base flex items-start text-gray-900 pt-2'>
                                                                {sect.title}
                                                            </Link>}
                                                        </div>
                                                        <ul
                                                            role='list'
                                                            aria-labelledby={`section-${ind}-heading-mobile`}
                                                            className='flex flex-col items-start space-y-3'
                                                        >
                                                            {sect?.links?.map((subitem) => (
                                                                subitem?.text && <li key={subitem.text} className=''>
                                                                    <div onClick={() => setAttribute(String(subitem.text), true)}>
                                                                        <span {...subitem?.$?.link}>
                                                                            <Link url={subitem.link} className='-m-2 block p-2 pl-10 text-[#253143] text-[16.071px] text-justify font-normal font-montserrat leading-normal hover:underline'>
                                                                                <span {...subitem?.$?.text}>{subitem.text}</span>
                                                                            </Link>
                                                                        </span>
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        </Fragment>
                                    ))}

                                    {/* CTA Group*/}
                                    {items && items?.map((item, i: number) => (
                                        <Fragment key={`ctaGroup-${i}`}>
                                            {(item?.text === currPanel) && item?.mega_menu?.[0]?.cta_group?.[0] && CTAGroup(item.mega_menu[0].cta_group[0])}
                                        </Fragment>
                                    ))}

                                </Disclosure>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    )
}

export { Header }