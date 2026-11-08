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
        <div className='mt-4 flex flex-col items-center justify-center gap-3 px-4'>
            <h2 className='text-2xl font-bold text-red-700'>সাইন ইন</h2>
            <form onSubmit={onSubmit} className='w-full max-w-sm'>
                <fieldset className="fieldset w-full rounded-box border border-base-300 bg-base-200 p-4">

                    <label className="label">ই-মেইল</label>
                    <input name='email' type="email" className="input w-full" placeholder="ই-মেইল" />

                    <label className="label">পাসওয়ার্ড</label>
                    <input name='password' type="password" className="input w-full" placeholder="পাসওয়ার্ড" />

                    <button type='submit' className="btn mt-4 bg-red-700 text-white">সাইন ইন করুন</button>
                </fieldset>
            </form>

            <div className='flex w-full max-w-sm flex-col gap-2'>
                <button onClick={handleGoogleSignIn} className='btn'>Sign In With Google</button>
                <button onClick={handleGithubSignIn} className='btn'>Sign In With Github</button>
            </div>
        </div>
    );
};

export default SignInPage;