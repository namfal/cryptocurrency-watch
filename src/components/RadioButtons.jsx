import React from 'react'
import '../styles/buttons.css'

const RadioButtons = ({ options, name, handleClick, currentValue }) => {
	return <div className="radio-btn-container">
		{
			options.map((option, index) => {
				return <div
					key={option + index}
					className={`radio-option ${currentValue === option && 'selected'}`}
					onClick={() => handleClick(option)}
					onKeyPress={(e) => {
						if (e.key === 'Enter') { handleClick(option) }
					}}
					tabIndex="0"
				>
					<input
						className="radio-input"
						type="radio"
						value={option}
						name={name}
						id={option}
					/>
					<label htmlFor={option.value}>{option}</label>
				</div>
			})
		}
	</div>
}

export default RadioButtons
