import axios from 'axios'

const BASE_URL = 'https://api.pro.coinbase.com'
const BASE_URL_NEWS_API = 'https://newsapi.org/v2'

export function getHistoricalData (productId, range = null) {
	const date = new Date()
	date.setHours(0)
	date.setMinutes(0)
	date.setSeconds(0)
	return axios.get(`${BASE_URL}/products/${productId}/candles`, {
		params: {
			start: date.toISOString(),
			end: new Date().toISOString(),
			granularity: 300
		}
	}).then(response => {
		const sortFn = (a, b) => a[0] - b[0]
		const convertEpochToUCT = epoch => new Date(epoch * 1000).toISOString()
		const mapFn = arr => {
			const [date, low] = arr
			return {
				date: convertEpochToUCT(date),
				value: low
			}
		}
		return response.data.sort(sortFn).map(mapFn)
	})
}

export function getTopHeadlines () {
	return axios.get(`${BASE_URL_NEWS_API}/top-headlines`, {
		params: {
			sources: 'bloomberg, business-insider, crypto-coins-news, fortune'
		},
		headers: {
			'X-Api-Key': process.env.REACT_APP_NEWS_API
		}
	}).then(resp => {
		return resp.data.articles
	})
}
