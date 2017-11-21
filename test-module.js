const blockchain = require('blockchain.info')


const payments = require('./module/payments.js')

/*
    Notes: each customer is an account, each invoice has its own
 */

const customer = 1



// get address
// payments.getAddress(1)
//     .then(function(resp){
//         console.log("resp: ",resp)
//     })

// invoice 10USD
payments.invoice(10,'1HtSs7tmDFs6wjtQZDsJx3AaYgFxAgL1v8')
    .then(function(resp){
        console.log("resp: ",resp)
    })

// lookup payment for customer
// payments. paymentsByAddress('1HtSs7tmDFs6wjtQZDsJx3AaYgFxAgL1v8')
//     .then(function(resp){
//         console.log("resp: ",resp)
//     })


// lookup global payments

