'use client'

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const SignUpPage = () => {

    const router = useRouter()

    const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
        e.preventDefault()

        const formData = new FormData(e.target)
        const user = Object.fromEntries(formData.entries()) as { name: string, email: string, image: string, password: string }

        const { data, error } = await authClient.signUp.email({
            ...user,
            callbackURL: "/"
        })

        if (data) {
            toast.success('সাইন আপ সফল হয়েছে')
            router.push("/")
        }
        if (error) {
            toast.error(error.message)
        }

    }

    const handleGoogleSignIn = async () => {
        await authClient.signIn.social({
            provider: "google",
        });
    }

    const handleGithubSignIn = async () => {
        await authClient.signIn.social({
            provider: "github",
        });
    }

    return (
        <div className='mt-4 flex flex-col items-center justify-center gap-3 px-4'>
            <h2 className='text-2xl font-bold text-red-700'>সাইন আপ</h2>
            <form onSubmit={onSubmit} className='w-full max-w-sm'>
                <fieldset className="fieldset w-full rounded-box border border-base-300 bg-base-200 p-4">
                    <label className="label">নাম</label>
                    <input name='name' type="text" className="input w-full" placeholder="নাম" />

                    <label className="label">ছবি</label>
                    <input name='image' type="url" className="input w-full" placeholder="ছবি" />

                    <label className="label">ই-মেইল</label>
                    <input name='email' type="email" className="input w-full" placeholder="ই-মেইল" />

                    <label className="label">পাসওয়ার্ড</label>
                    <input name='password' type="password" className="input w-full" placeholder="পাসওয়ার্ড" />

                    <button type='submit' className="btn mt-4 bg-red-700 text-white">সাইন আপ করুন</button>
                </fieldset>
            </form>

            <div className='flex w-full max-w-sm flex-col gap-2'>
                <button onClick={handleGoogleSignIn} className='btn'>Sign In With Google</button>
                <button onClick={handleGithubSignIn} className='btn'>Sign In With Github</button>
            </div>
        </div>
    );
};

export default SignUpPage;
