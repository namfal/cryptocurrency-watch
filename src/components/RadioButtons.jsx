import React from 'react'
import '../styles/buttons.css'

const RadioButtons = ({ options, name, handleClick, currentCurrency }) => {
	return <div className="radio-btn-container">
		{
			options.map((option, index) => {
				return <div
					key={option + index}
					className={`radio-option ${currentCurrency === option && 'selected'}`}
					onClick={() => handleClick(option)}
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
