import { Link } from 'react-router'

import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { useGetBooksQuery } from '../services/__generated__/generated'
import { decrement, increment, incrementByAmount, selectCount } from '../store/slices/counterSlice'

const Home = () => {
    const count = useAppSelector(selectCount)
    const dispatch = useAppDispatch()

    const { data, isLoading, error } = useGetBooksQuery()

    return (
        <main className="min-h-screen min-w-screen flex flex-col items-center justify-center gap-4">
            <h1 className="text-4xl font-bold text-yellow-400">Hello World</h1>

            <div className="bg-gray-800 p-6 rounded-lg shadow-xl text-white w-96">
                <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">
                    Books from GraphQL:
                </h2>
                {isLoading && <p className="animate-pulse">Loading books...</p>}
                {error && <p className="text-red-400">Error: {JSON.stringify(error)}</p>}
                <ul className="space-y-2">
                    {data?.books?.map((book) => (
                        <li
                            key={book?.title ?? ''}
                            className="flex flex-col bg-gray-700 p-2 rounded"
                        >
                            <span className="font-bold">{book?.title}</span>
                            <span className="text-sm text-gray-400 italic">by {book?.author}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <p className="text-2xl font-bold">Count: {count}</p>
            <div className="flex gap-2">
                <button
                    onClick={() => dispatch(increment())}
                    className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
                >
                    Increment
                </button>
                <button
                    onClick={() => dispatch(decrement())}
                    className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
                >
                    Decrement
                </button>
                <button
                    onClick={() => dispatch(incrementByAmount(5))}
                    className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
                >
                    Increment by 5
                </button>
            </div>
            <Link to="/about" className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer">
                About
            </Link>
        </main>
    )
}

export default Home
