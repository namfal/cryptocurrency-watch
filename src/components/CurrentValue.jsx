import React from 'react'
import { formatPrice } from '../utils'

const CurrentValue = ({ price, currency }) => {
	return price ? <p className="current-value">{formatPrice(price, currency)}</p> : null
}

export default CurrentValue
