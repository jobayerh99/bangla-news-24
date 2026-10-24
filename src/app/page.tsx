import MainNews from "@/components/MainNews";
import MostRead from "@/components/MostRead";
import NewsCard from "@/components/NewsCard";

interface IOtherSection {
  curationId: string;
  title: string;
  articles: {
    id: string;
    title: string;
    description: string;
    category: string;
    imageUrl: string;
    imageAlt: string;
  }[];
}


export default async function Home() {

  const res = await fetch('https://news-api-v2.vercel.app/api/news/sections')
  const data = await res.json()
  const sections = data.data
  const mainNews = sections[0].articles

  const otherSections:IOtherSection[] = sections.slice(1)



  return (
    <div >
      
      <div className="grid grid-cols-3  gap-2">
        {/* news section */}
        <div className="col-span-2 pt-3">
          <MainNews news={mainNews} />

          <div className="grid gap-5 mt-5">
            {otherSections.map(os => <div key={os.curationId}>
              <h1 className="font-bold border-b-2 border-red-700 pb-2">{os.title}</h1>

              <div className="grid mt-3 grid-cols-3 gap-3">
                {os.articles.map((news) => <NewsCard key={news.id} news={news} />)}
              </div>

            </div>)}
          </div>
        </div>

        {/* most read section */}
        <div className="col-span-1 pt-3">
              <MostRead/>
        </div>
      </div>
    </div>
  );
}
