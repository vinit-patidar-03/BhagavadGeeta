import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Context from '../context/Context';

const Navbar = () => {

    const Navigate = useNavigate();
    const { chapters, setSlokaNo, slokaNO, chaptNO, setChaptNO } = useContext(Context);

    useEffect(() => {
        setSlokaNo(1);
        setChaptNO(1);
    }, [setChaptNO, setSlokaNo])

    return (
        <nav className='bg-white/70 backdrop-blur-md shadow-md fixed top-0 z-50 w-full border-b border-amber-100'>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Desktop Layout - Single Row (hidden on mobile) */}
                <div className="hidden md:flex items-center justify-between h-16">
                    <div className="cursor-pointer" onClick={() => { Navigate('/') }}>
                        <span className="text-amber-800 font-bold text-xl gradient-text" style={{ fontFamily: "'Baloo 2', cursive" }}>
                            श्रीमद् भगवद्गीता
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <select
                            name="chapters"
                            id="chapters"
                            className='form-select block w-auto pl-3 pr-10 py-2 text-sm border-2 border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 rounded-lg shadow-sm bg-white/90 backdrop-blur-sm font-medium text-gray-700 hover:border-amber-300 transition-colors'
                            value={chaptNO}
                            onChange={(event) => { setChaptNO(event.target.value) }}
                        >
                            <option value={0}>Select Chapter</option>
                            {chapters &&
                                chapters.map((elem) => {
                                    return <option value={elem.id} key={elem.id}>{elem.name}</option>
                                })
                            }
                        </select>

                        <select
                            name="shloka"
                            id="shloka"
                            className='form-select block pl-3 pr-8 py-2 text-sm border-2 border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 rounded-lg shadow-sm bg-white/90 backdrop-blur-sm font-medium text-gray-700 hover:border-amber-300 transition-colors'
                            value={slokaNO}
                            onChange={(event) => { setSlokaNo(event.target.value) }}
                        >
                            <option value={0}>Shloka</option>
                            {(chaptNO - 1 >= 0 && chapters) &&
                                [...Array(chapters[chaptNO - 1].verses_count)].map((elem, index) => {
                                    return <option value={index + 1} key={index}>{index + 1}</option>
                                })
                            }
                        </select>

                        <button
                            className='bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white font-bold py-2 px-5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group'
                            disabled={slokaNO === 0 || chaptNO === 0}
                            onClick={() => { Navigate(`/chapter/${chaptNO}`); setSlokaNo(parseInt(slokaNO)) }}
                        >
                            <span className="mr-2">Go</span>
                            <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                        </button>
                    </div>
                </div>

                {/* Mobile Layout - Two Rows (visible on mobile only) */}
                <div className="md:hidden">
                    {/* Top Row - Title */}
                    <div className="flex items-center justify-center h-14 border-b border-amber-100/50">
                        <div className="cursor-pointer" onClick={() => { Navigate('/') }}>
                            <span className="text-amber-800 font-bold text-lg gradient-text" style={{ fontFamily: "'Baloo 2', cursive" }}>
                                श्रीमद् भगवद्गीता
                            </span>
                        </div>
                    </div>

                    {/* Bottom Row - Selects */}
                    <div className="flex items-center justify-center gap-2 py-3">
                        <select
                            name="chapters-mobile"
                            id="chapters-mobile"
                            className='form-select block w-auto pl-2 pr-8 py-2 text-xs border-2 border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 rounded-lg shadow-sm bg-white/90 backdrop-blur-sm font-medium text-gray-700 hover:border-amber-300 transition-colors'
                            value={chaptNO}
                            onChange={(event) => { setChaptNO(event.target.value) }}
                        >
                            <option value={0}>Chapter</option>
                            {chapters &&
                                chapters.map((elem) => {
                                    return <option value={elem.id} key={elem.id}>Ch {elem.id}</option>
                                })
                            }
                        </select>

                        <select
                            name="shloka-mobile"
                            id="shloka-mobile"
                            className='form-select block w-auto pl-2 pr-6 py-2 text-xs border-2 border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 rounded-lg shadow-sm bg-white/90 backdrop-blur-sm font-medium text-gray-700 hover:border-amber-300 transition-colors'
                            value={slokaNO}
                            onChange={(event) => { setSlokaNo(event.target.value) }}
                        >
                            <option value={0}>Shloka</option>
                            {(chaptNO - 1 >= 0 && chapters) &&
                                [...Array(chapters[chaptNO - 1].verses_count)].map((elem, index) => {
                                    return <option value={index + 1} key={index}>{index + 1}</option>
                                })
                            }
                        </select>

                        <button
                            className='bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group text-xs'
                            disabled={slokaNO === 0 || chaptNO === 0}
                            onClick={() => { Navigate(`/chapter/${chaptNO}`); setSlokaNo(parseInt(slokaNO)) }}
                        >
                            <span className="mr-1">Go</span>
                            <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform text-xs"></i>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
