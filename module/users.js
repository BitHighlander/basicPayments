
let TAG = " | users | "

const config = require('../secrets.js')
const monk = require('monk')

const db = require('monk')('localhost/dev')
const users = db.get("users");
const transactions = db.get("transactions");
users.createIndex({id: 1}, {unique: true})
transactions.createIndex({txid: 1}, {unique: true})


const payments = require('./payments.js')


module.exports = {
    createUser: function (user) {
        return create_user(user);
    },
    getBalance: function (user) {
        return get_balance(user);
    },
    // credit user balance
    credit: function (user,amount,currency) {
        return credit_user(user,amount,currency);
    },
    // paymentsByAddress()
    debit: function (user,amount,currency) {
        return debit_user(user,amount,currency);
    },
}


const get_balance = async function(user) {
    let tag = TAG+" | get_balance | "
    let debug = true
    try {
        if(!user) throw Error("101: missing user param!")
        let output = {}
        if(debug) console.log(tag,"checkpoint1 ")

        //monk get user
        let userInfo = await users.find({email:user})
        if(debug) console.log(tag,"user: ",userInfo)
        if(userInfo.length == 0) throw Error("102: unknown user!")
        if(userInfo.length > 1) throw Error("103: multiple users with same email!")
        userInfo = userInfo[0]
        //get address for user
        if(!userInfo.bitcoin) throw Error("104: invalid user!")

        //get payments
        let bitcoinTxs = await payments.paymentsByAddress(userInfo.bitcoin)
        if(!bitcoinTxs.txs) throw Error("105: invalid response from blockchain.info!")
        if(debug) console.log(tag,"bitcoinTxs: ",bitcoinTxs)
        bitcoinTxs = bitcoinTxs.txs

        for (let i = 0; i < bitcoinTxs.length; i++) {
            if(!bitcoinTxs[i].hash) throw Error("106: invalid transaction!")
            let txInfo = normalize_bitcoin_tx(bitcoinTxs[i],userInfo.bitcoin)
            if(debug) console.log(tag,"txInfo: ",txInfo)
            let result = await transactions.upsert(txInfo)
            if(debug) console.log(tag,"txInfo: ",txInfo)
            if(result.updated === 1 && result.status === "accepted"){
                //credit user!
                //amount satoshi to BTC
                let amountBtc = txInfo.received * 100000000
                credit_user(user,amountBtc,"BTC")
            }

        }


        return output
    } catch (err) {
        console.error(err);
        throw Error(err);
    }
};

//TODO

//credit

//debit

let normalize_bitcoin_tx = function(tx,ourAddress){
    let debug = true
    let tag = " | normalize_bitcoin_tx | "
    let output = {}
    output.received = 0
    output.confirmed = false
    output.txid = tx.hash
    output.status = "unknown"

    //isConfirmed
    if(tx.block_height){
        output.confirmed == true
    }


    //scan outputs for payments
    for (let i = 0; i < tx.out.length; i++) {
        let outTx = tx.out[i]
        if(debug) console.log(tag,"outTx: ",outTx)

        // NOTE!: if rbf AND unconfirmed then DO NOT ACCEPT!
        if (outTx.addr === ourAddress){
            console.log("our address! payment! yay!")
            if(debug) console.log(tag,"tx.rbf: ",tx.rbf)
            if(debug) console.log(tag,"outTx.confirmed: ",outTx.confirmed)

            if(tx.rbf && !outTx.confirmed){
                output.status = "RBF! untrusted!"
            } else {
                output.received = output.received + output.value
                output.status = "accepted"
            }

        } else{
            console.log("not our address! probably change!")
        }
    }

    return output
}