import { Keypair } from "@solana/web3.js";
import bs58 from 'bs58';
import prompt from 'prompt-sync';
import wallet from "./dev-wallet.json";

// Generate a new keypair
let kp = Keypair.generate();
console.log(`You've generated a new Solana wallet: ${kp.publicKey.toBase58()}`);
console.log(`To save your wallet, copy and paste the output of the following into a JSON file:`)
console.log(`[${kp.secretKey}]`);

const promptSync = prompt();

function base_58_to_wallet() {
    console.log("Enter your base58 private key:");
    const base58 = promptSync("");
    const wallet = bs58.decode(base58);
    console.log(wallet);
}

function wallet_to_base58() {
    const base58 = bs58.encode(new Uint8Array(wallet));
    console.log(base58);
}

base_58_to_wallet();
// wallet_to_base58();
