/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid'
import React, { useEffect, useRef, useState } from 'react'
import { ConsentFormProps, LivePreviewTypeMapper } from '@/types/common'
import { getCookie, setCookie } from '@/utils'
import { Image } from '../common/Image'

/**
 * Cookie Consent Form component.
 *
 * Displays a sticky consent popup for users to opt in or out of cookie usage.
 * Handles user consent state, sets cookies, and calls optional analytics methods.
 * 
 * @component
 * @param {ConsentFormProps} props - The props for the consent form.
 * @param {string} props.heading - The heading of the consent form.
 * @param {string} props.content - The content shown in the consent form.
 * @param {object} props.icon - Optional icon to display when consent form is minimized.
 * @param {Array} props.consent_actions - List of consent actions (e.g., opt-in, opt-out).
 * @param {object} [props.$] - Live preview data-cslp attributes.
 * @returns {JSX.Element} The rendered consent form component.
 */
const ConsentForm: React.FC<ConsentFormProps> = ({ heading, content, icon, consent_actions, $ }: ConsentFormProps) => {
    const [isOpen, setIsOpen] = useState(true)
    const [cookieConsent, setCookieConsent] = useState('')
    const modalRef = useRef<HTMLDivElement>(null)

    /**
     * Handles user consent actions for cookies.
     *
     * Depending on the `action` parameter, this function will:
     * - For `'optIn'`: Attempt to call the global `jstag.optIn()` method (if available), set the cookie consent to 'optIn', and close the consent form.
     * - For `'optOut'`: Attempt to call the global `jstag.optOut()` method (if available), set the cookie consent to 'optOut', and close the consent form.
     *
     * Both actions update the `cookie_consent` cookie for 365 days and update the local consent state.
     *
     * @param action - The consent action to perform. Accepts `'optIn'` or `'optOut'`.
     */
    const handleClick = (action: string) => {
        if (action === 'optIn') {
            try {
                // @ts-ignore
                if (typeof jstag !== 'undefined' && typeof jstag?.optIn === 'function') jstag?.optIn()
            } catch (err) {
                console.error('Error calling jstag.optIn:', err)
            }
            if (getCookie('cookie_consent') !== 'optIn') {
                setCookie('cookie_consent', 'optIn', 365)
            }
            setCookieConsent('optIn')
            setIsOpen(false)
        } else if (action === 'optOut') {
            try {
                // @ts-ignore
                if (typeof jstag !== 'undefined' && typeof jstag?.optOut === 'function') jstag?.optOut()
            } catch (err) {
                console.error('Error calling jstag.optOut:', err)
            }
            setCookie('cookie_consent', 'optOut', 365)
            setCookieConsent('optOut')
            setIsOpen(false)
        }
    }

    useEffect(() => {
        const consentCookie = getCookie('cookie_consent')
        if (consentCookie === 'optOut') {
            setIsOpen(false)
            setCookieConsent('optOut')
            try {
                // @ts-ignore
                if (typeof jstag !== 'undefined' && typeof jstag?.optOut === 'function') jstag?.optOut()
            } catch (err) {
                console.error('Error calling jstag.optOut:', err)
            }
        } else {
            if (!consentCookie) {
                setCookie('cookie_consent', 'optIn', 365)
            }
            setIsOpen(false)
            setCookieConsent('optIn')
            try {
                // @ts-ignore
                if (typeof jstag !== 'undefined' && typeof jstag?.optIn === 'function') jstag?.optIn()
            } catch (err) {
                console.error('Error calling jstag.optIn:', err)
            }
        }
    }, [])
    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', (event) => {
                if (event.key === 'Escape') {
                    setIsOpen(false)
                }
            })
        }
    }, [isOpen])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    return (
        <>
            <button className='fixed left-[30px] bottom-[30px] z-50 p-0 text-left' onClick={() => setIsOpen(true)} id='cookie-consent'>
                <span>
                    {icon?.url && <Image
                        image={icon}
                        alt={heading || 'Cookie settings'}
                        className='w-10 h-10 hover:cursor-pointer'
                    />}
                </span>
            </button>
            <div
                {...$?.consent_modal}
                ref={modalRef}
                className={`fixed left-[30px] bottom-[30px] z-[51] p-0 text-left flex max-w-lg items-center justify-center gap-2 px-4 py-2 rounded border border-transparent bg-white font-medium
                    shadow-[0px_4px_15px_0px_rgba(108,92,231,0.2),0px_3px_14px_3px_rgba(0,0,0,0.12),0px_8px_10px_1px_rgba(0,0,0,0.14)] scale-100 transition-all duration-300 ease-in-out
                    ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none hidden'}`}
            >
                <div className='flex flex-col'>
                    {heading && <h6 className='mb-2 font-medium capitalize leading-tight before:hidden' {...$?.heading}>{heading}</h6>}
                    {content && <p className='text-sm text-gray-500' {...$?.content}>{content}</p>}
                    <div className='inline-flex items-center gap-2' {...$?.consent_actions}>
                        {consent_actions && consent_actions?.length > 0 && consent_actions.map((actionItem, index) => (
                            <button
                                key={index}
                                className='mt-2 text-white font-bold py-2 px-4 rounded bg-stone hover:opacity-90'
                                onClick={() => {
                                    actionItem?.action && handleClick(actionItem.action)
                                }}
                                {...$?.[`consent_actions__${index}` as keyof LivePreviewTypeMapper<ConsentFormProps>]}
                            >
                                <span {...actionItem?.$?.label}>{actionItem?.label}</span>
                                {cookieConsent === actionItem?.action && <CheckIcon className='h-5 w-5 text-white inline-block ml-2' aria-hidden='true' />}
                            </button>
                        ))}
                    </div>
                    <button onClick={() => setIsOpen(false)} className='absolute top-2 right-2 h-6 w-6 text-gray-500 cursor-pointer' aria-hidden='true'>
                        <XMarkIcon />
                    </button>
                </div>
            </div>
        </>
    )
}

export { ConsentForm }