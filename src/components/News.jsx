import React, {useState} from 'react'
import '../styles/news.css'

const News = () => {
    const [expanded, setExpanded] = useState(false)

    const toggleNews = () => {
        let currentState = expanded
        setExpanded(!currentState)
    }

    return <div className={`news-container ${expanded && 'expanded'}`} onClick={toggleNews}>News</div>
}

export default News
