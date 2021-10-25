module.exports = {
	unchangedTicketPrice: {
		originalTicketPrice: 250,
		ticketPriceWithExtraBaggage: 250,
		ticketPriceAfterDiscount: 250,
		values: [250, 250, 250]
	},
  ticketPriceWithExtraBaggageButNoDiscountCode: {
		originalTicketPrice: 250,
		ticketPriceWithExtraBaggage: 310,
		ticketPriceAfterDiscount: 310,
		values: [250, 310, 310]
  },
	ticketPriceWithExtraBaggageAndDiscountCode: {
		originalTicketPrice: 250,
		ticketPriceWithExtraBaggage: 310,
		ticketPriceAfterDiscount: 0,
		values: [250, 310, 0]
  }
}

//cheapestTicket.price, newTicketPrice, discountedTicketPrice
