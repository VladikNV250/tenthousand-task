import './index.css'

import { Provider } from 'react-redux'
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'

import { store } from './store/store'

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
    return <p>Loading...</p>
}
