import React from 'react';

const Loader = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] w-full">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
            <h2 className="text-xl font-semibold text-gray-700 mt-5">Loading...</h2>
        </div>
    );
}

export default Loader;