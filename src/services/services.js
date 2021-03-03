import axios from 'axios'
import { getStartDateAndGranularity } from '../utils'

const BASE_URL = 'https://api.pro.coinbase.com'
const BASE_URL_NEWS_API = 'https://newsapi.org/v2'
const GUARDIAN_BASE_URL = 'https://content.guardianapis.com/search'

export function getHistoricalData (productId, range = '24hrs') {
	const { startDate, granularity } = getStartDateAndGranularity(range)
	return axios.get(`${BASE_URL}/products/${productId}/candles`, {
		params: {
			start: startDate.toISOString(),
			end: new Date().toISOString(),
			granularity: granularity
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

export function getGuardianNews () {
	return axios.get(GUARDIAN_BASE_URL, {
		params: {
			'api-key': process.env.REACT_APP_GUARDIAN_API_KEY,
			'page-size': 50,
			q: 'cryptocurrency OR stocks OR bitcoin OR crypto',
			'show-fields': 'trailText',
			'order-by': 'newest'
		}
	}).then(async response => {
		return response.data.response.results
	}
	)
}
