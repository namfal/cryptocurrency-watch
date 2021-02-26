import React from 'react'
import { formatPrice } from '../utils'

const style = {
	textAlign: 'right',
	fontSize: '56px',
	fontWeight: 600,
	color: '#fff',
	alignSelf: 'flex-end'
}

const CurrentValue = ({ price, currency }) => {
	return price ? <p className="current-value" style={style}>{formatPrice(price, currency)}</p> : null
}

export default CurrentValue
