const chai = require('chai');
chai.use(require('chai-shallow-deep-equal'));
const expect = require('chai').expect;
const { main } = require('../src/ticketBooker')
const cases = require('./cases.js')
const benchmark = require('./benchmark.js')

describe('Run script with given inputs', () => {
	it('No extra baggage, no discount code. Original price should be the same as final price', () => {
		const result = main(cases.unchangedTicketPrice.args);
		expect(result).to.shallowDeepEqual(benchmark.unchangedTicketPrice.values);
	});
	it('Extra baggage, no discount code. Original price shouldn not be the same as final price', () => {
		const result = main(cases.ticketPriceWithExtraBaggageButNoDiscountCode.args);
		expect(result).to.shallowDeepEqual(benchmark.ticketPriceWithExtraBaggageButNoDiscountCode.values);
	});
	it('Extra baggage, discount code free. Original Price, added baggage price and final discounted price should not be the same', () => {
		const result = main(cases.ticketPriceWithExtraBaggageAndDiscountCode.args);
		expect(result).to.shallowDeepEqual(benchmark.ticketPriceWithExtraBaggageAndDiscountCode.values);
	});
});
