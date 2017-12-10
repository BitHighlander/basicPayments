
const payments = require('./module/payments.js')


module.exports = {
    getBalance: function (user) {
        return get_balance();
    },
    // generate invoice
    credit: function (user,amount,currency) {
        return credit_user(user,amount,currency);
    },
    // paymentsByAddress()
    debit: function (user,amount,currency) {
        return debit_user(user,amount,currency);
    },
}


const get_balance = async function(address) {
    try {
        let output = {}

        //monk get user

        //get address for user
        let payments = await payments. paymentsByAddress('19eofCdUarH39CaK8nfkrzyaUHo8AcbjdT')

        //if payments count > mongo tx count

        //lookup by txid
            //goes txid exsit
            //if not credit user and insert to mongo


        return output
    } catch (err) {
        console.error(err);
        throw Error(err);
    }
};
