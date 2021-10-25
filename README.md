Ticket Booker Project made by Matias Galvez for the following assessment:

Booking Tickets to Travel!

Consider booking tickets to travel by flight from Miami to California. The shortest and cheapest mode should be selected giving higher preference to shortest and then cheapest. Should allow any extra features like the inclusion of extra baggage, discount based on Promo Code, or facilities for frequent travelers such as the special lounge.


Acceptance Criteria 1: Script should be functional and running

Acceptance Criteria 2: The quality of code should align with the best practices.

For this task I based the scope of my project in the results of reasearches done of webpages dedicated to booking Flight tickets to see how they manage features, such as:
- kayak.com
- aa.com
- priceline.com
As result of this research, I provide available flight tickets in a json file, and each ticket includes the following properties:
- brand: company that provides the flight ticket
- price: base price for the ticket
- flightDuration: duration of flight measured in hours and minutes (number of stops included in this value)
- baggage: baggage included in the flight ticket without fee (as seen on the above webpages there's a limit to how many carry on and checked bags a passenger can have, usually 1 for carry on and 2 for checked bags)
- baggageFee: fee charged by airline for each extra baggage bag not included in the ticket (values based on for each airline kayak.com)
Based on research on how the Frequent Flyer system works, done in webpages such as:
- aircanada.com
- aa.com
Accounts with Frequent Flyer number and Password are provided in a json file to determine if the chosen ticket package will include Frequent Flyer features such as the special lounge.
As for promo codes, the ones provided in the promoCodes.json file are just examples to show how they can be applied to tickets in the ticket booker.

For use cases considered in this project, I validate that all inputs done by the user are inputs that represent options in the script, if an invalid input is entered the user is asked to retry the operation until a correct input is entered.

For unit testing, I'll use the Mocha framework in combination with the Chai assertion library to focus on testing the most important functions of the script :
- getShortestTickets(tickets)
- getCheapestTicket(shortestTickets)

For API testing, I'll use the Mocha framework in combination with the Chai assertion library to automate 3 script runs covering the different values the ticket price can take according to extra baggage and discount code inputs.

Installation and Execution
1. Install node v16.1.0 and npm.
2. Clone repository.
3. Run "npm install" in terminal standing in root of repository to install dependencies.
4. To run script, in terminal, run "npm run script".
5. To run unit tests, in terminal, run "npm run unit-test".
6. To run API tests, in terminal, run "npm run api-test"
