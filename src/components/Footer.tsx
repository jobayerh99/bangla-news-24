import Link from "next/link";
import { cacheLife } from "next/cache";

async function getCopyrightYear(): Promise<number> {
    "use cache";

    cacheLife("days");

    return new Date().getFullYear();
}

const Footer = async () => {
    const year = await getCopyrightYear();
    return (
        <footer className="mt-10 bg-neutral-900 text-neutral-300">
            <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-4 py-8 sm:flex-row sm:justify-between">

                {/* brand */}
                <div className="flex flex-col items-center gap-1 sm:items-start">
                    <span className="text-lg font-bold text-red-500">
                        Bangla News 24
                    </span>
                    <p className="text-xs text-neutral-400">
                        সর্বশেষ খবর, প্রতিদিন আপডেটে
                    </p>
                </div>

                {/* quick links */}
                <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
                    <Link href="/" className="transition hover:text-white">
                        হোম
                    </Link>
                    <Link href="/signin" className="transition hover:text-white">
                        সাইন ইন
                    </Link>
                    <Link href="/signup" className="transition hover:text-white">
                        সাইন আপ
                    </Link>
                    <Link href="/profile" className="transition hover:text-white">
                        প্রোফাইল
                    </Link>
                </nav>

                {/* copyright */}
                <p className="text-xs text-neutral-500">
                    © {year} Bangla News 24
                </p>

            </div>
        </footer>
    );
};

export default Footer;
