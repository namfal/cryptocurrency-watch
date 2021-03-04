import React, { useState, useEffect } from 'react'
import '../styles/news.css'
import { getGuardianNews } from '../services/services'
import NewsItem from './NewsItem'

const News = () => {
	const [expanded, setExpanded] = useState(false)
	const [news, setNews] = useState([])

	const toggleNews = () => {
		setExpanded(!expanded)
	}

	useEffect(() => {
		(async () => {
			try {
				const news = await getGuardianNews()
				setNews(news)
			} catch (e) {
				console.error(e.response.data.message)
			}
		})()
	}, [])

	return (
		<div className={`news-container ${expanded && 'expanded'}`}>
			<button className="news-toggle" onClick={toggleNews} value="expand-news-pane"/>
			<h1 className="news-header" onClick={toggleNews}>
				News<span className="powered-by"> powered by <a href="https://www.theguardian.com/international" onClick={e => e.stopPropagation()}>The Guardian</a></span>
			</h1>
			<div className="news">
				{
					news.map(newsItem => {
						return <NewsItem newsItem={newsItem} key={newsItem.id}/>
					})
				}
			</div>
		</div>
	)
}

export default News
