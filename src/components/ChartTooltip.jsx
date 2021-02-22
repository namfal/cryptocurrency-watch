import React from 'react'

const ChartTooltip = ({ active, payload }) => {
	if (active && payload) {
		return (
			<div>
				<p>{`${payload[0].payload.value}`}</p>
				<p>{`${payload[0].payload.time}`}</p>
			</div>
		)
	} else return null
}

export default ChartTooltip
