'use client'

import { authClient } from "@/lib/auth-client";
import Link from "next/link";

const UserInfo = () => {

    const { data: session } = authClient.useSession()
    const user = session?.user

    const handleSignOut = async () => {
        await authClient.signOut()
    }

    return (
        <div className="flex items-center justify-end gap-1 sm:gap-3">

            {
                user ? (
                    <div className="flex justify-center items-center gap-2">
                        <div className="avatar flex flex-col items-center gap-2">
                            <div className="ring-primary ring-offset-base-100 w-8 rounded-full ring-2 ring-offset-2">
                                <img alt="Tailwind-CSS-Avatar-component" src={user?.image as string} />
                            </div>
                            <h2>{user?.name}</h2>
                        </div>

                        <button onClick={handleSignOut} className="btn btn-error btn-xs">Sign Out</button>
                    </div>
                ) : (
                    <div >
                        <Link href={"/signin"}>
                            <button className="btn btn-ghost btn-sm text-neutral-700 hover:text-red-700">
                                সাইন ইন
                            </button>
                        </Link>

                        <Link href={"/signup"}>
                            <button className="btn btn-sm border-0 bg-red-700 px-2 font-semibold text-white hover:bg-red-800 sm:px-3">
                                সাইন আপ
                            </button>
                        </Link>
                    </div>
                )
            }


        </div>
    );
};

export default UserInfo;