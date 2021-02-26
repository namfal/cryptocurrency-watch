const currencySymbols = {
	USD: '$',
	EUR: '€',
	GBP: '£'
}

export function formatPrice (value, currency = 'USD') {
	return `${currencySymbols[currency]}${Number(value).toLocaleString('en', { minimumFractionDigits: 2 })}`
}

export function formatDate (isoDate, fullDate = false) {
	const local = new Date(isoDate)
	if (fullDate) {
		const locale = navigator.languages ? navigator.languages[0] : navigator.language
		return local.toLocaleString(locale, { year: 'numeric', month: 'short', day: 'numeric' })
	}
	const hours = local.getHours() > 9 ? local.getHours() : `0${local.getHours()}`
	const minutes = local.getMinutes() > 9 ? local.getMinutes() : `0${local.getMinutes()}`
	return `${hours}:${minutes}`
}
