import React, {useState} from 'react'
import '../styles/news.css'

const News = () => {
    const [expanded, setExpanded] = useState(false)

    const toggleNews = () => {
        setExpanded(!expanded)
    }

    return (
        <div className={`news-container ${expanded && 'expanded'}`} onClick={toggleNews}>
            <h1 className="news-header">News</h1>
        </div>
    )
}

export default News
