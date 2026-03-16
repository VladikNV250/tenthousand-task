import { Link } from 'react-router'

import { useAppSelector } from '../hooks/redux'
import { selectCount } from '../store/slices/counterSlice'

const About = () => {
    const count = useAppSelector(selectCount)

    return (
        <main className="min-h-screen min-w-screen flex flex-col items-center justify-center gap-4">
            <h1 className="text-4xl font-bold text-yellow-400">About page</h1>
            <p className="text-2xl font-bold">Count: {count}</p>
            <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
                Home
            </Link>
        </main>
    )
}

export default About
