import './styles/App.css'
import './styles/common.css'
import React from 'react'
import ChartContainer from './components/ChartContainer'
import News from './components/News'

function App () {
	return (
		<div className="App">
			<div className="top-container">
				<ChartContainer />
			</div>
			<News />
		</div>
	)
}

export default App
