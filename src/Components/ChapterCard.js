import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChapterCard = (props) => {
    const { chapter } = props;
    const Navigate = useNavigate();
    return (
        <div
            className='bg-white rounded-2xl w-full h-full flex flex-col items-center p-6 cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300 border border-amber-100'
            onClick={() => { Navigate(`/chapter/${chapter.chapter_number}`) }}
        >
            <div className="w-full flex justify-center mb-4">
                <img src="/images/chapter.png" className='w-40 drop-shadow-md' alt="chapter" />
            </div>
            <div className="text-center w-full flex-1 flex flex-col justify-between">
                <div>
                    <div className="bg-gradient-to-r from-amber-600 to-yellow-600 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
                        Chapter {chapter.chapter_number}
                    </div>
                    <h2 className='font-bold text-xl text-gray-800 mb-3 leading-tight min-h-[3.5rem] flex items-center justify-center'>
                        {chapter.name}
                    </h2>
                </div>
                <div className="bg-amber-50 text-amber-800 text-sm font-semibold px-4 py-2 rounded-full inline-flex items-center gap-2 border border-amber-200 justify-center">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                    </svg>
                    {chapter.verses_count} Shlokas
                </div>
            </div>
        </div>
    )
}

export default ChapterCard;