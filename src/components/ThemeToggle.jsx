import React, { useEffect } from 'react'
import '../styles/theme-toggle.css'

const ThemeToggle = () => {
	useEffect(() => {
		const savedPreference = localStorage.getItem('theme')
		if (savedPreference) {
			setTheme(savedPreference)
		} else {
			setThemeToSystem()
		}
	}, [])

	const setTheme = (theme) => {
		console.log('setTheme')
		document.getElementsByTagName('body')[0].className = theme
	}

	const setThemeAndSave = (theme) => {
		localStorage.setItem('theme', theme)
		setTheme(theme)
	}

	const setThemeToSystem = () => {
		localStorage.clear()
		const theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
		setTheme(theme)
	}

	return <div className="theme-toggle">
		<button onClick={() => setThemeAndSave('dark')}>Dark</button>
		<button onClick={setThemeToSystem}>System</button>
		<button onClick={() => setThemeAndSave('light')}>Light</button>
	</div>
}

export default ThemeToggle
