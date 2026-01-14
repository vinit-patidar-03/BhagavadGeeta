import React, { useContext, useEffect } from 'react'
import Context from '../context/Context'
import ChapterCard from '../Components/ChapterCard';
import Loader from '../Components/Loader';

const Chapters = () => {

    const { chapters, setSlokaNo, setChaptNO } = useContext(Context);

    useEffect(() => {
        setSlokaNo(1);
        setChaptNO(0);
    }, [setChaptNO, setSlokaNo])

    return (
        <div className="min-h-screen devotional-bg">
            {/* Hero Section - Simple & Peaceful */}
            <div className="pt-32 md:pt-24 pb-12 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-amber-900">
                        श्रीमद् भगवद्गीता
                    </h1>
                    <p className="text-xl md:text-2xl text-amber-800 font-medium mb-3">
                        The Song of the Divine
                    </p>
                    <p className="text-base md:text-lg text-amber-700 max-w-2xl mx-auto mb-6">
                        Explore the timeless wisdom of the 18 chapters
                    </p>
                    <div className="inline-block bg-white/70 backdrop-blur-sm rounded-full px-6 py-2 shadow-md border border-amber-200">
                        <span className="text-amber-800 font-semibold">18 Chapters • 700 Shlokas</span>
                    </div>
                </div>
            </div>

            {/* Chapters Grid - Simple Layout */}
            <div className='max-w-7xl mx-auto px-4 pb-16'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {
                        chapters &&
                        chapters.map((elem) => {
                            return <ChapterCard chapter={elem} key={elem.id} />
                        })
                    }
                    {
                        !chapters &&
                        <div className="col-span-full">
                            <Loader />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Chapters
