'use client'

import { authClient } from '@/lib/auth-client';
import React from 'react';
import { toast } from 'react-toastify';

const SignInPage = () => {

    const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
        e.preventDefault();

        const formData = new FormData(e.target)
        const user = Object.fromEntries(formData.entries()) as { email: string, password: string }

        const { data, error } = await authClient.signIn.email({
            ...user,
            callbackURL: "/"
        })

        if (data) {
            toast.success('Log In Successfully')
        }

        if (error) {
            toast.error(error.message)
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
            <h2 className='text-2xl font-bold text-red-700'>সাইন ইন</h2>
            <form onSubmit={onSubmit}>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">

                    <label className="label">ই-মেইল</label>
                    <input name='email' type="email" className="input w-md" placeholder="ই-মেইল" />

                    <label className="label">পাসওয়ার্ড</label>
                    <input name='password' type="password" className="input w-md" placeholder="পাসওয়ার্ড" />

                    <button type='submit' className="btn bg-red-700 text-white mt-4">সাইন ইন করুন</button>
                </fieldset>
            </form>

            <button onClick={handleGoogleSignIn} className='btn'>Sign In With Google</button>
            <button onClick={handleGithubSignIn} className='btn'>Sign In With Github</button>
        </div>
    );
};

export default SignInPage;