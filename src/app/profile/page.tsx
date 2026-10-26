'use client'

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React, { useState } from "react";

const ProfilePage = () => {

    const { data: session } = authClient.useSession()
    const user = session?.user

    const [show, setShow] = useState(false)

    const handleUpdateProfile = async (e:React.SubmitEvent<HTMLElement>) =>{
        e.preventDefault()
        const formData = new FormData(e.target);
        const newUserData = Object.fromEntries(formData.entries()) as {name:string, image:string}

        await authClient.updateUser({
            ...newUserData
        })
    }

    const handleProfileShow = () => {
        setShow(!show)
    }

    return (
        <div className="mt-5 card bg-base-100">
            <Link href={'/profile'}>
                <div className="avatar flex flex-col items-center gap-2">
                    <div className="ring-primary ring-offset-base-100 w-8 rounded-full ring-2 ring-offset-2">
                        <img alt="Tailwind-CSS-Avatar-component" src={user?.image as string} />
                    </div>
                    <h2>{user?.name}</h2>

                    <p>{user?.email}</p>

                    <button onClick={handleProfileShow} className="btn">Edit Profile</button>
                </div>
            </Link>

            { show && <form onSubmit={handleUpdateProfile}>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                    <label className="label">নাম</label>
                    <input name='name' type="text" className="input w-md" placeholder="নাম" />

                    <label className="label">ছবি</label>
                    <input name='image' type="url" className="input w-md" placeholder="ছবি" />

                    <button type='submit' className="btn bg-red-700 text-white mt-4">আপডেট করুন</button>
                </fieldset>
            </form>}
        </div>
    );
};

export default ProfilePage;