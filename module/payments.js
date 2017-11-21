const bitcoinjs = require('bitcoinjs-lib');
const blockchain = require('blockchain.info')
const config = require('../secrets.js')
//console.log(config)

module.exports = {
    getAddress: function (msg) {
        return getDeposit(msg);
    },
    // generate invoice
    invoice: function (amountUSD,address) {
        return build_invoice(amountUSD,address);
    },
    // paymentsByAddress()
    paymentsByAddress: function (address) {
        return blockchain.blockexplorer.getAddress(address);
    },
    // paymentByPubkey()

}




const getDeposit = async function(userIndex) {
    try {
        console.log('userIndex: ', userIndex);
        console.log('config.pubkey: ', pubkey);
        const accountNum = 0;
        const m = bitcoinjs.HDNode.fromBase58(config.pubkey, bitcoinjs.networks.bitcoin);
        const derived1 = m.derive(accountNum); // account
        const derived2 = derived1.derive(userIndex); // index
        const childPubKey = derived2.getAddress();
        return childPubKey;

    } catch (err) {
        console.error(err);
        throw Error(err);
    }
};