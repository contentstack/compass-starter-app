'use client'
/* eslint-disable @next/next/no-img-element */
import React from 'react'
import parse from 'html-react-parser'

import { App } from '@/types'
import { Link } from '@/components'
import { FooterLink, FooterSection } from '@/types/app'

export const isFooterValid = (footer:App.Footer) => {
    return footer && Object.keys(footer)?.length > 0
}

export const Footer: React.FC<App.Footer> = (props: App.Footer) => {
    const { sections, copyright_info, built_by, logo, $ } = props

    // ? Method to render the Region Links column
    const renderFooterLinks = () => {
        const chunkedArray = []
        if (sections && sections?.length) {
            for (let i = 0; i < sections.length; i += 2) {
                const chunk = sections?.slice(i, i + 2)
                chunkedArray.push(chunk)
            }
        }
       

        const renderLinks = (links: FooterLink[]) => {
            return links?.map((link: FooterLink, index: number) => {
                return (
                    <li
                        key={`link-${index}`}
                        {...link?.$?.text}
                    >
                        {
                            link?.link?.[0]?.url
                                ? (
                                    <Link
                                        url={link?.link?.[0]?.url || link?.external_link?.href}
                                        className='text-sm leading-6 text-gray-700 hover:font-bold font-montserrat'
                                        target={link?.external_link?.href && link?.external_link?.href?.charAt(0) !== '/' ? '_blank' : '_self'}
                                        {...link?.$?.link || link?.$?.external_link}
                                    >
                                        {link?.text}
                                    </Link>
                                )
                                : (
                                    <Link
                                        url={link?.external_link?.href}
                                        className='text-sm leading-6 text-gray-700 hover:font-bold font-montserrat'
                                        target={link?.external_link?.href?.charAt(0) !== '/' ? '_blank' : '_self'}
                                        {...link?.$?.external_link}
                                    >
                                        {link?.text || link?.external_link?.title}
                                    </Link>
                                )
                        }
                    </li>

                )

            })

        }

        const renderLinkColumns = (chunk: FooterSection[]) => {

            return chunk?.map((link: FooterSection, index: number) => {
                return (
                    <div className='mb-10 md:mb-0' key={`footer-col-${index}`}>
                        <h3
                            className='text-sm font-semibold leading-6 text-black font-montserrat'
                            data-id='h3-text'
                            {...link?.$?.title}
                        >
                            {link.title}
                        </h3>
                        <ul role='list' className='mt-6 space-y-4'>
                            {
                                renderLinks(link?.links)
                            }
                        </ul>
                    </div>
                )
            })
        }

        return chunkedArray?.map((chunk, index: number) => {
            return (
                <div className='gap-8 md:grid md:grid-cols-2 md:gap-8' key={`chunk-${index}`}>
                    {/* 
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                    */}
                    {renderLinkColumns(chunk!)}
                </div>
            )
        })

    }


    return (
        <footer
            aria-labelledby='footer-heading'
            className='bg-[#F3f3f3] mt-16'
            id='footer-component'
        >
            <h2 id='footer-heading' data-id='h2-text' className='sr-only'>
                Footer
            </h2>
            {isFooterValid(props) && <div className='mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8 lg:py-24'>
                <div className='xl:grid xl:grid-cols-3 xl:gap-8'>
                    {
                        logo?.title
                        && <div className='flex flex-row mt-0 mb-0 items-start justify-start sm:items-start sm:justify-start'>
                            <Link url='/'>
                                <span className='sr-only'>Site Logo</span>
                                <img
                                    className='h-12 w-auto'
                                    src={logo?.url}
                                    alt={logo?.title}
                                    {...logo?.$?.url}
                                />
                            </Link>
                        </div>
                    }
                    <div className='mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0 font-systemUI'>
                        {renderFooterLinks()}
                    </div>
                </div>
            </div>
            }
            <div className='mx-auto max-w-7xl border-t border-gray-900/10 w-full px-6 pt-4 pb-8 md:pt-4 md:pb-4 flex flex-col gap-2 md:flex-row items-center justify-between '>
                {copyright_info && <span className='text-gray-700 font-montserrat' {...$?.copyright_info} >
                    {parse(copyright_info)}
                </span>}

                {built_by && built_by.length != 0 && built_by != '<p></p>' && <div className='py-1 px-3 rounded-full border-[1px] border-gray-700 text-center built-by' {...$?.built_by}>
                    {parse(built_by)}
                </div>}
            </div>
        </footer>
    )
}  