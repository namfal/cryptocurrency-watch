import React from 'react'
import '../styles/chart.css'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import ChartTooltip from './ChartTooltip'
import { formatPrice, formatDate } from '../utils'

const Chart = ({ data, currency }) => {
	const yValues = data.map(item => item.value)
	return <div className="chart">
		<p className="current-value">{data.length > 0 && formatPrice(data[data.length - 1].value, currency)}</p>
		<ResponsiveContainer>
			<LineChart
				data={data}
				margin={{
					top: 20,
					right: 20,
					left: 50,
					bottom: 20
				}}
			>
				<XAxis
					dataKey="date"
					tickLine={false}
					minTickGap={80}
					stroke="#fff"
					tickFormatter={date => formatDate(date, currency)}
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
