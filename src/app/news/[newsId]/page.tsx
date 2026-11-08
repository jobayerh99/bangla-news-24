import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface BodyBlock {
    type: string;
    text?: string;
    url?: string;
    width?: number;
    height?: number;
    caption?: string;
    altText?: string;
    copyrightHolder?: string;
}

interface ArticleDetail {
    id: string;
    title: string;
    imageUrl?: string | null;
    imageAlt?: string | null;
    firstPublished?: string | null;
    lastPublished?: string | null;
    body?: BodyBlock[];
    text?: string;
    tags?: string[];
    source?: string;
    sourceUrl?: string;
    wordCount?: number;
}

const formatBengaliDate = (iso?: string | null) => {
    if (!iso) return null;

    try {
        return new Date(iso).toLocaleDateString('bn-BD', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    } catch {
        return null;
    }
};

const ArticleBody = ({ blocks }: { blocks: BodyBlock[] }) => (
    <div className="space-y-5">
        {blocks.map((block, i) => {
            if (block.type === 'text' && block.text) {
                return (
                    <p key={i} className="text-[1.05rem] leading-relaxed text-neutral-800">
                        {block.text}
                    </p>
                );
            }

            if (block.type === 'subheading' && block.text) {
                return (
                    <h2 key={i} className="mt-8 border-l-4 border-red-700 pl-3 text-xl font-bold text-neutral-900">
                        {block.text}
                    </h2>
                );
            }

            if (block.type === 'image' && block.url) {
                return (
                    <figure key={i} className="my-6">
                        <div className="relative aspect-video overflow-hidden rounded-lg">
                            <Image
                                src={block.url}
                                alt={block.altText ?? block.caption ?? ''}
                                fill
                                sizes="(max-width: 768px) 100vw, 768px"
                                className="object-cover"
                            />
                        </div>
                        {(block.caption || block.copyrightHolder) && (
                            <figcaption className="mt-2 text-sm text-neutral-500">
                                {block.caption}
                                {block.copyrightHolder && (
                                    <span className="text-neutral-400"> — {block.copyrightHolder}</span>
                                )}
                            </figcaption>
                        )}
                    </figure>
                );
            }

            return null;
        })}
    </div>
);

const PlainTextBody = ({ text }: { text: string }) => (
    <div className="space-y-5">
        {text
            .split(/\n+/)
            .map(paragraph => paragraph.trim())
            .filter(Boolean)
            .map((paragraph, i) => (
                <p key={i} className="text-[1.05rem] leading-relaxed text-neutral-800">
                    {paragraph}
                </p>
            ))}
    </div>
);

const NewsDetails = async ({ params }: { params: Promise<{ newsId: string }> }) => {

    const { newsId } = await params

    const res = await fetch(`https://news-api-v2.vercel.app/api/article/${newsId}`)

    if (!res.ok) {
        notFound()
    }

    const data = await res.json()
    const news: ArticleDetail | undefined = data.data

    if (!news || !news.title) {
        notFound()
    }

    const publishedDate = formatBengaliDate(news.firstPublished)
    const readingMinutes = news.wordCount
        ? Math.max(1, Math.round(news.wordCount / 180))
        : null

    const paragraphs = news.text
        ?.split(/\n+/)
        .map(p => p.trim())
        .filter(Boolean) ?? []

    return (
        <article className="mx-auto max-w-3xl px-1 py-6">

            {/* back link */}
            <Link
                href="/"
                className="inline-flex items-center gap-1 text-sm text-red-700 transition hover:underline"
            >
                <span aria-hidden="true">←</span> হোম
            </Link>

            {/* tags */}
            {news.tags && news.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                    {news.tags.map(tag => (
                        <span
                            key={tag}
                            className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            {/* title */}
            <h1 className="mt-3 text-2xl font-bold leading-snug text-neutral-900 sm:text-3xl">
                {news.title}
            </h1>

            {/* meta */}
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 border-b border-neutral-200 pb-4 text-sm text-neutral-500">
                {news.source && <span>{news.source}</span>}
                {publishedDate && <span>{publishedDate}</span>}
                {readingMinutes && <span>{readingMinutes} মিনিট পাঠ</span>}
            </div>

            {/* hero image */}
            {news.imageUrl && (
                <div className="relative mt-5 aspect-video overflow-hidden rounded-lg">
                    <Image
                        src={news.imageUrl}
                        alt={news.imageAlt ?? news.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 768px"
                        className="object-cover"
                        preload
                    />
                </div>
            )}

            {/* body */}
            <div className="mt-6">
                {news.body && news.body.length > 0 ? (
                    <ArticleBody blocks={news.body} />
                ) : paragraphs.length > 0 ? (
                    <PlainTextBody text={news.text as string} />
                ) : (
                    <p className="text-neutral-500">
                        এই সংবাদের বিস্তারিত অংশ পাওয়া যায়নি।
                    </p>
                )}
            </div>

            {/* original source */}
            {news.sourceUrl && (
                <div className="mt-8 border-t border-neutral-200 pt-5">
                    <a
                        href={news.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800"
                    >
                        মূল সংবাদ পড়ুন
                        <span aria-hidden="true">↗</span>
                    </a>
                </div>
            )}
        </article>
    );
};

export default NewsDetails;
