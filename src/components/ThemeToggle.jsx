import React, { useEffect, useState } from 'react'
import '../styles/theme-toggle.css'
import { RiMoonClearFill, RiMoonClearLine, RiSunFill, RiSunLine } from 'react-icons/ri'

const ThemeToggle = () => {
	const [currentTheme, setCurrentTheme] = useState('')

	useEffect(() => {
		const savedPreference = localStorage.getItem('theme')
		if (savedPreference) {
			setTheme(savedPreference)
		} else {
			setThemeToSystem()
		}
	}, [])

	const setTheme = (theme) => {
		document.getElementsByTagName('body')[0].className = theme
		setCurrentTheme(theme)
	}

	const setThemeAndSave = (theme) => {
		localStorage.setItem('theme', theme)
		setTheme(theme)
	}

	const setThemeToSystem = () => {
		localStorage.clear()
		const theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
		setTheme(theme)
		setCurrentTheme('system')
	}

	return <div className="theme-toggle">
		<button onClick={() => setThemeAndSave('dark')} title="Dark" className={currentTheme === 'dark' && 'selected'}>
			{currentTheme === 'dark' ? <RiMoonClearFill /> : <RiMoonClearLine/> }
		</button>
		<button onClick={setThemeToSystem} title="System" className={currentTheme === 'system' && 'selected'}>
			System
		</button>
		<button onClick={() => setThemeAndSave('light')} title="Light" className={currentTheme === 'light' && 'selected'}>
			{currentTheme === 'light' ? <RiSunFill /> : <RiSunLine/> }
		</button>
	</div>
}

export default ThemeToggle
