import MainNews from "@/components/MainNews";
import MostRead from "@/components/MostRead";
import NewsCard from "@/components/NewsCard";

interface IOtherSection {
  curationId: string;
  title: string;
  articles: {
    id: string;
    title: string;
    description: string | null;
    category: string;
    imageUrl: string;
    imageAlt: string;
  }[];
}


export default async function Home() {

  const res = await fetch('https://news-api-v2.vercel.app/api/news/sections')

  if (!res.ok) {
    return (
      <div className="py-20 text-center text-neutral-500">
        খবর আনা যায়নি। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।
      </div>
    )
  }

  const data = await res.json()
  const sections = data.data

  if (!Array.isArray(sections) || sections.length === 0) {
    return (
      <div className="py-20 text-center text-neutral-500">
        এই মুহূর্তে কোনো খবর পাওয়া যায়নি।
      </div>
    )
  }

  const mainNews = sections[0].articles ?? []

  const otherSections: IOtherSection[] = sections.slice(1)



  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

      {/* news section */}
      <div className="pt-3 lg:col-span-2">
        <MainNews news={mainNews} />

        <div className="mt-5 grid gap-5">
          {otherSections.map(os => (
            <div key={os.curationId}>
              <h2 className="border-b-2 border-red-700 pb-2 font-bold">
                {os.title}
              </h2>

              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {os.articles?.map((news) => <NewsCard key={news.id} news={news} />)}
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* most read section */}
      <div className="pt-3">
        <MostRead />
      </div>
    </div>
  );
}
