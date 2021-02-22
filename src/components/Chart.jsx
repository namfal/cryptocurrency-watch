import React, { useState, useEffect } from 'react'
import '../styles/chart.css'
import { getHistoricalData } from '../services/services'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { throttle } from 'lodash'

const Chart = () => {
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
				const historicData = resp.map(item => {
					return {
						time: `${item[0].getHours()}:${item[0].getMinutes()}`,
						value: item[1]
					}
				})
				setData(historicData)
			} catch (e) {
				console.log(e.message)
			}
		})()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		socket.onopen = (e) => {
			// console.log('[open] Connection established')
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

		socket.onmessage = throttle((e) => {
			const newData = JSON.parse(e.data)
			console.log(newData)
			if (newData.type === 'ticker') {
				setData(prev => {
					const time = new Date(newData.time)
					return [...prev, {
						time: `${time.getHours()}:${time.getMinutes()}`,
						value: newData.price
					}]
				})
			}
		}, 5000)

		return () => {
			socket.close()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []) // run only once, similar to component did mount

	const ToolTip = ({ active, payload }) => {
		if (active && payload) {
			return (
				<div>
					<p>{`${payload[0].payload.value}`}</p>
					<p>{`${payload[0].payload.time}`}</p>
				</div>
			)
		} else return null
	}

	return <div className="chart-container">
		<ResponsiveContainer width="100%" height="100%">
			<LineChart
				width={500}
				height={300}
				data={data}
				margin={{
					top: 20,
					right: 20,
					left: 20,
					bottom: 20
				}}
			>
				<XAxis
					dataKey="time"
					axisLine={false}
					tickLine={false}
				/>
				<YAxis
					dataKey="value"
					type="number"
					domain={['dataMin', 'dataMax']}
					padding={{ bottom: 25, top: 25 }}
					tickLine={false}
				/>
				<Tooltip content={<ToolTip />} />
				<Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 4 }} dot={false}/>
			</LineChart>
		</ResponsiveContainer>
	</div>
}

export default Chart
