
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
    <nav className="my-3">
      <div className="flex gap-x-4 gap-y-1 overflow-x-auto whitespace-nowrap px-1 py-1 text-sm font-medium text-neutral-700 [scrollbar-width:none] sm:flex-wrap sm:justify-center sm:overflow-x-visible [&::-webkit-scrollbar]:hidden">
        <Link
          href="/"
          className="shrink-0 transition hover:text-red-700"
        >
          হোম
        </Link>

        {filteredNavs.map((nav) => (
          <Link
            key={nav.slug}
            href={`/category/${nav.slug}`}
            className="shrink-0 transition hover:text-red-700"
          >
            {nav.title}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavLinks;
