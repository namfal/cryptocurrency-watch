import './styles/App.css'
import React from 'react'
// import ChartContainer from './components/ChartContainer'
import ChartContainerClass from './components/ChartContainerClass'
import News from './components/News'

function App () {
	return (
		<div className="App">
			<div className="top-container">
				<ChartContainerClass />
			</div>
			<News />
		</div>
	)
}

export default App
