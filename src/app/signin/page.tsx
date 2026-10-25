import React from 'react';

const SignInPage = () => {
    return (
        <div className='flex flex-col justify-center items-center gap-3 mt-4'>
            <h2 className='text-2xl font-bold text-red-700'>সাইন ইন</h2>
            <form>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">

                    <label className="label">ই-মেইল</label>
                    <input name='email' type="email" className="input w-md" placeholder="ই-মেইল" />

                    <label className="label">পাসওয়ার্ড</label>
                    <input name='password' type="password" className="input w-md" placeholder="পাসওয়ার্ড" />

                    <button className="btn bg-red-700 text-white mt-4">সাইন ইন করুন</button>
                </fieldset>
            </form>
        </div>
    );
};

export default SignInPage;