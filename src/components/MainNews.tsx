import Image from 'next/image';

interface News {
    id : string,
    title : string,
    description : string,
    imageUrl : string,
    imageAlt : string,
    category : string
}

const MainNews = ({ news } : {news : News[]}) => {

    const [firstNews, ...otherNews] = news

    return (
        <div className='flex gap-2'>
            <div className="card bg-base-100 w-96 shadow-sm">
                <figure>
                    <Image
                        src={firstNews.imageUrl}
                        alt={firstNews.imageAlt}
                        height={600}
                        width={600}
                    />
                </figure>
                <div className="card-body">
                    <p className='text-red-600 font-semibold'>{firstNews.category}</p>
                    <h2 className="card-title">{firstNews.title}</h2>
                    <p>{firstNews.description}</p>

                </div>
            </div>


            <div className='grid gap-2'>
                {otherNews.slice(0,4).map(on => (
                    <div 
                    className='card bg-base-100 border border-gray-300 p-2'
                    key={on.id}>
                        <p className='text-red-600 font-semibold'>{on.category}</p>
                        <div>{on.title}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MainNews;