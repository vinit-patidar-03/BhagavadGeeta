import React, { useState } from 'react';
import { MdMusicNote, MdMusicOff } from "react-icons/md";

const ShlokaCard = (props) => {
    const { Shloka, chapterDetails } = props;
    const [songStatus, setSongStatus] = useState(true);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [audio] = useState(new Audio('/flute.mp3'));
    const [selectedTranslation, setSelectedTranslation] = useState(0);
    const [selectedCommentary, setSelectedCommentary] = useState(0);

    const readShloka = (message) => {
        if (isSpeaking) return;
        const msg = new SpeechSynthesisUtterance();
        msg.lang = 'hi';
        msg.text = message;
        msg.volume = 1;
        msg.pitch = 1;
        msg.rate = 1;
        msg.onstart = () => setIsSpeaking(true);
        msg.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(msg);
    };

    const playSound = () => {
        if (audio.paused) {
            audio.play();
            audio.loop = true;
            setSongStatus(false);
        } else {
            audio.pause();
            audio.loop = false;
            setSongStatus(true);
        }
    };

    // Helper function to format verse text
    const formatVerseText = (text) => {
        let formattedText = text.replace(/\n\n+/g, '\n');
        if (formattedText.includes('\n')) return formattedText;

        const dandaPositions = [];
        for (let i = 0; i < formattedText.length; i++) {
            if (formattedText[i] === '।' && formattedText[i + 1] !== '।') {
                dandaPositions.push(i);
            }
        }

        const middle = formattedText.length / 2;
        let bestPosition = -1;
        let minDistance = Infinity;

        for (const pos of dandaPositions) {
            const distance = Math.abs(pos - middle);
            if (distance < minDistance) {
                minDistance = distance;
                bestPosition = pos;
            }
        }

        if (bestPosition !== -1) {
            return formattedText.slice(0, bestPosition + 1) + '\n' + formattedText.slice(bestPosition + 1);
        }

        return formattedText;
    };

    // Extract speaker and verse text
    const speakers = ["श्री भगवानुवाच", "अर्जुन उवाच", "धृतराष्ट्र उवाच", "सञ्जय उवाच"];
    let speakerText = null;
    let verseText = Shloka.text;

    for (const speaker of speakers) {
        if (Shloka.text.includes(speaker)) {
            speakerText = speaker;
            verseText = Shloka.text.replace(speaker, "").trim();
            break;
        }
    }

    const formattedVerseText = formatVerseText(verseText);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            {/* Chapter Info Header */}
            {chapterDetails && (
                <div className="mb-6 text-center">
                    <div className="inline-block bg-gradient-to-r from-amber-700 to-yellow-700 text-white px-4 py-1.5 rounded-full text-xs font-bold mb-2 shadow-sm">
                        अध्याय {chapterDetails.chapter_number}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Baloo 2', cursive" }}>
                        {chapterDetails.name}
                    </h2>
                    <div className="flex items-center justify-center gap-2 flex-wrap">
                        <span className="text-sm text-gray-600">{chapterDetails.verses_count} Shlokas</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-600">Chapter {chapterDetails.chapter_number} of 18</span>
                    </div>
                </div>
            )}

            <div>
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-8 md:p-12 mb-8">
                    {/* Header with Controls */}
                    <div className="flex justify-between items-center mb-8">
                        <div className="bg-gradient-to-r from-amber-700 to-yellow-700 text-white px-5 py-2 rounded-full shadow-sm">
                            <span className="font-bold tracking-wide uppercase text-sm">
                                श्लोक {Shloka.verse_number}
                            </span>
                        </div>
                        <div className="flex space-x-3">
                            <button
                                onClick={() => readShloka(Shloka.text)}
                                className={`p-3 rounded-full transition-all duration-200 shadow-sm ${isSpeaking ? 'bg-amber-600 text-white' : 'bg-white text-gray-600 hover:bg-amber-100 hover:text-amber-700'}`}
                                title="Listen to Shloka"
                            >
                                <i className="fa-solid fa-volume-high text-lg"></i>
                            </button>
                            <button
                                onClick={playSound}
                                className={`p-3 rounded-full transition-all duration-200 shadow-sm ${!songStatus ? 'bg-amber-600 text-white' : 'bg-white text-gray-600 hover:bg-amber-100 hover:text-amber-700'}`}
                                title="Play/Stop Background Music"
                            >
                                {songStatus ? <MdMusicNote size={22} /> : <MdMusicOff size={22} />}
                            </button>
                        </div>
                    </div>

                    {/* Sanskrit Text */}
                    <div className="text-center py-6">
                        {speakerText && (
                            <div className="mb-6">
                                <div className="inline-block bg-white px-6 py-2 rounded-full border-2 border-amber-400 shadow-sm">
                                    <h2 className="text-xl md:text-2xl font-bold text-amber-800" style={{ fontFamily: "'Baloo 2', cursive" }}>
                                        {speakerText}
                                    </h2>
                                </div>
                            </div>
                        )}
                        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 leading-relaxed" style={{ fontFamily: "'Baloo 2', cursive", whiteSpace: "pre-line" }}>
                            {formattedVerseText}
                        </h1>

                    </div>
                </div>

                {/* Translation & Commentary Section */}
                <div className="space-y-12">
                    {/* Translation */}
                    <div className="mb-12">
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-10 bg-gradient-to-b from-amber-600 to-yellow-600 rounded-full"></div>
                                <h3 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Baloo 2', cursive" }}>
                                    Translation
                                </h3>
                            </div>
                            {Shloka.translations && Shloka.translations.length > 1 && (
                                <select
                                    value={selectedTranslation}
                                    onChange={(e) => setSelectedTranslation(parseInt(e.target.value))}
                                    className="px-3 py-1.5 text-sm border-2 border-amber-200 rounded-lg bg-white hover:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors"
                                >
                                    {Shloka.translations.map((trans, index) => (
                                        <option key={index} value={index}>{trans.author_name}</option>
                                    ))}
                                </select>
                            )}
                        </div>
                        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-8 border-l-4 border-amber-500">
                            <p className="text-gray-800 text-lg leading-relaxed mb-4" style={{ lineHeight: "1.9" }}>
                                {Shloka.translations[selectedTranslation]?.description}
                            </p>
                            <div className="flex justify-end">
                                <div className="bg-white px-4 py-2 rounded-full border border-amber-200">
                                    <p className="text-sm text-amber-800 font-semibold">
                                        — {Shloka.translations[selectedTranslation]?.author_name}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Commentary */}
                    <div>
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-10 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
                                <h3 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Baloo 2', cursive" }}>
                                    Commentary
                                </h3>
                            </div>
                            {Shloka.commentaries && Shloka.commentaries.length > 1 && (
                                <select
                                    value={selectedCommentary}
                                    onChange={(e) => setSelectedCommentary(parseInt(e.target.value))}
                                    className="px-3 py-1.5 text-sm border-2 border-blue-200 rounded-lg bg-white hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                                >
                                    {Shloka.commentaries.map((comm, index) => (
                                        <option key={index} value={index}>{comm.author_name}</option>
                                    ))}
                                </select>
                            )}
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 border-l-4 border-blue-500">
                            <div className="text-gray-700 text-base leading-relaxed text-justify mb-4" style={{ lineHeight: "1.9" }}>
                                {Shloka.commentaries[selectedCommentary]?.description}
                            </div>
                            <div className="flex justify-end">
                                <div className="bg-white px-4 py-2 rounded-full border border-blue-200">
                                    <p className="text-sm text-blue-800 font-semibold">
                                        — {Shloka.commentaries[selectedCommentary]?.author_name}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShlokaCard;
