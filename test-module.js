const blockchain = require('blockchain.info')


const payments = require('./module/payments.js')

/*
    Notes: each customer is an account, each invoice has its own address
 */

const customer = 1

//1Mp919RSyakLm9juyzwDicVXBVdxvqw9Mb


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
payments. paymentsByAddress('19eofCdUarH39CaK8nfkrzyaUHo8AcbjdT')
    .then(function(resp){
        console.log("resp: ",resp)
        console.log("resp: ",resp.txs[0].inputs)
        console.log("resp: ",resp.txs[0].out)
    })


// lookup global payments

