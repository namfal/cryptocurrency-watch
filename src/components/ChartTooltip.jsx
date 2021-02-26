import React from 'react'
import { formatPrice, formatDate } from '../utils'

const ChartTooltip = ({ active, payload, currency }) => {
	if (active && payload) {
		return (
			<div className="chart-tooltip">
				<p className="time">{ formatDate(payload[0].payload.date) }</p>
				<p className="value">{ formatPrice(payload[0].payload.value, currency) }</p>
			</div>
		)
	} else return null
}

export default ChartTooltip
