import { notFound } from 'next/navigation';
import NewsCard from '@/components/NewsCard';

interface INews {
    id: string;
    title: string;
    description: string | null;
    category: string;
    imageUrl: string;
    imageAlt: string;
}

const CategoryNews = async ({ params }: { params: Promise<{ categoryId: string }> }) => {

    const { categoryId } = await params

    const res = await fetch(`https://news-api-v2.vercel.app/api/category/${categoryId}`)

    if (!res.ok) {
        notFound()
    }

    const data = await res.json()

    const categoryNews: INews[] = data.data

    if (!categoryNews || !Array.isArray(categoryNews)) {
        notFound()
    }

    return (
        <div className="py-2">
            <h1 className='my-5 border-b border-red-700 pb-2 text-2xl font-bold'>
                {data.title ?? categoryId}
            </h1>

            <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
                {categoryNews.map(news => <NewsCard key={news.id} news={news} />)}
            </div>
        </div>
    );
};

export default CategoryNews;
