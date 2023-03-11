import React, { useState, useEffect, useRef } from 'react'
import '../styles/chart.css'
import { getHistoricalData } from '../services/services'
import { throttle } from 'lodash'
import Chart from './Chart'
import RadioButtons	from './RadioButtons'
import CurrentValue from './CurrentValue'
import { formatPrice } from '../utils'

const ChartContainer = () => {
	const socket = useRef(null)
	const [data, setData] = useState([])
	const [error, setError] = useState('')
	const [currency, setCurrency] = useState('USD')
	const [crypto, setCrypto] = useState('BTC')

	useEffect(() => {
		(async () => {
			try {
				const resp = await getHistoricalData(getPair())
				setData(resp)
			} catch (e) {
				console.error(e.message)
				setError('There was an error while retrieving historical data.')
			}
		})()

		return () => {
			setData([])
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currency, crypto])

	useEffect(() => {
		if (socket.current) {
			socket.current.send(JSON.stringify(getSubscription()))
		}

		return () => {
			socket.current.send(JSON.stringify({
				type: 'unsubscribe',
				channels: [{ name: 'ticker' }]
			}))
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currency, crypto])

	useEffect(() => {
		if (!socket.current) {
			socket.current = new WebSocket('wss://ws-feed.exchange.coinbase.com')
			socket.current.onopen = () => {
				socket.current.send(JSON.stringify(getSubscription()))
			}

			socket.current.onerror = (error) => {
				console.error('[error]', error)
				setError('We have encountered an error while retrieving current price data.')
			}

			socket.current.onclose = (e) => {
				if (!e.wasClean) {
					console.error('[close] Connection died due to a problem', e)
				}
			}

			socket.current.onmessage = throttle((e) => {
				const newData = JSON.parse(e.data)
				if (newData.type === 'ticker') {
					setData(prev => {
						return [...prev, {
							date: newData.time,
							value: Number(newData.price)
						}]
					})
				}
			}, 5000)
		}

		return () => {
			socket.current.close()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleCurrencyChange = (value) => setCurrency(value)

	const handleCryptoChange = (value) => setCrypto(value)

	const getSubscription = () => {
		return {
			type: 'subscribe',
			channels: [
				{
					name: 'ticker',
					product_ids: [getPair()]
				}
			]
		}
	}

	const getPair = () => `${crypto}-${currency}`
	if (error && data.length === 0) {
		return <div className="chart-container centered">
			<div className="error">{error}</div>
		</div>
	} else if (data.length === 0) {
		return <div className="chart-container centered">
			<div className="loading">Loading<span>.</span><span>.</span><span>.</span></div>
		</div>
	} else {
		return <div className="chart-container">
			<div className="chart-titles">
				<CurrentValue>{getPair()}</CurrentValue>
				{
					data.length > 0 &&
				<CurrentValue>{formatPrice(data[data.length - 1].value, currency)}</CurrentValue>
				}
			</div>
			<Chart data={data} currency={currency}/>
			<div className="chart-controls">
				<RadioButtons
					options={['BTC', 'ETH', 'LTC', 'BCH', 'ETC']}
					name="crypto"
					handleClick={handleCryptoChange}
					currentValue={crypto}
				/>
				<RadioButtons
					options={['USD', 'EUR', 'GBP']}
					name="currency"
					handleClick={handleCurrencyChange}
					currentValue={currency}
				/>
			</div>
			{error && <p>{error}</p>}
		</div>
	}
}

export default ChartContainer
