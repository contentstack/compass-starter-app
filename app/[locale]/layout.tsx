import type { Metadata } from 'next'
import { Inter, Roboto_Condensed } from 'next/font/google'

import { MainLayout } from '@/MainLayout'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '../globals.css'
import '/node_modules/flag-icons/css/flag-icons.min.css'
import { PersonalizationProvider } from '@/context'

const inter = Inter({ subsets: ['latin'] })

/* https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap */
const robotoCondensed = Roboto_Condensed({
    subsets: ['latin'],
    weight: ['200', '300', '400', '500', '600', '700'],
    style: ['normal', 'italic']
})

export const metadata: Metadata = {
    title: 'Compass starter',
    description: 'Provided by Contentstack'
}

/**
 * @component RootLayout 
 * @description default layout component of the app
 * 
 * @returns {JSX.Element}
*/
export default async function RootLayout ({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang='en'>
            <body
                className={`${robotoCondensed.className} ${inter.className}`}
            >
                <PersonalizationProvider>
                    <MainLayout>
                        {children}
                    </MainLayout>
                </PersonalizationProvider>
            </body>
        </html>
    )
}
