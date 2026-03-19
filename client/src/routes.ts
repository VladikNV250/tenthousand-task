import { index, route, type RouteConfig } from '@react-router/dev/routes'

export default [
    index('./pages/Home.tsx'),
    route('/forms/new', './pages/FormBuilder.tsx'),
    route('/forms/:id/fill', './pages/FormFiller.tsx'),
] satisfies RouteConfig
