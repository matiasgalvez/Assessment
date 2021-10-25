module.exports = {
	unchangedTicketPrice: {
		extraBaggage: 'N',
		discountCode: 'N',
		frequentFlyerUser: 'N',
		bookTicket: 'Y',
		args: ['N', 'N', 'N', 'Y']
	},
	ticketPriceWithExtraBaggageButNoDiscountCode: {
		extraBaggage: 'Y',
		discountCode: 'N',
		frequentFlyerUser: 'N',
		bookTicket: 'Y',
		extraBaggageType: 'Both',
		extraCarryOnQuantity: '1',
		extraCheckedQuantity: '1',
		args: ['Y', 'N', 'N', 'Y', 'Both', '1', '1']
	},
	ticketPriceWithExtraBaggageAndDiscountCode: {
		extraBaggage: 'Y',
		discountCode: 'Y',
		frequentFlyerUser: 'N',
		bookTicket: 'Y',
		extraBaggageType: 'Both',
		extraCarryOnQuantity: '1',
		extraCheckedQuantity: '1',
		discountCodeValue: 'free',
		args: ['Y', 'Y', 'N', 'Y', 'Both', '1', '1', 'free']
	},
}
