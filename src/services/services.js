import axios from 'axios'

const BASE_URL = 'https://api.pro.coinbase.com'

export function getHistoricalData (productId, range = null) {
	return axios.get(`${BASE_URL}/products/${productId}/candles`)
}

export function getProducts () {
	return axios.get(`${BASE_URL}/products`)
}
