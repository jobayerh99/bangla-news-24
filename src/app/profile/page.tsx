'use client'

import { authClient } from "@/lib/auth-client";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ProfilePage = () => {

    const { data: session } = authClient.useSession()
    const user = session?.user

    const [show, setShow] = useState(false)

    const handleUpdateProfile = async (e: React.SubmitEvent<HTMLElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        const newUserData = Object.fromEntries(formData.entries()) as { name: string, image: string }

        const { data, error } = await authClient.updateUser({
            ...newUserData
        })

        if (data) {
            toast.success('প্রোফাইল আপডেট হয়েছে')
            setShow(false)
        }

        if (error) {
            toast.error(error.message)
        }
    }

    const handleProfileShow = () => {
        setShow(!show)
    }

    return (
        <div className="mx-auto mt-5 w-full max-w-sm px-4">

            {/* profile info */}
            <div className="card bg-base-100">
                <div className="card-body items-center gap-2 text-center">
                    <div className="avatar">
                        <div className="w-16 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
                            <img alt={user?.name ?? "প্রোফাইল"} src={user?.image as string} />
                        </div>
                    </div>

                    <h2 className="card-title">{user?.name}</h2>
                    <p className="text-sm text-neutral-500">{user?.email}</p>

                    <button onClick={handleProfileShow} className="btn btn-sm mt-2">
                        প্রোফাইল সম্পাদনা
                    </button>
                </div>
            </div>

            {/* edit form */}
            {show && (
                <form onSubmit={handleUpdateProfile} className="mt-4">
                    <fieldset className="fieldset w-full rounded-box border border-base-300 bg-base-200 p-4">
                        <label className="label">নাম</label>
                        <input name='name' type="text" className="input w-full" placeholder="নাম" />

                        <label className="label">ছবি</label>
                        <input name='image' type="url" className="input w-full" placeholder="ছবি" />

                        <div className="mt-4 flex gap-2">
                            <button type='submit' className="btn bg-red-700 text-white">
                                আপডেট করুন
                            </button>
                            <button type='button' onClick={handleProfileShow} className="btn">
                                বাতিল
                            </button>
                        </div>
                    </fieldset>
                </form>
            )}
        </div>
    );
};

export default ProfilePage;
