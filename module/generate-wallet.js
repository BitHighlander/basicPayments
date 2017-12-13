// var coininfo = require('coininfo')
// //const bitcoinjs = require('bitcoinjs-lib')
// var bitcoinjs = coininfo.toBitcoinJS()
// var dogecoin = coininfo.dogecoin.main
const HDKey = require('hdkey')
const bitcoinjs = require('bitcoinjs-lib')
const bip39 = require('bip39')
const CoinKey = require('coinkey')

var coininfo = require('coininfo')
//console.log(coininfo.bitcoin.main.versions.bip32)


let mnemonic = bip39.generateMnemonic()
console.log("mnemonic: ",mnemonic)

//get pubkey
let seed = bip39.mnemonicToSeedHex(mnemonic)
//console.log("seed: ",seed)
let mk = HDKey.fromMasterSeed(new Buffer(seed, 'hex'), coininfo.bitcoin.main.versions.bip32)
//console.log("mk: ",mk)
let masterPrivKey = mk.derive("m/44'/0'/0'")
//console.log("masterPrivKey: ",masterPrivKey)

let parentPubKey = masterPrivKey.publicExtendedKey.toString('hex')
console.log("parentPubKey: ",parentPubKey)
//



//let network = bitcoinjs.networks.bitcoin
//console.log(network)
//console.log(bitcoinBitcoinJSLib)

let m = bitcoinjs.HDNode.fromBase58(parentPubKey, network)

//let mk = new HDKey.fromMasterSeed(new Buffer(seed, 'hex'), coininfo(numOfCoins[i]).versions.bip32)

let addressType = 1
let index = 1
let account = 0
let derived1 = m.derive(account) // account
let derived2 = derived1.derive(addressType) // index
let derived3 = derived2.derive(index)
let childPubKey = derived3.getAddress()
let addressObject = {
    extendedKey: derived2.getPublicKeyBuffer().toString('hex'),
    address_type: this.type,
    bip32_branch: `m/44'/${this.slip44}/${account}/${addressType}/${index}`,
    bip32_index: index,
    hash160: bitcoinjs.crypto.hash160(derived3.getPublicKeyBuffer()).toString('hex'),
    address: childPubKey
}

console.log(addressObject)
