const currencySymbols = {
	usd: '$',
	eur: '€',
	gbp: '£'
}

export function formatPrice (value, currency = 'usd') {
	return `${currencySymbols[currency]}${Number(value).toLocaleString('en', { minimumFractionDigits: 2 })}`
}

export function formatDate (isoDate, fullDate = false) {
	const local = new Date(isoDate)
	if (fullDate) {
		// while this works well, it is not in the local style
		// const [, month, date, year] = local.toString().split(' ')
		// return `${month} ${date}, ${year}`
		const locale = navigator.languages ? navigator.languages[0] : navigator.language
		return local.toLocaleString(locale, { year: 'numeric', month: 'short', day: 'numeric' })
	}
	const hours = local.getHours() > 9 ? local.getHours() : `0${local.getHours()}`
	const minutes = local.getMinutes() > 9 ? local.getMinutes() : `0${local.getMinutes()}`
	return `${hours}:${minutes}`
}
