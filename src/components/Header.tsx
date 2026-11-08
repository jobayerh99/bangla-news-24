
import Image from 'next/image';

import NavLinks from './NavLinks';
import UserInfo from './UserInfo';

const Header = () => {

    return (

        <header className="px-4 py-4">
            <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-2">

                {/* Left empty space (keeps the logo centered) */}
                <div />

                {/* Center: Logo and Website Name */}
                <div className="flex items-center justify-center gap-2">
                    <Image
                        src="/logo.webp"
                        alt="Bangla News 24"
                        width={40}
                        height={40}
                        preload
                        className="h-8 w-8 sm:h-10 sm:w-10"
                    />

                    <div className="flex flex-col items-center">
                        <span className="whitespace-nowrap text-lg font-bold text-red-700 sm:text-2xl">
                            Bangla News 24
                        </span>

                        {/* <span className="whitespace-nowrap text-xs text-neutral-500">
                            {date}
                        </span> */}
                    </div>
                </div>

                {/* Right: Authentication Buttons */}
                <UserInfo />

            </div>

            <NavLinks />

        </header>
    );
};

export default Header;
