import BlockChain from './src/blockchain';
import Transaction from './src/transaction';
import { ec as EC } from 'elliptic';

const ec = new EC('secp256k1');
// Generate a pair of private and public keys with tools.
const myPrivateKey = '1c258d67b50bda9377c1badddd33bc815eeac8fcb9aee5d097ad6cedc3d2310c';
const myPublicKey = '04f1aa4d934e7f2035a6c2a2ebc9daf0e9ca7d13855c2a0fb8696ab8763e5ee263c803dfa7ac5ae23b25fb98151c99f91c55e89586717965758e6663772ebccd1b';

const myKey = ec.keyFromPrivate(myPrivateKey);
// Derive the public key from the private key
const myWalletAddress = myKey.getPublic('hex');
// Looking at the output, I did get the public key from the private key.
console.log("is the myWalletAddress from privateKey equals to publicKey?", myWalletAddress === myPublicKey);

let simpleCoin = new BlockChain();

const alicePublicKey = '047058e794dcd7d9fb0a256349a5e2d4d724b50ab8cfba2258e1759e5bd4c81bb6ac1b0490518287ac48f0f10a58dc00cda03ffd6d03d67158f8923847c8ad4e7d';
// Initiate a transaction and transfer 60 from your own account to Alice's account.
const tx1 = new Transaction(myWalletAddress, alicePublicKey, 60);
// Sign with private key
tx1.signTransaction(myKey);
// Submit a transaction
simpleCoin.addTransaction(tx1);

console.log('starting the miner...');
simpleCoin.minePendingTransactions(myWalletAddress);
// If the transfer is successful, the balance of Alice's account will be 60.
console.log("Balance of Alice's account is: ", simpleCoin.getBalanceOfAddress(alicePublicKey));

// // Initiate a transaction and transfer back to your account from Alice's account
// const tx2 = new Transaction(alicePublicKey, myWalletAddress, 20);
// // You still sign with your private key, but doing so will cause an error. Because you don't know Alice's key, you cannot operate your account. That is, your key cannot open Alice's account.
// tx2.signTransaction(myKey);
// simpleCoin.minePendingTransactions(myWalletAddress);