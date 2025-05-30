import { MainLayout } from '@/MainLayout'
import { PersonalizationProvider } from '@/context'

export default async function RootLayout ({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <PersonalizationProvider>
            <MainLayout>
                {children}
            </MainLayout>
        </PersonalizationProvider>
    )
}
