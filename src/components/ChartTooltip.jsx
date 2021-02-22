import React from 'react'

const ChartTooltip = ({ active, payload }) => {
	if (active && payload) {
		return (
			<div className="chart-tooltip">
				<p className="time">{`${payload[0].payload.time}`}</p>
				<p className="value">{`${payload[0].payload.value}`}</p>
			</div>
		)
	} else return null
}

export default ChartTooltip
