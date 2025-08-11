/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from 'react'
import parse from 'html-react-parser'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { UserFormModal as UserFormModalProps } from '@/types/common'

const UserFormModal: React.FC<UserFormModalProps> = (props: UserFormModalProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [checkboxChecked, setCheckboxChecked] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [submissionSuccess, setSubmissionSuccess] = useState(false)
    const modalRef = useRef<HTMLDivElement>(null)

    const { $, display_button, icon, heading, cookies_consent, form } = props || {}
    const { $: form_$, fields, user_consent_text, submit } = form || {}

    const openModal = () => {
        setIsModalOpen(true)
        setSubmitting(false)
        setSubmissionSuccess(false)
        setCheckboxChecked(false)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!checkboxChecked) {
            return
        }

        setSubmitting(true)

        const formData = new FormData(event.currentTarget)
        const formObject: Record<string, string | boolean> = {}

        formData.forEach((value, key) => {
            formObject[key] = value.toString()
        })

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (typeof jstag !== 'undefined') jstag?.send?.({ ...formObject, status: 'known' })

        event.currentTarget.reset()

        setTimeout(() => {
            setSubmitting(false)
            setSubmissionSuccess(true)

            setCheckboxChecked(false)

            setTimeout(() => {
                setIsModalOpen(false)
                document.cookie = 'lytics_user_status=known; path=/;'
            }, 2000)

            setTimeout(() => {
                setSubmissionSuccess(false)
            }, 2500)
        }, 1500)
    }

    useEffect(() => {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                setIsModalOpen(false)
            }
        })
    }, [isModalOpen])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setIsModalOpen(false)
            }
        }

        if (isModalOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isModalOpen])

    if (typeof document !== 'undefined' && document.cookie.indexOf('lytics_user_status=known') !== -1) {
        return null
    }

    const handleInvalid = (event: React.FormEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement

        target.setCustomValidity('')
        if (target.validity.patternMismatch || !target.validity.valid) {
            target.setCustomValidity(target.title)
        }
    }

    return (
        <>
            {!isModalOpen && display_button && (
                <button
                    onClick={openModal}
                    className='z-50 fixed bottom-[30px] left-[80px] px-4 py-2 bg-[#6c5ce7] text-white rounded cursor-pointer font-bold'
                    {...$?.display_button}
                >
                    {display_button}
                </button>
            )}

            <div
                ref={modalRef}
                className={`z-[51] fixed bottom-[30px] left-[30px] w-[90%] md:w-[70%] lg:w-[40%] bg-stone shadow-lg rounded-lg
                py-[20px] px-[30px] md:py-[34px] md:px-[54px] checkbox-animation
                flex flex-col justify-between dark transition-all duration-300 ${isModalOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none hidden'
        }`}
            >
                <button onClick={() => setIsModalOpen(false)} className='absolute top-2 right-2 h-8 w-8 md:h-10 md:w-10 text-gray-500 cursor-pointer' aria-hidden='true'>
                    <XMarkIcon />
                </button>

                {cookies_consent && ((document.cookie.indexOf('cookie_consent=optIn') === -1) && (cookies_consent.heading || cookies_consent.message)) ? (
                    <div className='flex flex-col items-center justify-center h-full text-center py-10'>
                        {cookies_consent?.icon?.url ? (
                            <img
                                src={cookies_consent.icon.url}
                                alt={'User Form Icon'}
                                className='w-[50px] h-[50px] md:w-[76.82px] md:h-[76.82px] md:mb-[35px]'
                                {...cookies_consent.icon.$?.url}
                            />
                        ) : (
                            <svg width='100' height='100' viewBox='0 0 100 100'>
                                <path d='M50 10 C 27.9 10 10 27.9 10 50 C 10 72.1 27.9 90 50 90 C 72.1 90 90 72.1 90 50
                                C 90 35 82 22 70 15 A 25 25 0 0 1 50 10 Z M 65 60 A 5 5 0 1 1 65 70 A 5 
                                5 0 0 1 65 60 Z M 45 45 A 5 5 0 1 1 45 55 A 5 5 0 0 1 45 45 Z M 70 30 A 5 5 0 1 1 70 40 A 5 5 0 0 1 70 30Z'
                                fill='saddlebrown' />
                            </svg>
                        )}
                        {cookies_consent?.heading && <h3 className='text-white text-3xl font-bold mt-4 animate-fade-in-up before:hidden' {...cookies_consent?.$?.heading}>
                            {cookies_consent.heading}
                        </h3>}
                        {cookies_consent?.message && <p className='text-white mt-2 animate-fade-in-up' {...cookies_consent?.$?.message}>
                            {cookies_consent.message}
                        </p>}
                    </div>
                ) : submissionSuccess ? (
                    <div className='flex flex-col items-center justify-center h-full text-center py-10'>
                        <CheckCircleIcon className='h-24 w-24 text-white animate-fade-in-up' />
                        <h3 className='text-white text-2xl font-bold mt-4 animate-fade-in-up before:hidden' {...submit?.$?.submitted_heading}>
                            {submit?.submitted_heading}
                        </h3>
                        <p className='text-white mt-2 animate-fade-in-up' {...submit?.$?.submitted_message}>
                            {submit?.submitted_message}
                        </p>
                    </div>
                ) : (
                    <>
                        {icon && (
                            <img
                                src={icon.url}
                                alt={'User Form Icon'}
                                className='w-[50px] h-[50px] lg:w-[76.82px] lg:h-[76.82px] lg:mb-[35px]'
                                {...icon.$?.url}
                            />
                        )}
                        {heading && (
                            <h2 className='text-white text-3xl lg:text-4xl my-4 lg:my-0 mb-[15px] lg:mb-[30.0px] before:hidden' data-id='h2-text' {...$?.heading}>
                                {heading}
                            </h2>
                        )}
                        <form className='mb-[15px] md:mb-[30.3px]' onSubmit={handleSubmit} lang='fr'>
                            {fields && fields.length > 0
                                && fields.map((field, index) => (
                                    <div key={index} className='mb-[10px] md:mb-[20px]'>
                                        {field?.name && <label
                                            className='block text-white mb-1 uppercase text-xs font-[700] font-inter md:mb-2 md:text-sm'
                                            htmlFor={field.name}
                                            data-id='label-text'
                                            {...field?.$?.label}
                                        >
                                            {field.label}
                                            {field?.required && <span className='ml-1'>*</span>}
                                        </label>}
                                        {field?.type && <input
                                            type={field.type || 'text'}
                                            name={
                                                field?.name
                                                    ? field.name
                                                    : field?.label
                                                        ? field?.label?.toLowerCase().replace(/\s/g, '_')
                                                        : `field_${index}`
                                            }
                                            placeholder={field?.placeholder || ''}
                                            required={field?.required || false}
                                            className='w-full px-2 py-1 border border-gray-300 rounded text-sm md:px-3 md:py-2 md:text-base focus:border-blue-500 focus:border-4 focus:outline-none'
                                            disabled={submitting}
                                            onChange={handleInvalid}
                                            {...(field?.pattern && { pattern: field.pattern })}
                                            {...(field?.message && { title: field.message })}
                                            {...field?.$?.placeholder}
                                            onInvalid={handleInvalid}
                                        />}
                                    </div>
                                ))}
                            {user_consent_text && (
                                <div className='mb-[15px] flex items-start space-x-1 md:mb-[35.63px] md:space-x-2' {...form_$?.user_consent_text}>
                                    <input
                                        type='checkbox'
                                        className='mt-1 rounded border-white bg-stone md:mt-[7px]'
                                        checked={checkboxChecked}
                                        onChange={() => setCheckboxChecked(!checkboxChecked)}
                                        disabled={submitting}
                                    />
                                    <label className='text-white m-0 p-0 text-xs user-form-consent md:text-base'>
                                        {parse(user_consent_text)}
                                    </label>
                                </div>
                            )}
                            {submit?.submit_button_text && (
                                <button
                                    type='submit'
                                    className={`btn-primary text-sm px-4 py-2 md:text-base md:px-6 md:py-3 focus:outline-8 focus:border-8    ${!checkboxChecked || submitting ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                    disabled={!checkboxChecked || submitting}   
                                    {...(submitting ? submit?.$?.submitting_button_text : submit?.$?.submit_button_text)}
                                >
                                    {submitting ? submit?.submitting_button_text : submit?.submit_button_text}
                                </button>
                            )}
                        </form>
                    </>
                )}
            </div>
        </>
    )
}

export { UserFormModal }