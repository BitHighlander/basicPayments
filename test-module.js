
const blockchain = require('blockchain.info')


const payments = require('./module/payments.js')
const users = require('./module/users.js')
//
// /*
//     Notes: each customer is an account, each invoice has its own address
//  */
//
//
//
//
//
//
// //const customer = 1
//
// //1Mp919RSyakLm9juyzwDicVXBVdxvqw9Mb
//
let user = "bithighlander@gmail.com"
users.getBalance(user)
    .then(function(resp){
        console.log("resp: ",resp)
    })


//get address
// payments.getAddress(3)
//     .then(function(resp){
//         console.log("resp: ",resp)
//     })

// invoice 10USD
// payments.invoice(10,'19eofCdUarH39CaK8nfkrzyaUHo8AcbjdT')
//     .then(function(resp){
//         console.log("resp: ",resp)
//     })


// lookup payment for customer
// payments. paymentsByAddress('19eofCdUarH39CaK8nfkrzyaUHo8AcbjdT')
//     .then(function(resp){
//         console.log("resp: ",resp)
//         console.log("resp: ",resp.txs[0].inputs)
//         console.log("resp: ",resp.txs[0].out)
//     })


// payments. paymentsByAddress('15k8hyqdL5XbXs1e1hyDGXbBygvwWdnbun')
//     .then(function(resp){
//         console.log("resp: ",resp)
//         console.log("resp: ",resp.txs[0].inputs)
//         console.log("resp: ",resp.txs[0].out)
//     })

// lookup global payments

