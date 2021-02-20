import React, { useEffect } from 'react'
import '../styles/chart.css'

const Chart = () => {
	const socket = new WebSocket('wss://ws-feed.gdax.com')
	const subscription = {
		type: 'subscribe',
		channels: [
			{
				name: 'ticker',
				product_ids: ['BTC-EUR']
			}
		]
	}

	const timer1 = setTimeout(() => {
		socket.close()
	}, 2000)

	useEffect(() => {
		socket.onopen = (e) => {
			console.log('[open] Connection established')
			socket.send(JSON.stringify(subscription))
		}

		socket.onerror = (error) => {
			console.log(`[error] ${error.message}`)
		}

		socket.onclose = (e) => {
			if (e.wasClean) {
				console.log(`[close] Connection closed cleanly, code=${e.code} reason=${e.reason}`)
			} else {
				console.log('[close] Connection died')
			}
		}

		socket.onmessage = (e) => {
			console.log('Data received from server:', JSON.parse(e.data))
		}

		return () => {
			socket.close()
			clearTimeout(timer1)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []) // run only once, similar to component did mount

	return <div className="chart-container">Chart</div>
}

export default Chart
