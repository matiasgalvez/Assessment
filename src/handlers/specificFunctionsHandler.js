const { consoleMessages } = require('../helpers/messages');

function getShortestTickets(tickets) {
  if(tickets) {
    let shortestValue = tickets[0].flightDuration;
    let shortestTicket = tickets[0];
    let shortestTickets = [];
    for(let i = 0; i < tickets.length; i++) {
      if(tickets[i].flightDuration <= shortestValue) {
        shortestValue = tickets[i].flightDuration;
        shortestTicket = tickets[i];
      }
    }
    for(let i = 0; i < tickets.length; i++) {
      if(tickets[i].flightDuration == shortestValue) {
        shortestTickets.push(tickets[i]);
      }
    }
    return shortestTickets
  } else {
    return process.exit(console.log(consoleMessages.noTicketsFound))
  }
}

function getCheapestTicket(tickets) {
    if(tickets){
      let cheapestValue = tickets[0].price;
      let cheapestTicket = tickets[0];
      for(let i = 0; i < tickets.length; i++) {
          if(tickets[i].price <= cheapestValue) {
          cheapestValue = tickets[i].price;
          cheapestTicket = tickets[i];
          }
      }
      return cheapestTicket
  } else {
    return process.exit(console.log(consoleMessages.noTicketsFound))
  }
}

module.exports = { getShortestTickets, getCheapestTicket }
