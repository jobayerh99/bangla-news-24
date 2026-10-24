import NewsCard from '@/components/NewsCard';

interface INews {
    id: string;
    title: string;
    description: string;
    category: string;
    imageUrl: string;
    imageAlt: string
}

const CategoryNews = async ({ params }: { params: Promise<{ categoryId: string }> }) => {

    const { categoryId } = await params

    const res = await fetch(`https://news-api-v2.vercel.app/api/category/${categoryId}`)

    const data = await res.json()

    const categoryNews: INews[] = data.data

    return (
        <div>
            <h1 className='text-2xl font-bold border-b border-red-700 my-5'>{data.title}</h1>

            <div className='grid grid-cols-3 gap-5'>
                {categoryNews.map(news => <NewsCard key={news.id} news={news} />)}
            </div>
        </div>
    );
};

export default CategoryNews;