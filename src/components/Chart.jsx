import React, { useState, useEffect, useCallback } from 'react'
import '../styles/chart.css'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceDot } from 'recharts'
import ChartTooltip from './ChartTooltip'
import { formatPrice, formatDate } from '../utils'
import { throttle } from 'lodash'

const widthLimitForYAxis = 850

const Chart = ({ data, currency }) => {
	const [width, setWidth] = useState(window.innerWidth)
	const calculateMinMax = useCallback(() => {
		const yValues = data.map(item => item.value)
		const min = data.filter(item => item.value === Math.min(...yValues))[0]
		const max = data.filter(item => item.value === Math.max(...yValues))[0]
		return [min, max]
	}, [data])
	const [minMax, setMinMax] = useState(() => calculateMinMax())
	const [min, max] = minMax

	useEffect(() => {
		setMinMax(calculateMinMax())
	}, [data, calculateMinMax])

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
					stroke="#fff"
					activeDot={{ r: 4 }}
					dot={false}
					strokeWidth={2}
				/>
				{width <= widthLimitForYAxis && <ReferenceDot r={5} fill="#FF9D00" stroke="none" x={max.date} y={max.value} />}
				{width <= widthLimitForYAxis && <ReferenceDot r={5} fill="#FF9D00" stroke="none" x={min.date} y={min.value} />}
			</LineChart>
		</ResponsiveContainer>
	</div>
}

export default Chart
