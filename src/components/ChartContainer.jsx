import React, { useState, useEffect } from 'react'
import '../styles/chart.css'
import { getHistoricalData } from '../services/services'
import { throttle } from 'lodash'
import Chart from './Chart'

const ChartContainer = () => {
	const socket = new WebSocket('wss://ws-feed.gdax.com')
	const [data, setData] = useState([])
	const subscription = {
		type: 'subscribe',
		channels: [
			{
				name: 'ticker',
				product_ids: ['BTC-USD']
			}
		]
	}

	useEffect(() => {
		(async () => {
			try {
				const resp = await getHistoricalData('BTC-USD')
				setData(resp)
			} catch (e) {
				console.error(e.message)
			}
		})()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		socket.onopen = (e) => {
			socket.send(JSON.stringify(subscription))
		}

		socket.onerror = (error) => {
			console.error(`[error] ${error.message}`)
		}

		socket.onclose = (e) => {
			if (!e.wasClean) {
				console.error('[close] Connection died due to a problem')
			}
		}

		socket.onmessage = throttle((e) => {
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

		return () => {
			socket.close()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []) // run only once, similar to component did mount

	return <div className="chart-container">
		<Chart data={data}/>
	</div>
}

export default ChartContainer
