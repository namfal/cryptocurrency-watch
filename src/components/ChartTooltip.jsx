import React from 'react'
import { formatPrice, formatDate } from '../utils'

const ChartTooltip = ({ active, payload }) => {
	if (active && payload) {
		return (
			<div className="chart-tooltip">
				<p className="time">{ formatDate(payload[0].payload.date) }</p>
				<p className="value">{ formatPrice(payload[0].payload.value) }</p>
			</div>
		)
	} else return null
}

export default ChartTooltip
