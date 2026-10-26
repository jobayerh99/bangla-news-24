'use client'

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import React from "react";

const SignUpPage = () => {

    const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
        e.preventDefault()

        const formData = new FormData(e.target)
        const user = Object.fromEntries(formData.entries()) as { name: string, email: string, image: string, password: string }

        const { data, error } = await authClient.signUp.email({
            ...user,
            callbackURL: "/"
        })

        if (data) {
            redirect("/")
        }
        if (error) {
            console.log(error);
        }

    }

    const handleGoogleSignIn = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
        });
    }

    const handleGithubSignIn = async () => {
        const data = await authClient.signIn.social({
            provider: "github",
        });
    }

    return (
        <div className='flex flex-col justify-center items-center gap-3 mt-4'>
            <h2 className='text-2xl font-bold text-red-700'>সাইন আপ</h2>
            <form onSubmit={onSubmit}>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                    <label className="label">নাম</label>
                    <input name='name' type="text" className="input w-md" placeholder="নাম" />

                    <label className="label">ছবি</label>
                    <input name='image' type="url" className="input w-md" placeholder="ছবি" />

                    <label className="label">ই-মেইল</label>
                    <input name='email' type="email" className="input w-md" placeholder="ই-মেইল" />

                    <label className="label">পাসওয়ার্ড</label>
                    <input name='password' type="password" className="input w-md" placeholder="পাসওয়ার্ড" />

                    <button type='submit' className="btn bg-red-700 text-white mt-4">সাইন আপ করুন</button>
                </fieldset>
            </form>

            <button onClick={handleGoogleSignIn} className='btn'>Sign In With Google</button>
            <button onClick={handleGithubSignIn} className='btn'>Sign In With Github</button>
        </div>
    );
};

export default SignUpPage;