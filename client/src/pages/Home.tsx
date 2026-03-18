import { Link } from 'react-router'

import { Card } from '@/components/ui'
import { useGetAllFormsQuery } from '@/services/__generated__/graphql'

const Home = () => {
    const { data, isLoading, isError } = useGetAllFormsQuery()

    return (
        <main className="min-h-screen min-w-screen flex flex-col items-center justify-center gap-4">
            <header className="fixed py-4 px-10 top-0 left-0 w-full flex items-center justify-between bg-gray-100">
                <h1 className="text-2xl font-bold text-yellow-400">Home</h1>
                <Link to="/" className="text-black underline px-4 py-2 text-lg cursor-pointer">
                    Home
                </Link>
            </header>
            <div className="flex items-center justify-center flex-col gap-y-8">
                <Link
                    to="/forms/new"
                    className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
                >
                    Create new form
                </Link>
                <div>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : isError ? (
                        <p>Couldn't load forms. Please try again.</p>
                    ) : !data?.forms?.length ? (
                        <p>No forms yet.</p>
                    ) : (
                        <ul className="flex flex-col gap-4">
                            {data?.forms.map((form) => (
                                <li key={form.id}>
                                    <Card>
                                        <Link
                                            to={`/forms/${form.id}`}
                                            className="text-2xl font-bold"
                                        >
                                            {form.title}
                                        </Link>
                                        <p className="text-gray-500">{form.description}</p>

                                        <p>{form.questions.length} questions</p>
                                    </Card>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </main>
    )
}

export default Home
