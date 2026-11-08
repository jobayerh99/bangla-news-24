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
                    <div className="flex items-center justify-center gap-2">
                        <Link href={'/profile'} className="flex items-center gap-2">
                            <div className="avatar">
                                <div className="w-8 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
                                    <img alt={user?.name ?? "প্রোফাইল"} src={user?.image as string} />
                                </div>
                            </div>
                            <h2 className="hidden text-sm sm:block">{user?.name}</h2>
                        </Link>

                        <button onClick={handleSignOut} className="btn btn-error btn-xs">
                            সাইন আউট
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-1 sm:gap-2">
                        <Link href={"/signin"}>
                            <button className="btn btn-ghost btn-xs text-neutral-700 hover:text-red-700 sm:btn-sm">
                                সাইন ইন
                            </button>
                        </Link>

                        <Link href={"/signup"}>
                            <button className="btn btn-xs bg-red-700 px-2 font-semibold text-white hover:bg-red-800 sm:btn-sm sm:px-3">
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
