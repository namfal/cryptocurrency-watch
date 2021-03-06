export function formatPrice (value, currency = 'USD') {
	return `${Number(value).toLocaleString('en', { style: 'currency', currency })}`
}

export function formatDate (isoDate, fullDate = false) {
	const local = new Date(isoDate)
	const hours = local.getHours() > 9 ? local.getHours() : `0${local.getHours()}`
	const minutes = local.getMinutes() > 9 ? local.getMinutes() : `0${local.getMinutes()}`
	if (fullDate) {
		const locale = navigator.languages ? navigator.languages[0] : navigator.language
		return `${local.toLocaleString(locale, { year: 'numeric', month: 'short', day: 'numeric' })}, ${hours}:${minutes}`
	}
	return `${hours}:${minutes}`
}

export function getStartDateAndGranularity (rangeStart) {
	const date = new Date()
	switch (rangeStart) {
	case '12hrs':
		return {
			startDate: new Date(date.getTime() - 43200000),
			granularity: 300
		}
	case '24hrs':
		return {
			startDate: new Date(date.getTime() - 86400000),
			granularity: 300
		}
	case '1week':
		return {
			startDate: new Date(date.getTime() - 604800000),
			granularity: 3600
		}
	case '1month':
		date.setMonth(date.getMonth() - 1)
		return {
			startDate: date,
			granularity: 21600
		}
	case '3months':
		date.setMonth(date.getMonth() - 3)
		return {
			startDate: date,
			granularity: 86400
		}
	default:
		throw new Error('Missing or unsupported parameter for getStartDate method.')
	}
}
