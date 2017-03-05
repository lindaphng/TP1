'use strict';

//list of cars
//useful for ALL exercises
var cars = [{
  'id': 'p306',
  'vehicule': 'peugeot 306',
  'pricePerDay': 20,
  'pricePerKm': 0.10
}, {
  'id': 'rr-sport',
  'pricePerDay': 60,
  'pricePerKm': 0.30
}, {
  'id': 'p-boxster',
  'pricePerDay': 100,
  'pricePerKm': 0.45
}];

//list of rentals
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var rentals = [{
  'id': '1-pb-92',
  'driver': {
    'firstName': 'Paul',
    'lastName': 'Bismuth'
  },
  'carId': 'p306',
  'pickupDate': '2016-01-02',
  'returnDate': '2016-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '2-rs-92',
  'driver': {
    'firstName': 'Rebecca',
    'lastName': 'Solanas'
  },
  'carId': 'rr-sport',
  'pickupDate': '2016-01-05',
  'returnDate': '2016-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '3-sa-92',
  'driver': {
    'firstName': ' Sami',
    'lastName': 'Ameziane'
  },
  'carId': 'p-boxster',
  'pickupDate': '2015-12-01',
  'returnDate': '2015-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}];

//list of actors for payment
//useful from exercise 5
var actors = [{
  'rentalId': '1-pb-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '2-rs-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '3-sa-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}];

//list of rental modifcation
//useful for exercise 6
var rentalModifications = [{
  'rentalId': '1-pb-92',
  'returnDate': '2016-01-04',
  'distance': 150
}, {
  'rentalId': '3-sa-92',
  'pickupDate': '2015-12-05'
}];

console.log(cars);
console.log(rentals);
console.log(actors);
console.log(rentalModifications);






// Exercise 1 - Euro/Kilometers


/*
Convert a string to a Date
@param(string) 
@return(Date)
*/
function convertDate(str) 
{
  var re = /[0-9]+/g;
  var result = re[Symbol.match](str);

  var dateLoc = new Date(result[0], result[1]-1, result[2]);

  return dateLoc;
}

/*
Compute the number of the days from milliseconds between two dates
@param(string, string)
Then convert to Date
@return(number) 
*/
function getDays(beginDate, returnDate)
{
  var begin = new convertDate(beginDate).getTime();
  var end = new convertDate(returnDate).getTime();

  var days = (end - begin) / (1000*60*60*24);

  return days;
}

/*
Browse the table cars to find the pricePerDay using id
@param(string)
@return(number)
*/
function getPricePerDay(carId)
{
  for (var i = 0; i < cars.length; i++)
  {
    if (carId == cars[i].id)
    {
      return cars[i].pricePerDay;
    }
  }
}

/*
Browse the table cars to find the pricePerKm using id
@param(string)
@return(number)
*/
function getPricePerKm(carId)
{
  for (var i = 0; i < cars.length; i++)
  {
    if (carId == cars[i].id)
    {
      return cars[i].pricePerKm;
    }
  }
}

/*
Compute the price of the renting and modify the amount in the table
@param(table)
*/
function price1(rentals)
{
  for (var i = 0; i < rentals.length; i++) // Browze the table rentals
  {
    var time = getDays(rentals[i].pickupDate, rentals[i].returnDate); // time is the number of days of the renting

    rentals[i].price = (time * getPricePerDay(rentals[i].carId)) + (rentals[i].distance * getPricePerKm(rentals[i].carId));
  }
}

price1(rentals);
console.log(rentals);






// Exercise 2 - Drive more, pay less


/*
Compute the price of the renting WITH THE DISCOUNTS and modify the amount in the table
@param(table)
*/
function price2(rentals)
{
  for (var i = 0; i < rentals.length; i++)
  {
    var time = getDays(rentals[i].pickupDate, rentals[i].returnDate);

    if (time < 1)
    {
      rentals[i].price = (time * getPricePerDay(rentals[i].carId)) + (rentals[i].distance * getPricePerKm(rentals[i].carId));
    }
    if (time >= 1 && time < 4)
    {
      rentals[i].price = (time * getPricePerDay(rentals[i].carId) * 0.9) + (rentals[i].distance * getPricePerKm(rentals[i].carId));
    }
    if (time >= 4 && time < 10)
    {
      rentals[i].price = (time * getPricePerDay(rentals[i].carId) * 0.7) + (rentals[i].distance * getPricePerKm(rentals[i].carId));
    }
    if (time >= 10)
    {
      rentals[i].price = (time * getPricePerDay(rentals[i].carId) * 0.5) + (rentals[i].distance * getPricePerKm(rentals[i].carId));
    }
  }
}

price2(rentals);
console.log(rentals);






// Exercise 3 - Give me all your money

/*
Compute the amount that belongs to the insurance, to the assistance and to drivy
and modify these amounts in the table
@param(table)
*/
function splitCommission(rentals)
{
  for (var i = 0; i < rentals.length; i++)
  {
    var com = rentals[i].price * 0.3;
    rentals[i].commission.insurance = com / 2;
    rentals[i].commission.assistance = 1 * getDays(rentals[i].pickupDate, rentals[i].returnDate);
    rentals[i].commission.drivy = com - (rentals[i].commission.insurance + rentals[i].commission.assistance);
  }
}

splitCommission(rentals);
console.log(rentals);





// Exercise 4 - The famous deductible

/*
Add the charge of the deductible option (if the customer chose it) 
to the total amount depending on the days
@param(table)
*/
function deductible(rentals)
{
  for (var i = 0; i < rentals.length; i++)
  {
    if (rentals[i].options.deductibleReduction == true)
    {
      rentals[i].price += 4 * getDays(rentals[i].pickupDate, rentals[i].returnDate);
    }
  }
}

deductible(rentals);
console.log(rentals);





// Exercise 5 - Pay the actors

/*
Browse the table rentals to find the price using id
@param(string)
@return(number)
*/
function getRentalsPrice(rentalId)
{
  for (var i = 0; i < rentals.length; i++)
  {
    if (rentalId == rentals[i].id)
    {
      return rentals[i].price;
    }
  }
}

/*
Browse the table rentals to find the insurance commission amount using id
@param(string)
@return(number)
*/
function getRentalsInsurance(rentalId)
{
  for (var i = 0; i < rentals.length; i++)
  {
    if (rentalId == rentals[i].id)
    {
      return rentals[i].commission.insurance;
    }
  }
}

/*
Browse the table rentals to find the assistance commission amount using id
@param(string)
@return(number)
*/
function getRentalsAssistance(rentalId)
{
  for (var i = 0; i < rentals.length; i++)
  {
    if (rentalId == rentals[i].id)
    {
      return rentals[i].commission.assistance;
    }
  }
}

/*
Browse the table rentals to find the drivy commission amount using id
@param(string)
@return(number)
*/
function getRentalsDrivy(rentalId)
{
  for (var i = 0; i < rentals.length; i++)
  {
    if (rentalId == rentals[i].id)
    {
      return rentals[i].commission.drivy;
    }
  }
}

/*
Compute the debit/credi for each actor (driver, owner, insurance, assistance and drivy)
Add these amounts to the table actors
@param(table)
*/
function payActors(actors)
{
  for (var i = 0; i < actors.length; i++)
  {

    actors[i].payment[0].amount = getRentalsPrice(actors[i].rentalId);
    
    actors[i].payment[1].amount = getRentalsPrice(actors[i].rentalId) 
                                  - (getRentalsInsurance(actors[i].rentalId) 
                                  + getRentalsAssistance(actors[i].rentalId) 
                                  + getRentalsDrivy(actors[i].rentalId)) ;
    
    actors[i].payment[2].amount = getRentalsInsurance(actors[i].rentalId);
    
    actors[i].payment[3].amount = getRentalsAssistance(actors[i].rentalId);
    
    actors[i].payment[4].amount = getRentalsDrivy(actors[i].rentalId);
        
  }
}

payActors(actors);
console.log(actors);






// Exercise 6 - Rental modification



function modifier(rentalModifications)
{
  for (var i = 0; i < rentalModifications.length; i++)
  {

  }
}
