export const patterns = {
	elevenDigits: /^\d{11}$/,
	tenDigits: /^\d{10}$/,
	accountNumber: /^\d{10,}$/,
	sixDigits: /^\d{6}$/,
	email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
	zeroTo99: /^(0?[0-9]|[1-9][0-9])$/,
	zeroTo999: /^(0|[1-9]\d{0,2})$/,
	oneTo999: /^([1-9]\d{0,2})$/,
	oneTo99: /^(?:[1-9]|[1-9][0-9])$/,
	zeroTo100: /^100$|^[1-9]?\d$/,
	oneTo100: /^([1-9]|[1-9][0-9]|100)$/,
	zeroTo50Characters: /^.{0,50}$/,
	number: /^\d*\.?\d+$/,
	phoneNumber: /^(?:0[9])\d{9}$/,
	ip: /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
	url: /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/,
	price: /^(?:0|[1-9]\d{0,10})$/,
	float: /^(?:0|[1-9][0-9]{0,4})(?:\.[0-9]+)?$/,
};
