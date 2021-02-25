import React from 'react'
import { formatDate } from '../utils'

const NewsItem = ({ newsItem }) => {
	return <div className="news-item">
		<a href={newsItem.url} target="_blank" rel="noreferrer">
			<h3>{newsItem.title}</h3>
			<p>{newsItem.description}</p>
			<p>{newsItem.source.name}</p>
			<p>{formatDate(newsItem.publishedAt, true)}</p>
		</a>
	</div>
}

export default NewsItem