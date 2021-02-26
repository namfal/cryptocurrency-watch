import React, { useState, useEffect } from 'react'
import '../styles/news.css'
import { getTopHeadlines } from '../services/services'
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
				const news = await getTopHeadlines()
				setNews(news)
			} catch (e) {
				console.error(e.response.data.message)
			}
		})()
	}, [])

	return (
		<div className={`news-container ${expanded && 'expanded'}`}>
			<button className="news-toggle" onClick={toggleNews} value="expand-news-pane"/>
			<h1 className="headers news-header" onClick={toggleNews}>News</h1>
			<div className="news">
				{
					news.map((newsItem, index) => {
						return <NewsItem newsItem={newsItem} key={newsItem.source.id + index}/>
					})
				}
			</div>
		</div>
	)
}

export default News
