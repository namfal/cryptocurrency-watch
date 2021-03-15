import React from 'react'
import { formatDate } from '../utils'

const NewsItem = ({ newsItem }) => {
	return <div className="news-item">
		<a href={newsItem.webUrl} target="_blank" rel="noreferrer">
			<h3 className="news-title">
				<span className="source-name">{newsItem.sectionName} / </span>
				{newsItem.webTitle}
				<span className="published-at-mobile"> ( {formatDate(newsItem.webPublicationDate, true)} )</span>
			</h3>
			<p className="news-description" dangerouslySetInnerHTML={{ __html: newsItem.fields.trailText }}/>
			<p className="published-at">{formatDate(newsItem.webPublicationDate, true)}</p>
		</a>
	</div>
}

export default NewsItem
