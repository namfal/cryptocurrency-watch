import axios from 'axios'

const BASE_URL = 'https://api.pro.coinbase.com'

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
		const convertEpochToCET = iso => new Date(iso * 1000)
		const mapFn = arr => {
			const [time, ...rest] = arr
			return [convertEpochToCET(time), ...rest]
		}
		return response.data.sort(sortFn).map(mapFn)
	})
}

export function getProducts () {
	return axios.get(`${BASE_URL}/products`)
}
