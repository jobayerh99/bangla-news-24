import NotFound from '@/app/not-found';
import React from 'react';

const NewsDetails = async({params} : {params : {newsId:string}}) => {

    const {newsId} = await params

    const res = await fetch(`https://news-api-v2.vercel.app/api/article/${newsId}`)

    const data = await res.json()
    const news = data.data

    if(!news){
        NotFound()
    }

    return (
        <div>
            <h1>{news.title}</h1>

            <p>{news.text}</p>
            
        </div>
    );
};

export default NewsDetails;