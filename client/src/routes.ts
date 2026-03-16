import { index, route, type RouteConfig } from '@react-router/dev/routes'

export default [
    index('./pages/Home.tsx'),
    route('about', './pages/About.tsx'),
] satisfies RouteConfig
