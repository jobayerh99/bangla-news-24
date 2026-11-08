import Image from 'next/image';
import Link from 'next/link';

interface News {
    id: string;
    title: string;
    description: string | null;
    category: string;
    imageUrl: string;
    imageAlt: string;
}

const NewsCard = ({ news }: { news: News }) => {

    return (
        <Link href={`/news/${news.id}`} className="group h-full">
            <div className="card h-full flex flex-col bg-base-100 shadow-sm transition duration-300 hover:shadow-lg">
                <figure className="relative aspect-video overflow-hidden bg-neutral-200">
                    {news.imageUrl && (
                        <Image
                            src={news.imageUrl}
                            alt={news.imageAlt ?? news.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition duration-300 group-hover:scale-105"
                        />
                    )}
                </figure>

                <div className="card-body flex flex-1 flex-col gap-2 p-4">
                    <span className="self-start rounded-full bg-red-700 px-2.5 py-0.5 text-xs font-semibold text-white">
                        {news.category}
                    </span>

                    <h2 className="card-title text-base leading-snug line-clamp-2 transition group-hover:text-red-700">
                        {news.title}
                    </h2>

                    {news.description && (
                        <p className="text-sm text-neutral-600 line-clamp-2">
                            {news.description}
                        </p>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default NewsCard;
