
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import { cacheLife } from "next/cache";
import Link from "next/link";

interface Headlines {
    id: string;
    title: string;
}

async function getHeadlines(): Promise<Headlines[]> {
    "use cache";

    cacheLife("hours");

    const res = await fetch(
        "https://news-api-v2.vercel.app/api/news?limit=10"
    );

    if (!res.ok) {
        throw new Error("Failed to fetch news headlines");
    }

    const data = await res.json();

    return data.data as Headlines[];
}

const Marquee = async () => {
    const headlines = await getHeadlines();

    return (
        <div className="bg-red-600 text-white">
            <div className="flex max-w-7xl mx-auto">
                <div className="bg-red-700 text-white py-1 px-5 font-bold">
                    সর্বশেষ
                </div>

                <MarqueeText
                    className="py-1"
                    direction="right"
                    duration={10}
                >
                    {headlines.map((headline) => (
                        <span key={headline.id}>
                            <Link href={`/news/${headline.id}`}>{headline.title}</Link>
                            <span className="mx-5">•</span>
                        </span>
                    ))}
                </MarqueeText>
            </div>
        </div>
    );
};

export default Marquee;
