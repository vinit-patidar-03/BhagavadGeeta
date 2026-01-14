import React, { useEffect, useState } from 'react'
import Context from './Context'
import fetchChapters from '../API/BhagvatGitaAPI'

const AppContext = (props) => {

    const [chapters, setChapters] = useState();
    const [chaptNO, setChaptNO] = useState(1);
    const [slokaNO, setSlokaNo] = useState(1);


    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        fetchChapters(``).then((res) => {
            setChapters(res.data);
        })
    }

    return (
        <Context.Provider value={{ chapters, setChapters, slokaNO, setSlokaNo, chaptNO, setChaptNO }}>
            {props.children}
        </Context.Provider>
    )
}

export default AppContext