import React, { useState, useEffect } from 'react'
import '../styles/chart.css'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import ChartTooltip from './ChartTooltip'
import { formatPrice, formatDate } from '../utils'
import { throttle } from 'lodash'

const widthLimitForYAxis = 850

const Chart = ({ data, currency }) => {
	const [width, setWidth] = useState(window.innerWidth)
	const [min, setMin] = useState({ value: 0 })
	const [max, setMax] = useState({ value: 0 })

	useEffect(() => {
		const yValues = data.map(item => item.value)
		setMin(data.filter(item => item.value === Math.min(...yValues))[0] || 0)
		setMax(data.filter(item => item.value === Math.max(...yValues))[0] || 0)
	}, [data])

	useEffect(() => {
		const onResize = () => {
			setWidth(window.innerWidth)
		}
		window.addEventListener('resize', throttle(onResize, 1000))

		return () => {
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
					ticks={[min.value, max.value]}
					tickFormatter={value => formatPrice(value, currency)}
					stroke="#fff"
					width={100}
					hide={width <= widthLimitForYAxis}
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
				{width <= widthLimitForYAxis && <ReferenceLine stroke="white" x={max.date} y={max.value} label={max.value} strokeDasharray="5 20"/>}
				{width <= widthLimitForYAxis && <ReferenceLine stroke="white" x={min.date} y={min.value} label={min.value} strokeDasharray="5 20"/>}
			</LineChart>
		</ResponsiveContainer>
	</div>
}

export default Chart
