import './styles/App.css'
import './styles/common.css'
import './styles/theme-dark.css'
import './styles/theme-light.css'
import React from 'react'
import ChartContainer from './components/ChartContainer'
import News from './components/News'
import ThemeToggle from './components/ThemeToggle'

function App () {
	return (
		<div className="App">
			<ThemeToggle/>
			<div className="top-container">
				<ChartContainer />
			</div>
			<News />
		</div>
	)
}

export default App
