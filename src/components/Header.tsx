
import Image from 'next/image';

import NavLinks from './NavLinks';

const Header = () => {

 

    return (


        <header className="px-4 py-4">
            <div className="mx-auto max-w-7xl grid grid-cols-3 items-center">

                {/* Left empty space */}
                <div />

                {/* Center: Logo and Website Name */}
                <div className="flex items-center justify-center gap-2">
                    <Image
                        src="/logo.webp"
                        alt="Bangla News 24"
                        width={40}
                        height={40}
                        priority
                    />

                    <div className="flex flex-col items-center">
                        <span className="whitespace-nowrap text-xl font-bold text-red-700 sm:text-2xl">
                            Bangla News 24
                        </span>

                        {/* <span className="whitespace-nowrap text-xs text-neutral-500">
                            {date}
                        </span> */}
                    </div>
                </div>

                {/* Right: Authentication Buttons */}
                <div className="flex items-center justify-end gap-1 sm:gap-3">
                    <button className="btn btn-ghost btn-sm text-neutral-700 hover:text-red-700">
                        সাইন ইন
                    </button>

                    <button className="btn btn-sm border-0 bg-red-700 px-2 font-semibold text-white hover:bg-red-800 sm:px-3">
                        সাইন আপ
                    </button>
                </div>
            </div>

            <NavLinks></NavLinks>

        </header>
    );
};

export default Header;