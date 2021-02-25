import React from 'react'
import { formatDate } from '../utils'

const NewsItem = ({ newsItem }) => {
	return <div className="news-item">
		<a href={newsItem.url} target="_blank" rel="noreferrer">
			<h3 className="news-title"><span className="source-name">{newsItem.source.name} / </span>{newsItem.title}</h3>
			<p className="news-description">{ newsItem.description }</p>
			<p className="published-at">{formatDate(newsItem.publishedAt, true)}</p>
		</a>
	</div>
}

export default NewsItem
