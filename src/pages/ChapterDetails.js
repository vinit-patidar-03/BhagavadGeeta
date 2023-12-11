/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import fetchChapters from '../API/BhagvatGitaAPI'
import { useParams } from 'react-router-dom'
import ChapterDetailsCard from '../Components/ChapterDetailsCard';
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import ShlokaCard from '../Components/ShlokaCard';
import Context from '../context/Context';

const ChapterDetails = () => {
    const { slokaNO, setSlokaNo } = useContext(Context);
    const { CNO } = useParams();
    const [shlokas, setShlokas] = useState();
    const [chapterdetails, setChapterdetails] = useState('');

    useEffect(() => {
        fetchChapterData();
        fetchChapterDetails();
    }, [CNO, slokaNO])

    const fetchChapterData = () => {
        fetchChapters(`${CNO}/verses/${parseInt(slokaNO)}/`).then((res) => {
            setShlokas(res.data);
        })
    }

    const fetchChapterDetails = () => {
        fetchChapters(`${CNO}/`).then((res) => {
            setChapterdetails(res.data)
        })
    }

    const handleSNO = (e) => {
        if (e === 'incr' && parseInt(slokaNO) !== shlokas.length - 1) {
            setSlokaNo(parseInt(slokaNO) + 1);
        } else if (e === 'decr' && parseInt(slokaNO) !== 1) {
            setSlokaNo(parseInt(slokaNO) - 1);
        }
    }
    return (
        <>
            <div className='mt-[60px] bg-slate-100'>
                {chapterdetails &&
                    <ChapterDetailsCard chapter={chapterdetails} />
                }
            </div>
            {shlokas &&
                <div>
                    <div>
                        <ShlokaCard Shloka={shlokas} />

                    </div>
                    <div className='flex justify-evenly mt-5 mb-10'>
                        <button className='px-5 py-2 text-5xl' onClick={() => { handleSNO('decr') }}><GrFormPreviousLink /></button>
                        <button className='px-5 py-2 text-5xl' onClick={() => { handleSNO('incr') }}><GrFormNextLink /></button>
                    </div>
                </div>}
        </>
    )
}

export default ChapterDetails