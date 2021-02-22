const currencySymbols = {
	usd: '$',
	eur: '€',
	gbp: '£'
}

export function formatPrice (value, currency = 'usd') {
	return `${currencySymbols[currency]}${Number(value).toLocaleString('en', { minimumFractionDigits: 2 })}`
}
