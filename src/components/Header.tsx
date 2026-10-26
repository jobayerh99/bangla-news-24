
import Image from 'next/image';

import NavLinks from './NavLinks';
import UserInfo from './UserInfo';

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
                
                <UserInfo></UserInfo>

            </div>

            <NavLinks></NavLinks>

        </header>
    );
};

export default Header;