'use client'
/* eslint-disable @next/next/no-img-element */
import { Fragment, useEffect, useState } from 'react'
import { Dialog, DialogPanel, Disclosure, Popover, PopoverBackdrop, PopoverButton, PopoverGroup, PopoverPanel, Transition } from '@headlessui/react'
import { Bars3Icon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'
import { CTAGroup, Image, Link } from '@/components'
import { App } from '@/types'
import useRouterHook from '@/hooks/useRouterHook'
import { getJsonCookie, getPersonalizeAttribute, isCookieExist, removeSpecialChar } from '@/utils'
import { localeCookieName } from '@/config'
import { LivePreviewTypeMapper, Locale  } from '@/types/common'
import { usePersonalization } from '@/context'
import { Header as HeaderType, MegaMenuSection } from '@/types/app'
import { LanguageSelector } from '../LanguageSelector'

/**
 * React component that renders the header section of a website.
 * 
 * @param {App.Header} props - Component props
 * @param {App.Logo} props.logo - Logo object containing the URL and title of the logo
 * @param {App.NavItems[]} props.items - Array of menu items
 * @returns {JSX.Element} Header component
 */
function Header (props: App.Header): JSX.Element {

    const { logo, items, $ } = props

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [currPanel, setCurrPanel] = useState('')
    const [, setOpen] = useState(false)
    const [locales, setLocales] = useState<Locale[] | []>([])
    const { path } = useRouterHook()

    // Determine if the current page is the home page (or AB Test Landing Page) or not
    // Further used to set transparency of the header if the page is the home page or AB Test Landing Page or Article Page
    const isHome: boolean = (path === '/' || path === process.env.CONTENTSTACK_AB_LANDING_PAGE_PATH || path.split('/')[1] === 'article' || path.split('/')[1] === 'contact-us') ? true : false

    const { personalizationSDK, personalizeConfig } = usePersonalization()

    const audiences = personalizeConfig?.audiences

    const router = useRouterHook()

    useEffect(() => {
        if (isCookieExist(localeCookieName)) setLocales(getJsonCookie(localeCookieName))
    }, [props])

    // Function for opening the item menu in mobile side bar
    const handleMouseOver = (e: React.MouseEvent) => {
        const title = (e.target as HTMLElement).getAttribute('data-title') || (e.target as HTMLElement)?.parentElement?.getAttribute('data-title')
        if (title && title !== null) {
            setCurrPanel(title)
        }
    }

    const resetNav = () => {
        setCurrPanel('')
    }


    // Function for closing the item menu in mobile side bar
    const handleClose = (e: React.MouseEvent) => {
        const boundingRect = document.querySelector('.panel.block')?.getBoundingClientRect()
        let isSectionActive = false
        boundingRect && (e.clientY < boundingRect?.bottom) ? isSectionActive = true : isSectionActive = false
        !isSectionActive && resetNav()
    }

    const resetMobileNav = () => {
        setOpen(false)
    }

    // Set the attribute for personalization
    const setAttribute = async (region: string, mobile = false) => {
        const criteria = region.split('/').pop()?.toLowerCase()
        const attributes = getPersonalizeAttribute(audiences, removeSpecialChar(String(criteria)))
        await personalizationSDK?.set({ ...attributes })

        if (mobile) resetMobileNav()
    }

    return (
        <header id='header-component' className={`${isHome ? 'mt-[-6.25rem]' : ''} sticky top-0 z-50 bg-white/90`}>
            <nav className={`px-[2.25rem] md:px-21 h-[6.25rem] flex items-center justify-between border-b border-stone ${mobileMenuOpen ? 'hidden sm:flex' : ''}`} aria-label='Global'>
                <div className='flex lg:flex-1`'>
                    {logo?.url && <Link url='/'>
                        <h1 className='sr-only' aria-hidden='true'>Compass Starter</h1>
                        <img
                            className='h-[3.3825rem] w-[10rem] xs:w-[11.75rem]'
                            src={logo?.url}
                            alt={logo?.title}
                            {...logo?.$?.url}
                        />
                    </Link>}
                </div>
                {/* DESKTOP MENU */}
                <PopoverGroup className='hidden lg:flex lg:gap-x-12' 
                    {...$?.items}
                >
                    {items?.map((item, itemInd) => (
                        <div 
                            key={`navitem-${itemInd}`}
                            {...$?.[`items__${itemInd}` as keyof LivePreviewTypeMapper<HeaderType>]}
                        >
                            {item?.mega_menu?.length ? <Popover key={`navItem-${itemInd}`} data-id={`navItem-${itemInd}`} className='flex'>
                                <PopoverButton
                                    className={'flex items-center gap-x-1 text-lg font-semibold outline-none text-stone'}
                                >
                                    <span
                                        className='flex items-center'
                                        {...item?.$?.text}
                                    >
                                        {item.text}
                                        <ChevronRightIcon 
                                            aria-hidden='true'
                                            className={'h-[1.0625rem] w-[1.0625rem] rounded-full flex ml-[0.625rem] px-[0.1875rem] py-[0.09375rem] stroke-[3px] text-white bg-stone ui-open:transform ui-open:rotate-90'}
                                        />
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
                                        className='popup dark w-full flex flex-col absolute inset-x-0 top-[6.25rem] bg-white/90 shadow-[0px_4px_4px_0px_rgba(0, 0, 0, 0.25)]'
                                    >
                                        {item?.mega_menu?.[0]?.sections?.[0]?.links?.length && <div className='flex flex-col px-4' 
                                            {...item?.mega_menu?.[0]?.sections?.[0].$?.links}
                                        >

                                            <div className={`my-[2.75rem] ${item?.mega_menu?.[0]?.sections?.[0]?.links?.length >= 4 ? 'grid grid-cols-4' : 'flex items-center'}
                                            gap-[15.08px] mx-auto`}>
                                                {item?.mega_menu?.[0]?.sections?.[0]?.links?.map((linkData, ind) => (
                                                    <div
                                                        key={`${linkData?.text}-${ind}`}
                                                        data-id={`navItem-${itemInd}-card-${ind}`}
                                                        {...item?.mega_menu?.[0]?.sections?.[0].$?.[`links__${ind}` as keyof LivePreviewTypeMapper<MegaMenuSection>]}
                                                    >       
                                                        <a
                                                            href={'/' + router.locale + linkData?.link?.[0]?.url}
                                                            className='relative flex flex-col outline-none size-[12rem] xl:size-[225.43px] border-transparent
                                                            shadow-[0.69813rem_0.69813rem_1.57125rem_0.17444rem_rgba(0,0,0,0.5)] bg-stone shadow-stone/50 overflow-hidden group'
                                                            onClick={() => setAttribute(String(linkData?.link?.[0]?.url))}
                                                            {...linkData?.$?.link}
                                                            role='button'
                                                        >
                                                            {linkData?.thumbnail?.url && <Image 
                                                                image={linkData?.thumbnail}
                                                                className='absolute inset-0 w-full h-full object-cover transition-transform duration-1000 scale-100 group-hover:scale-125'
                                                                alt={linkData?.thumbnail?.title}
                                                                $={linkData?.thumbnail?.$}
                                                            />}
                                                            <div className='absolute bottom-0 m-5 xl:mx-[26.34px] xl:mb-[30.56px]'>
                                                                {linkData?.text && <>
                                                                    <div
                                                                        className='z-10 w-[2.625rem] h-[0.375rem] my-[0.65rem] bg-white'
                                                                    />
                                                                    <h6
                                                                        data-id='paragraph-text'
                                                                        className='text-[31.61px] leading-[35.82px] before:hidden uppercase group-hover:underline'
                                                                        {...linkData?.$?.text}
                                                                    >{linkData.text}
                                                                    </h6>
                                                                </>}
                                                                {linkData?.link_text && <span
                                                                    className='mt-[10.54px] btn-primary !min-w-[8.615625rem] w-[8.615625rem] text-center !h-auto !leading-[1.5rem] py-[0.62rem] group-hover:underline'
                                                                    {...linkData?.$?.link}
                                                                >
                                                                    {linkData?.link_text && <span className='text-clamp' {...linkData?.$?.link_text}>{linkData?.link_text}</span>}
                                                                </span>}
                                                            </div>
                                                        </a>
                                                    </div>
                                                ))}
                                            </div>
                                        
                                        </div>}
                                        {item?.mega_menu?.[0]?.cta_group?.[0] && CTAGroup(item.mega_menu[0].cta_group[0])}
                                    </PopoverPanel>
                                </Transition>
                            </Popover> : <Fragment key={`navItem-${itemInd}`}>
                                <span {...item?.$?.link} 
                                    className={'flex items-center gap-x-1 text-lg font-semibold text-stone'}
                                >   
                                    <Link
                                        url={item?.link?.[0]?.url}
                                    >
                                        <span {...item?.$?.text}>{item.text}</span>
                                    </Link> </span>
                            </Fragment>}
                        </div>))}
                  
                </PopoverGroup>
                <div className='flex items-center gap-x-0 xs:gap-x-4'>

                    {/* * LANGUAGE SELECTOR */}
                    <LanguageSelector
                        locales={locales}
                    />
                    {/* Bar Icon */}
                    <div className='flex lg:hidden'>
                        <button
                            type='button'
                            className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 pt-3.5 text-stone'
                            onClick={() => {
                                setMobileMenuOpen((prevState) => !prevState)
                            }}
                        >
                            <span className='sr-only'>Open main menu</span>
                            {!mobileMenuOpen && <Bars3Icon className='h-7 w-7 stroke-2' aria-hidden='true' onClick={() => { setCurrPanel('') }} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* MOBILE MENU */}
            <Dialog as='div' className='lg:hidden' open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className='fixed inset-0 z-50' />
                <DialogPanel className='popup fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white/90 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
                    <div className='flex items-center justify-between h-12'>
                        <div className='flex lg:flex-1'>
                            {logo?.url && <Link url='/' className='-m-1.5 ml-1.5 p-1.5'>
                                <span className='sr-only'>Compass Starter</span>
                                <img
                                    className='h-12 sm:h-8.5 w-auto z-20'
                                    src={logo?.url}
                                    alt={logo?.title}
                                    {...logo?.$?.url}
                                />
                            </Link>}
                        </div>
                        <div />
                        <button
                            type='button'
                            className='-m-2.5 rounded-md pr-6 text-stone'
                            onClick={() => {
                                setMobileMenuOpen(false)
                                resetNav()
                            }}
                        >
                            <span className='sr-only'>Close menu</span>
                            <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                        </button>
                    </div>
                    <div className='mt-12 sm:mt-4 flow-root'>
                        <div className='-my-6 divide-y divide-gray-500/10'>
                            <div className='space-y-2 py-0 sm:py-6' 
                                // {...$?.items}
                            >
                                <Disclosure as='div'>
                                    {items && items?.map((item, i: number) => (
                                        item?.text
                                        && <Fragment key={`mobile-navItem-${i}`}>
                                            <div
                                                className={'flex justify-between items-center py-2 pr-3 cursor-pointer'}
                                                data-id={`menuItem-${i}`}
                                                // {...$?.[`items__${i}` as keyof LivePreviewTypeMapper<HeaderType>]}
                                                onClick={(e: React.MouseEvent) => { currPanel !== item?.text ? handleMouseOver(e) : handleClose(e)}}
                                                data-title={item?.text}
                                            >
                                                <span
                                                    className={`${currPanel === item?.text ? 'underline' : ''} block ml-6 mr-3 text-md font-medium font-inter leading-7 hover:bg-gray-50 hover:underline`}
                                                    {...((item?.mega_menu?.[0]?.sections) ? '' : item?.$?.link)}
                                                    data-title={item?.text}
                                                >
                                                    {item?.link && item?.link.length > 0 ? <Link url={item?.link}>
                                                        <span {...((item?.mega_menu?.[0]?.sections) ? '' : item?.$?.text)}>{item.text}</span>
                                                    </Link>
                                                        : item?.mega_menu?.[0]?.sections?.length as number > 0
                                                            ? <span
                                                                {...item?.$?.text}
                                                            >{item.text}</span> : null}
                                                </span>
                                                {item && item?.mega_menu?.[0]?.sections && item?.mega_menu?.[0]?.sections?.length > 0 && <>
                                                    {currPanel === item?.text
                                                        ? <ChevronUpIcon
                                                            className='block h-4 w-8 stroke-2 ui-open:transform ui-open:rotate-90'
                                                        />
                                                        : <ChevronDownIcon
                                                            className='block h-4 w-8 stroke-2'
                                                        />
                                                    }
                                                </>}

                                            </div>
                                            <div className='flex flex-col items-start px-4 w-full'>
                                                {item && item?.mega_menu?.[0]?.sections?.map((sect, ind) => (
                                                    <div
                                                        key={`section-${ind}`}
                                                        data-id={`section-${ind}`}
                                                        className={`!items-start w-full ${currPanel === item?.text ? '' : 'hidden'}`}
                                                    >

                                                        <div onClick={resetMobileNav}>
                                                            {sect?.title && <Link
                                                                url={sect?.link}
                                                                className='font-inter text-base flex items-start text-stone pt-2'
                                                            >
                                                                {sect.title}
                                                            </Link>}
                                                        </div>
                                                        <ul
                                                            role='list'
                                                            aria-labelledby={`section-${ind}-heading-mobile`}
                                                            className='flex flex-col items-start space-y-3'
                                                            {...sect?.$?.links}
                                                        >
                                                            {sect?.links?.map((subitem, s_ind) => (
                                                                subitem?.text && <li key={subitem.text} {...sect?.$?.[`links__${s_ind}` as keyof LivePreviewTypeMapper<HeaderType>]}>
                                                                    <div onClick={() => setAttribute(String(subitem?.link?.[0].url), true)}>
                                                                        <Link url={subitem.link} className='-m-2 block p-2 pl-10 text-stone text-[1.004438rem] text-justify font-normal font-inter leading-normal hover:underline'>
                                                                            <span {...subitem?.$?.text}>{subitem.text}</span>
                                                                        </Link>
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