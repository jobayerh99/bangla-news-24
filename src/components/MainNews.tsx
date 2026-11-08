import Image from 'next/image';
import Link from 'next/link';

interface News {
    id: string;
    title: string;
    description: string | null;
    imageUrl: string;
    imageAlt: string;
    category: string;
}

const MainNews = ({ news }: { news: News[] }) => {

    const [firstNews, ...otherNews] = news

    if (!firstNews) return null;

    return (
        <div className='flex flex-col gap-3 lg:flex-row'>
            <Link href={`/news/${firstNews.id}`} className='group lg:flex-1'>
                <div className='card h-full bg-base-100 shadow-sm transition duration-300 hover:shadow-lg'>
                    <figure className='relative aspect-video overflow-hidden'>
                        <Image
                            src={firstNews.imageUrl}
                            alt={firstNews.imageAlt}
                            fill
                            sizes="(max-width: 1024px) 100vw, 66vw"
                            className='object-cover transition duration-300 group-hover:scale-105'
                        />
                    </figure>

                    <div className='card-body flex flex-col gap-2'>
                        <span className='self-start rounded-full bg-red-700 px-2.5 py-0.5 text-xs font-semibold text-white'>
                            {firstNews.category}
                        </span>

                        <h2 className='card-title text-lg leading-snug transition group-hover:text-red-700 sm:text-xl'>
                            {firstNews.title}
                        </h2>

                        {firstNews.description && (
                            <p className='text-sm text-neutral-600 line-clamp-3'>
                                {firstNews.description}
                            </p>
                        )}
                    </div>
                </div>
            </Link>

            <div className='grid gap-3 sm:grid-cols-2 lg:w-80 lg:shrink-0 lg:grid-cols-1'>
                {otherNews.slice(0, 4).map(on => (
                    <Link
                        href={`/news/${on.id}`}
                        key={on.id}
                        className='group h-full'>
                        <div className='card h-full bg-base-100 border border-neutral-200 p-3 transition duration-300 hover:border-red-700 hover:shadow-sm'>
                            <p className='mb-1 text-xs font-semibold text-red-600'>{on.category}</p>
                            <p className='text-sm leading-snug line-clamp-3 transition group-hover:text-red-700'>
                                {on.title}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default MainNews;
