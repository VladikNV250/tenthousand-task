import { HomeHeader, RecentForms, TemplateGallery } from '@/components/home'
import { useGetAllFormsQuery } from '@/services/__generated__/graphql'

const Home = () => {
    const { data, isLoading, isError } = useGetAllFormsQuery()

    return (
        <main className="min-h-screen min-w-screen flex flex-col bg-white">
            <HomeHeader />
            <TemplateGallery />
            <RecentForms forms={data?.forms} isLoading={isLoading} isError={isError} />
        </main>
    )
}

export default Home
