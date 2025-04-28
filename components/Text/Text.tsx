import { FunctionComponent } from 'react'
import parse from 'html-react-parser'

import { Text as TextType } from '@/types/components'

/**
 * Text component that renders content with styling
 * @param {Object} props - Component props
 * @param {Object} props.$ - Optional object containing data-cslp attributes
 * @param {string} props.content - The HTML content to be rendered
 * @param {string} props.styles.background_color - Background color option ('primary' or 'secondary')
 * @param {string|number} [props.id] - Optional ID for the text container
 * @returns {JSX.Element} Rendered text component
 */

const Text: FunctionComponent<TextType> = (props: TextType) => {
    const { $, content, id, className } = props

    return (
        content && typeof content === 'string'
            ? <div 
                id={id?.toString()} 
                className={` relative my-25 ${className} mx-[2.25rem] md:mx-[5.25rem] dark:bg-stone`} {...$?.content}> 
                <div className='text md:max-w-[75.84vw] whitespace-break-spaces'>{parse(content)}</div>
            </div> 
            : <></>
    )
}

export { Text }