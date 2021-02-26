import React, { useState, useEffect, useRef } from 'react'
import '../styles/chart.css'
import { getHistoricalData } from '../services/services'
import { throttle } from 'lodash'
import Chart from './Chart'
import RadioButtons	from './RadioButtons'

const ChartContainer = () => {
	const socket = useRef(null)
	const [data, setData] = useState([])
	const [currency, setCurrency] = useState('USD')

	useEffect(() => {
		(async () => {
			try {
				const resp = await getHistoricalData(`BTC-${currency}`)
				setData(resp)
			} catch (e) {
				console.error(e.message)
			}
		})()

		return () => {
			setData([])
		}
	}, [currency])

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
	}, [currency])

	useEffect(() => {
		if (!socket.current) {
			socket.current = new WebSocket('wss://ws-feed.gdax.com')
			socket.current.onopen = () => {
				socket.current.send(JSON.stringify(getSubscription()))
			}

			socket.current.onerror = (error) => {
				console.error(`[error] ${error.message}`)
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

	const getSubscription = () => {
		return {
			type: 'subscribe',
			channels: [
				{
					name: 'ticker',
					product_ids: [`BTC-${currency}`]
				}
			]
		}
	}

	return <div className="chart-container">
		<Chart data={data} currency={currency}/>
		<RadioButtons
			options={['USD', 'EUR', 'GBP']}
			name="currency"
			handleClick={handleCurrencyChange}
			currentCurrency={currency}
		/>
	</div>
}

export default ChartContainer
