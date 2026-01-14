import React, { useCallback, useContext, useEffect, useState } from 'react'
import fetchChapters from '../API/BhagvatGitaAPI'
import { useParams } from 'react-router-dom'
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import ShlokaCard from '../Components/ShlokaCard';
import Loader from '../Components/Loader';
import Context from '../context/Context';

const ChapterDetails = () => {
    const { slokaNO, setSlokaNo, setChaptNO } = useContext(Context);
    const { CNO } = useParams();
    const [shlokas, setShlokas] = useState();
    const [chapterdetails, setChapterdetails] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchChapterData = useCallback(() => {
        setLoading(true);
        fetchChapters(`${CNO}/verses/${parseInt(slokaNO)}/`).then((res) => {
            setShlokas(res.data);
            setLoading(false);
        })
    }, [CNO, slokaNO])

    const fetchChapterDetails = useCallback(() => {
        fetchChapters(`${CNO}/`).then((res) => {
            setChapterdetails(res.data)
        })
    }, [CNO])

    useEffect(() => {
        fetchChapterData();
        fetchChapterDetails();
        setChaptNO(CNO);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [CNO, fetchChapterData, fetchChapterDetails, setChaptNO, slokaNO])

    const handleSNO = (e) => {
        if (e === 'incr' && parseInt(slokaNO) !== shlokas.length - 1) {
            setSlokaNo(parseInt(slokaNO) + 1);
        } else if (e === 'decr' && parseInt(slokaNO) !== 1) {
            setSlokaNo(parseInt(slokaNO) - 1);
        }
    }

    return (
        <div className="min-h-screen devotional-bg pt-32 md:pt-24 pb-10">
            {loading ? (
                <div className="flex justify-center items-center min-h-[60vh]">
                    <Loader />
                </div>
            ) : (
                shlokas &&
                <div className="max-w-7xl mx-auto animate-fade-in delay-200">
                    <ShlokaCard Shloka={shlokas} chapterDetails={chapterdetails} />

                    <div className='flex justify-between items-center my-8 max-w-2xl mx-auto'>
                        <button
                            className='flex items-center px-6 py-3 bg-white border-2 border-amber-200 text-gray-700 rounded-full shadow-md hover:shadow-xl hover:bg-gradient-to-r hover:from-amber-50 hover:to-yellow-50 hover:text-amber-700 hover:border-amber-300 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed'
                            onClick={() => { handleSNO('decr') }}
                            disabled={parseInt(slokaNO) === 1}
                        >
                            <GrFormPreviousLink className="text-2xl mr-2 group-hover:-translate-x-1 transition-transform" />
                            <span className="font-semibold">Previous Shloka</span>
                        </button>

                        <button
                            className='flex items-center px-6 py-3 bg-white border-2 border-amber-200 text-gray-700 rounded-full shadow-md hover:shadow-xl hover:bg-gradient-to-r hover:from-amber-50 hover:to-yellow-50 hover:text-amber-700 hover:border-amber-300 transition-all duration-300 group'
                            onClick={() => { handleSNO('incr') }}
                        >
                            <span className="font-semibold">Next Shloka</span>
                            <GrFormNextLink className="text-2xl ml-2 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ChapterDetails
