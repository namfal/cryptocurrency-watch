import React from 'react'
import { formatPrice } from '../utils'

const ChartTooltip = ({ active, payload }) => {
	if (active && payload) {
		return (
			<div className="chart-tooltip">
				<p className="time">{`${payload[0].payload.time}`}</p>
				<p className="value">{ formatPrice(payload[0].payload.value) }</p>
			</div>
		)
	} else return null
}

export default ChartTooltip
