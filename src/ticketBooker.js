const options = require('./assets/tickets.json')
const acceptedPromoCodes = require('./assets/promoCodes.json')
const frequentFlyerUsers = require('./assets/frequentFlyerUsers.json');
const { consoleMessages } = require('./helpers/messages');
const prompt = require('prompt-sync')({sigint: true});
const tickets = options.tickets;
const { getShortestTickets, getCheapestTicket } = require('./handlers/specificFunctionsHandler')

giveMultipleTicketDescription(tickets);

//Get ticket with shortest flight duration, can get more than one.
let shortestTickets = getShortestTickets(tickets);

//From the shortest flight duration tickets, choose the cheapest one.
let cheapestTicket = getCheapestTicket(shortestTickets);

//Give ticket info and baggage description for cheapest ticket.
giveTicketDescription(cheapestTicket);
giveTicketBaggageDescription(cheapestTicket);

//Baggage management logic
addExtraBaggage();

//Promo code management logic
promoCodeManagement();

//Frequent Flyer account login logic
frequentFlyerLogin();

//Book ticket logic
bookTicketCheck();

function giveMultipleTicketDescription(tickets) {
  console.log(consoleMessages.ticketOptions, options.from, options.to);
  for(let i = 0; i < tickets.length; i++) {
    console.log(consoleMessages.ticketDescription, i+1, tickets[i].brand, tickets[i].price,numberToTime(tickets[i].flightDuration))
  }
}

function giveTicketDescription(ticket) {
  console.log(consoleMessages.selectTicketOptions)
  console.log(consoleMessages.ticketDescriptionWithoutOptionNumber, ticket.brand, ticket.price, numberToTime(ticket.flightDuration))
}

function giveTicketBaggageDescription(ticket) {
  console.log(consoleMessages.ticketBaggageDescription, ticket.baggage.carryOn, ticket.baggage.checkedBag)
  console.log(consoleMessages.extraBaggageFeeWarning)
  console.log(consoleMessages.baggageFeeDescription, ticket.brand, ticket.baggageFee.carryOn, ticket.baggageFee.checkedBag)
}

function addExtraBaggage() {
  extraBaggageExists = prompt(consoleMessages.extraBaggageQuestion);
  switch(extraBaggageExists) {
  default:
    console.log(consoleMessages.invalidInput)
    addExtraBaggage()
    break; 
    case 'N':
      console.log(consoleMessages.noExtraBaggageAdded, cheapestTicket.price)
      newTicketPrice = cheapestTicket.price;
      break; 
    case 'Y':
      baggageTypeToAdd()
  }
}

function baggageTypeToAdd() {
  let baggageType = prompt(consoleMessages.baggageKindQuestion)
  switch (baggageType) {
    case 'Carry on':
      carryOnBaggageManagement(cheapestTicket.price, cheapestTicket.baggageFee.carryOn)
      break;
    case 'Checked':
      checkedBaggageManagement(cheapestTicket.price, cheapestTicket.baggageFee.checkedBag)
      break;
    case 'Both':
      managementForBothBaggageTypes()
      break;
  default:
    console.log(consoleMessages.invalidInput)
    baggageTypeToAdd()
    break; 
  }
}

function carryOnBaggageManagement(ticketPrice, baggageFee) {
  if(cheapestTicket.baggage.carryOn == 0) {
    let extraBaggage = prompt(consoleMessages.carryOnBaggageAmountQuestion);
    extraBaggage = Number(extraBaggage)
    if(extraBaggage <= 0 || isNaN(extraBaggage)) {
      console.log(consoleMessages.invalidInput)
      carryOnBaggageManagement(cheapestTicket.price, cheapestTicket.baggageFee.carryOn)
    } else {
      let baggageSum = cheapestTicket.baggage.carryOn + extraBaggage
      if(baggageSum > 1) {
        console.log(consoleMessages.maxCarryOnBaggageExceded)
        carryOnBaggageManagement(cheapestTicket.price, cheapestTicket.baggageFee.carryOn)
      } else {
        newTicketPrice = ticketPrice + (extraBaggage * baggageFee)
        console.log(consoleMessages.addedCarryOnBags, extraBaggage, newTicketPrice)
      }
    }
  } else {
    console.log(consoleMessages.maxCarryOnBaggageReached)
  }
  return newTicketPrice
}

function checkedBaggageManagement(ticketPrice, baggageFee) {
  console.log(consoleMessages.checkedBaggageAmountQuestion, cheapestTicket.baggage.checkedBag)
  let extraBaggage = prompt();
  extraBaggage = Number(extraBaggage)
  if(extraBaggage <= 0 || isNaN(extraBaggage)) {
    console.log(consoleMessages.invalidInput)
    checkedBaggageManagement(ticketPrice, cheapestTicket.baggageFee.checkedBag)
  } else {
    let baggageSum = cheapestTicket.baggage.checkedBag + extraBaggage
    if(baggageSum > 3) {
      console.log(consoleMessages.maxCheckedBaggageExceded)
      checkedBaggageManagement(ticketPrice, cheapestTicket.baggageFee.checkedBag)
    } else {
      newTicketPrice = ticketPrice + (extraBaggage * baggageFee)
      console.log(consoleMessages.addedCheckedBags, extraBaggage, newTicketPrice)
    }
  }
}

function managementForBothBaggageTypes() {
  newTicketPrice = carryOnBaggageManagement(cheapestTicket.price, cheapestTicket.baggageFee.carryOn)
  checkedBaggageManagement(newTicketPrice, cheapestTicket.baggageFee.checkedBag)
}

