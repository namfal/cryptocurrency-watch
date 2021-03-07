import React, { useState, useEffect } from 'react'
import '../styles/chart.css'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import ChartTooltip from './ChartTooltip'
import { formatPrice, formatDate } from '../utils'
import { throttle } from 'lodash'

const widthLimitForYAxis = 850

const Chart = ({ data, currency }) => {
	const [width, setWidth] = useState(window.innerWidth)
	const yValues = data.map(item => item.value)

	useEffect(() => {
		const onResize = () => {
			console.log('window resized: ' + window.innerWidth)
			setWidth(window.innerWidth)
		}
		window.addEventListener('resize', throttle(onResize, 1000))

		return () => {
			console.log('window resize listener removed')
			window.removeEventListener('resize', onResize)
		}
	}, [])

	return <div className="chart">
		<ResponsiveContainer>
			<LineChart
				data={data}
			>
				<XAxis
					dataKey="date"
					tickLine={false}
					minTickGap={80}
					stroke="#fff"
					tickFormatter={date => formatDate(date)}
				/>
				<YAxis
					dataKey="value"
					type="number"
					domain={['dataMin', 'dataMax']}
					padding={{ bottom: 25, top: 25 }}
					tickLine={false}
					ticks={[Math.min(...yValues), Math.max(...yValues)]}
					tickFormatter={value => formatPrice(value, currency)}
					stroke="#fff"
					width={width <= widthLimitForYAxis ? 10 : 100}
					tick={width >= widthLimitForYAxis}
				/>
				<Tooltip content={<ChartTooltip currency={currency}/>} />
				<Line
					type="monotone"
					dataKey="value"
					stroke="rgba(65, 185, 131, 1)"
					activeDot={{ r: 4 }}
					dot={false}
					strokeWidth={1.5}
				/>
			</LineChart>
		</ResponsiveContainer>
	</div>
}

export default Chart
