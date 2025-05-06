'use client'
/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react'
import parse from 'html-react-parser'

import { App } from '@/types'
import { Link } from '@/components'
import { FooterLink, FooterSection } from '@/types/app'
import { LivePreviewTypeMapper } from '@/types/common'

export const isFooterValid = (footer:App.Footer) => {
    return footer && Object.keys(footer)?.length > 0
}

/**
 * React component that renders the footer section of a website.
 * 
 * @param {App.Footer} props - Component props
 * @param {App.FooterSection[]} props.sections - Array of footer sections
 * @param {string} props.logo - Logo object containing the URL and title of the logo
 * @param {string} props.built_by - Information about who built the website
 * @param {string} props.copyright_info - Information about the copyright
 * @returns {JSX.Element} Footer component
 */
export const Footer: React.FC<App.Footer> = (props: App.Footer): JSX.Element => {
    const { sections, copyright_info, built_by, logo, $ } = props
    const [footerColumns, setFooterColumns] = React.useState<FooterSection[]>([])
    const [footnoteLinks, setFootnoteLinks] = React.useState<FooterSection>()


    useEffect(() => {
        if (sections) {
            setFooterColumns(sections?.filter((section: FooterSection, i) => i !== sections.length - 1))
            setFootnoteLinks(sections[sections.length - 1])
        }
    }, [sections])

    /**
     * Renders a list of footer links
     * @param {FooterLink[]} links - Array of footer link objects
     * @param {LivePreviewTypeMapper<FooterLink | undefined>} links_$ - Live preview object containing data-cslp for footer links
     * @param {string} [className] - Optional CSS classname to apply to links
     * @returns {JSX.Element[]} Array of rendered link elements
     */
    const renderLinks = (links: FooterLink[], links_$: LivePreviewTypeMapper<FooterLink | undefined>, className?: string) => {
        return links?.map((link: FooterLink, index: number) => {
            return (
                <li
                    key={`link-${index}`}
                    {...links_$?.[`links__${index}`]}
                    role='listitem'
                >
                    {link?.link?.[0]?.url
                        ? (
                            <Link
                                url={link?.link?.[0]?.url || link?.external_link}
                                className={`text-base text-stone hover:underline font-inter ${className || ''}`}
                                target={link?.external_link && link?.external_link?.charAt(0) !== '/' ? '_blank' : '_self'}
                                {...link?.$?.link || link?.$?.external_link}
                            >
                                <span {...(link?.link.length !== 0 ? link?.$?.link : link?.$?.text)}>{link?.text}</span>
                            </Link>
                        )
                        : (
                            <Link
                                url={link?.external_link}
                                className={`text-base text-stone hover:underline font-inter ${className || ''}`}
                                target={link?.external_link?.charAt(0) !== '/' ? '_blank' : '_self'}
                                {...link?.$?.external_link}
                            >
                                <span {...(link?.link.length !== 0 ? link?.$?.link : link?.$?.text)}>{link?.text}</span>
                            </Link>
                        )}
                </li>
            )
        })
    }

    return (
        <footer
            aria-labelledby='footer-heading'
            className='bg-[#F0F3F7] pt-[90px] 3xl:pt-[120px]'
            id='footer-component'
        >
            <h2 id='footer-heading' data-id='h2-text' className='sr-only'>
                Footer
            </h2>
            <div className='mx-auto w-[90%] 3xl:w-[1543px]'>
                {isFooterValid(props) && <div className='grid gap-y-12 gap-x-8 xl:gap-8 grid-cols-6 2xl:grid-cols-5 max-xl:bg-red px-3 mx-[44.5px]'>
                    {
                        logo?.title
                            && <div className='col-start-1 col-end-7 xl:col-span-2 flex flex-row mt-0 mb-0 items-start justify-start sm:items-start sm:justify-start'>
                                <Link url='/'>
                                    <h2 className='sr-only'>Site Logo</h2>
                                    <img
                                        className='h-16 w-[14.823rem] 3xl:h-20.5 3xl:w-17.5'
                                        src={logo?.url}
                                        alt={logo?.title}
                                        {...logo?.$?.url}
                                    />
                                </Link>
                            </div>
                    }
                    <div className='col-start-1 col-end-7 xl:col-span-4 2xl:col-span-3 flex flex-col sm:flex-wrap md:flex-nowrap sm:flex-row sm:justify-between'>
                        {footerColumns?.length && footerColumns.map((link: FooterSection, index: number) => {
                            return (
                                <div className='ml-[6px] mb-12 last:mb-0 md:mb-0 sm:w-[40%] md:w-auto' key={`footer-col-${index}`}>
                                    <h3
                                        className='text-sm font-bold leading-[14px] font-inter tracking-widest text-stone uppercase before:hidden'
                                        data-id='h3-text'
                                        {...link?.$?.title}
                                    >
                                        {link.title}
                                    </h3>
                                    <ul role='list' className='mt-6 space-y-4' {...link?.$?.links}>
                                        {renderLinks(link?.links, link?.$)}
                                        {
                                            index === footerColumns?.length - 1 && built_by && built_by.length != 0 && built_by != '<p></p>'
                                                && <div 
                                                    className='bg-white border-[0.5px] border-[#63739280] rounded uppercase max-w-fit sm:w-[361px] !my-12 !text-xs px-3 font-inter py-4 text-left md:text-center footer-declaimer' 
                                                    {...$?.built_by}
                                                    role='listitem'
                                                >
                                                    {parse(built_by)}
                                                </div>
                                        }
                                    </ul>
                                </div>
                            )
                        })}
                    </div>
                </div>
                }
                <div className='pt-8 pb-16 md:pt-[96px] 3xl:pb-16 px-[56.5px] flex flex-col gap-2 md:flex-row items-left md:items-center justify-between copyright-info'>
                    {copyright_info && <div {...$?.copyright_info} >
                        {parse(copyright_info)}
                    </div>}
                    <ul role='list' className='flex flex-row gap-[47.33px] list-none'>
                        {footnoteLinks && footnoteLinks?.links && renderLinks(footnoteLinks?.links, footnoteLinks?.$, 'font-medium underline !leading-[15.5px]')}
                    </ul>

                </div>
            </div>
        </footer>
    )
}  