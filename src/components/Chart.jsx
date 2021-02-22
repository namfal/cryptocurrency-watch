import React from 'react'
import '../styles/chart.css'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import ChartTooltip from './ChartTooltip'

const Chart = ({ data }) => {
	const yValues = data.map(item => item.value)
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
					tickLine={false}
					minTickGap={80}
				/>
				<YAxis
					dataKey="value"
					type="number"
					domain={['dataMin', 'dataMax']}
					padding={{ bottom: 25, top: 25 }}
					tickLine={false}
					ticks={[Math.min(...yValues).toFixed(2), Math.max(...yValues).toFixed(2)]}
				/>
				<Tooltip content={<ChartTooltip/>} />
				<Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 4 }} dot={false}/>
			</LineChart>
		</ResponsiveContainer>
	</div>
}

export default Chart
