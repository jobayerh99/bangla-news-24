import Link from "next/link";

interface MostReadNews {
    id: string,
    title: string
}

const MostRead = async () => {

    const res = await fetch('https://news-api-v2.vercel.app/api/news/most-read')

    if (!res.ok) {
        return null
    }

    const data = await res.json()
    const news: MostReadNews[] = data.data

    if (!Array.isArray(news) || news.length === 0) {
        return null
    }

    return (
        <div className="card border border-neutral-200 bg-base-100 p-4">

            <h2 className="mb-1 border-b-2 border-red-700 pb-2 text-lg font-bold text-red-700">
                সর্বাধিক পঠিত
            </h2>

            <div className="divide-y divide-neutral-100">
                {news.map((n, i) => (
                    <Link
                        href={`/news/${n.id}`}
                        key={n.id}
                        className="group flex items-start gap-3 py-2.5"
                    >
                        <span className="text-xl font-bold text-red-600 transition group-hover:text-red-800">
                            {i + 1}
                        </span>
                        <h3 className="text-sm leading-snug text-neutral-800 transition group-hover:text-red-700">
                            {n.title}
                        </h3>
                    </Link>
                ))}
            </div>

        </div>
    );
};

export default MostRead;
