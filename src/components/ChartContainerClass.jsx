import React from 'react'
import '../styles/chart.css'
import { getHistoricalData } from '../services/services'
import { throttle } from 'lodash'
import Chart from './Chart'
import RadioButtons	from './RadioButtons'
import CurrentValue from './ChartContainer'
import { formatPrice } from '../utils'

class ChartContainerClass extends React.Component {
	constructor (props) {
		super(props)
		this.socket = new WebSocket('wss://ws-feed.gdax.com')
		this.state = {
			data: [],
			currency: 'USD',
			crypto: 'BTC'
		}
		this.handleCurrencyChange = this.handleCurrencyChange.bind(this)
		this.handleCryptoChange = this.handleCryptoChange.bind(this)
	}

	async componentDidMount () {
		await this.loadHistoricalData()

		this.socket.onopen = (e) => {
			this.socket.send(JSON.stringify(this.getSubscription()))
		}

		this.socket.onerror = (error) => {
			console.error(`[error] ${error.message}`)
		}

		this.socket.onclose = (e) => {
			if (!e.wasClean) {
				console.error('[close] Connection died due to a problem')
			}
		}

		this.socket.onmessage = throttle((e) => {
			const newData = JSON.parse(e.data)
			if (newData.type === 'ticker') {
				this.setState({
					data: [...this.state.data, {
						date: newData.time,
						value: Number(newData.price)
					}]
				})
			}
		}, 5000)
	}

	async componentDidUpdate (prevProps, prevState, snapshot) {
		if (prevState.currency !== this.state.currency) {
			this.setState({ data: [] })
			await this.loadHistoricalData()
			this.unsubscribe()
			this.subscribe()
		}
	}

	componentWillUnmount () {
		this.socket.close()
	}

	async loadHistoricalData () {
		try {
			const resp = await getHistoricalData(`BTC-${this.state.currency}`)
			this.setState({ data: resp })
		} catch (e) {
			console.error(e.message)
		}
	}

	handleCurrencyChange (value) {
		this.setState({ currency: value })
	}

	handleCryptoChange (value) {
		this.setState({ crypto: value })
	}

	getSubscription () {
		return {
			type: 'subscribe',
			channels: [
				{
					name: 'ticker',
					product_ids: [`BTC-${this.state.currency}`]
				}
			]
		}
	}

	unsubscribe () {
		this.socket.send(JSON.stringify({
			type: 'unsubscribe',
			channels: [{ name: 'ticker' }]
		}))
	}

	subscribe () {
		this.socket.send(JSON.stringify(this.getSubscription()))
	}

	getPair () {
		return `${this.state.crypto}-${this.state.currency}`
	}

	render () {
		if (this.state.data.length === 0) {
			return <div className="chart-container centered">
				<div className="loading">Loading<span>.</span><span>.</span><span>.</span></div>
			</div>
		}

		const currentValue = this.state.data[this.state.data.length - 1].value

		return <div className="chart-container">
			<div className="chart-titles">
				<CurrentValue>{this.getPair()}</CurrentValue>
				{
					this.state.data.length > 0 &&
					<CurrentValue>{formatPrice(currentValue, this.state.currency)}</CurrentValue>
				}
			</div>
			<Chart data={this.state.data} currency={this.state.currency}/>
			<div className="chart-controls">
				<RadioButtons
					options={['BTC', 'ETH', 'LTC', 'BCH', 'ETC']}
					name="crypto"
					handleClick={this.handleCryptoChange}
					currentValue={this.state.crypto}
				/>
				<RadioButtons
					options={['USD', 'EUR', 'GBP']}
					name="currency"
					handleClick={this.handleCurrencyChange}
					currentValue={this.state.currency}
				/>
			</div>
		</div>
	}
}

export default ChartContainerClass
