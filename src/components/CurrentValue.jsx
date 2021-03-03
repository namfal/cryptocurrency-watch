import React from 'react'

const style = {
	textAlign: 'right',
	fontSize: '56px',
	fontWeight: 600,
	color: '#fff',
	alignSelf: 'flex-end'
}

const CurrentValue = ({ children }) => {
	return <p className="current-value" style={style}>{children}</p>
}

export default CurrentValue
