import './index.css'

import { Provider } from 'react-redux'
import { Links, Meta, type MetaFunction, Outlet, Scripts, ScrollRestoration } from 'react-router'

import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

import { store } from './store/store'

// eslint-disable-next-line react-refresh/only-export-components
export const meta: MetaFunction = () => {
    return [
        { title: 'Ten Thousand Forms' },
        { name: 'description', content: 'A simple Google Forms clone.' },
    ]
}

export const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body className="antialiased min-h-screen">
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    )
}

const Root = () => (
    <Provider store={store}>
        <Outlet />
    </Provider>
)

export default Root

export const HydrateFallback = () => {
    return <LoadingSpinner className="min-h-screen" />
}
