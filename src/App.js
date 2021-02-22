import './styles/App.css'
import React from 'react'
import Chart from './components/Chart'
import News from './components/News'

function App () {
	return (
		<div className="App">
			<div className="top-container">
				<Chart />
			</div>
			<News />
		</div>
	)
}

export default App
