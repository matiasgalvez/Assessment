const chai = require('chai');
chai.use(require('chai-shallow-deep-equal'));
const expect = require('chai').expect;
const { getShortestTickets, getCheapestTicket } = require('../src/handlers/specificFunctionsHandler')
const testData = require('./testTickets.json')
const benchmark = require('./benchmark.js')

describe('Test suite for getShortestTickets function', () => {
	it('Should return array with 2 tickets with same flight duration', () => {
		const result = getShortestTickets(testData.getShortestTicketsTestData.firstCaseTickets);
		expect(result).to.shallowDeepEqual(benchmark.getShortestTicketBenchmarks.firstCase)
	}),
  it('Should return array with 1 ticket with shortest flight duration', () => {
		const result = getShortestTickets(testData.getShortestTicketsTestData.secondCaseTickets);
		expect(result).to.shallowDeepEqual(benchmark.getShortestTicketBenchmarks.secondCase)
	})
})

describe('Test suite for getCheapestTicket function', () => {
	it('Should return ticket with cheapest price', () => {
		const result = getCheapestTicket(testData.getCheapestTicketTestData.firstCaseTickets);
    expect(result).to.shallowDeepEqual(benchmark.getCheapestTicketBenchmarks.firstCase)
	})
  it('Should return ticket with cheapest price', () => {
		const result = getCheapestTicket(testData.getCheapestTicketTestData.secondCaseTickets);
    expect(result).to.shallowDeepEqual(benchmark.getCheapestTicketBenchmarks.secondCase)
	})
})