function promoCodeManagement() {
  let promoCodeExists = prompt(consoleMessages.promoCodeQuestion);
  switch(promoCodeExists) {
  default:
    console.log(consoleMessages.invalidInput)
    promoCodeManagement()
    break;
    case 'N':
      console.log(consoleMessages.noPromoCodeApplied)
      giveTicketDescriptionWithChangedPrice(cheapestTicket, newTicketPrice);
      break;
    case 'Y':
      promoCodeSelection()
  }
}

function promoCodeSelection() {
  let promoCode = prompt(consoleMessages.enterPromoCode)
    switch (promoCode) {
      case acceptedPromoCodes.promo20.code:
        ticketPriceRecalculationWithPromo20(newTicketPrice, acceptedPromoCodes.promo20.discount)
        break;
      case acceptedPromoCodes.promo30.code:
        ticketPriceRecalculationWithPromo30(newTicketPrice, acceptedPromoCodes.promo30.discount)
        break;
      case acceptedPromoCodes.promoFree.code:
        ticketPriceRecalculationWithPromoFree(newTicketPrice, acceptedPromoCodes.promoFree.discount)
        break;
    default:
      console.log(consoleMessages.enteredIvalidPromoCode);
      console.log(consoleMessages.finalTicketSelection);
      giveTicketDescriptionWithChangedPrice(cheapestTicket, newTicketPrice);
      break;
    }
}

function ticketPriceRecalculationWithPromo20(ticketPrice, discount) {
  discountedTicketPrice = ticketPrice * (1 - discount);
  console.log(consoleMessages.promoCodeApplied, 20, newTicketPrice, discountedTicketPrice)
  console.log(consoleMessages.finalTicketWithPromoCodeApplied, cheapestTicket.brand, discountedTicketPrice, numberToTime(cheapestTicket.flightDuration))
}

function ticketPriceRecalculationWithPromo30(ticketPrice, discount) {
  discountedTicketPrice = ticketPrice * (1 - discount);
  console.log(consoleMessages.promoCodeApplied, 30, newTicketPrice, discountedTicketPrice)
  console.log(consoleMessages.finalTicketWithPromoCodeApplied, cheapestTicket.brand, discountedTicketPrice, numberToTime(cheapestTicket.flightDuration))
}

function ticketPriceRecalculationWithPromoFree(ticketPrice, discount) {
  discountedTicketPrice = ticketPrice * (1 - discount);
  console.log(consoleMessages.promoCodeApplied, 100, newTicketPrice, discountedTicketPrice)
  console.log(consoleMessages.finalTicketWithPromoCodeApplied, cheapestTicket.brand, discountedTicketPrice, numberToTime(cheapestTicket.flightDuration))
}

function frequentFlyerLogin() {
  let frequentFlyerUserExist = prompt(consoleMessages.frequentFlyerAccountQuestion);
  switch (frequentFlyerUserExist) {
  default:
    console.log(consoleMessages.invalidInput)
    frequentFlyerLogin();
    break;
    case 'N':
      console.log(consoleMessages.notFrequentFlyerUser)
      break;
    case 'Y':
      frequentFlyerAccountExistsCheck()
      break;
  }
}

function frequentFlyerAccountExistsCheck() {
  let frequentFlyerNumber = prompt(consoleMessages.enterFrequentFlyerNumber)
  if((frequentFlyerUsers.Users.filter(e => e.FrequentFlyerNumber === frequentFlyerNumber).length > 0)){
    enterFrequentFlyerPassword()
  } else {
    console.log(consoleMessages.wrongUsernameOrPassword)
    frequentFlyerAccountExistsCheck()
  }
}

function enterFrequentFlyerPassword() {
  let frequentFlyerPassword = prompt(consoleMessages.enterFrequentFlyerPassword)
  if(frequentFlyerUsers.Users.some(e => e.Password === frequentFlyerPassword)) {
    console.log(consoleMessages.frequentFlyerLoginSuccessful)
  } else {
    console.log(consoleMessages.wrongUsernameOrPassword)
    enterFrequentFlyerPassword()
  }
}

function giveTicketDescriptionWithChangedPrice(tickets, price) {
  console.log(consoleMessages.ticketDescriptionWithoutOptionNumber, tickets.brand, price, numberToTime(tickets.flightDuration))
}

function bookTicketCheck() {
  let bookedTicket = prompt(consoleMessages.bookTicketQuestion);
  switch (bookedTicket) {
    case 'Y':
      console.log(consoleMessages.bookTicketSuccess)
      break;
    case 'N':
      console.log(consoleMessages.bookTicketCancelled)
      break;
  default:
    console.log(consoleMessages.invalidInput)
    bookTicketCheck()
    break;
  }
}

function numberToTime(number) {
  // Check sign of given number
  var sign = (number >= 0) ? 1 : -1;

  // Set positive value of number of sign negative
  number = number * sign;

  // Separate the int from the decimal part
  var hour = Math.floor(number);
  var decpart = number - hour;

  var min = 1 / 60;
  // Round to nearest minute
  decpart = min * Math.round(decpart / min);

  var minute = Math.floor(decpart * 60) + '';

  // Add padding if need
  if (minute.length < 2) {
  minute = '0' + minute; 
  }

  // Add Sign in final result
  sign = sign == 1 ? '' : '-';

  // Concate hours and minutes
  time = `${hour}h ${minute}m`;

  return time;
}
