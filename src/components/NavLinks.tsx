
import Link from "next/link";
import { cacheLife } from "next/cache";

interface Navs {
  slug: string;
  title: string;
  topicId: string | null;
  url: string;
  scrapable: boolean;
}

async function getCategories(): Promise<Navs[]> {
  "use cache";

  cacheLife("hours");

  const res = await fetch(
    "https://news-api-v2.vercel.app/api/categories"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data = await res.json();

  return (data.data as Navs[]).filter((nav) => nav.scrapable);
}

const NavLinks = async () => {
  const filteredNavs = await getCategories();

  return (
    <div className="flex justify-center gap-3 my-3">
      <Link href="/">হোম</Link>

      {filteredNavs.map((nav) => (
        <Link key={nav.slug} href={`/category/${nav.slug}`}>
          {nav.title}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
