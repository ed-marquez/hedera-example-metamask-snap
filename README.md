# Run this dApp using GitPod (Recommended)

[Click here to set up GitPod environment](https://gitpod.io#https://github.com/ed-marquez/hedera-example-metamask-snap).

# Run this dApp locally

Fork the repo. Once you have it locally, run:

### `npm install` and `npm start`

# Process

1. Pair MetaMask wallet (select network and account)
2. Install the Hedera Wallet Snap
3. Get the snap EVM address and send it HBAR to create the corresponding snap account
4. Get the snap account info again to see its balance (and to connect the Hedera Wallet Snap to the MetaMask account - this is done as part of invoking a method for the first time)
5. Call other methods in the Hedera Wallet Snap as desired: `getAccountInfo`, `transferCrypto`
6. Display info and/or results in the console and UI
