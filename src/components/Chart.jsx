import React from 'react'
import '../styles/chart.css'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import ChartTooltip from './ChartTooltip'

const Chart = ({ data }) => {
	const yValues = data.map(item => item.value)
	return <div className="chart-container">
		<p className="current-value">{data.length > 0 && data[data.length - 1].value.toFixed(2)}</p>
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
					tickLine={false}
					minTickGap={80}
					stroke="#fff"
				/>
				<YAxis
					dataKey="value"
					type="number"
					domain={['dataMin', 'dataMax']}
					padding={{ bottom: 25, top: 25 }}
					tickLine={false}
					ticks={[Math.min(...yValues).toFixed(2), Math.max(...yValues).toFixed(2)]}
					stroke="#fff"
				/>
				<Tooltip content={<ChartTooltip/>} />
				<Line type="monotone" dataKey="value" stroke="rgba(65, 185, 131, 1)" activeDot={{ r: 4 }} dot={false}/>
			</LineChart>
		</ResponsiveContainer>
	</div>
}

export default Chart
