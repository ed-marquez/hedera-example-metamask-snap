async function snapTransferCryptoFcn(walletData) {
	console.log(`\n=======================================`);
	console.log(`- Invoking transferCrypto...🟠`);

	const snapId = `npm:@hashgraph/hedera-wallet-snap`;

	const externalAccountParams = {
		externalAccount: {
			accountIdOrEvmAddress: "0.0.1804",
			curve: "ECDSA_SECP256K1",
		},
	};

	const transfers = [
		{
			asset: "HBAR",
			to: "0xb49efeb88938b9046365dc347c7d40213b6c8f93",
			amount: 10, // in Hbar
		},
	];

	// If you're sending to an exchange account,
	// you will likely need to fill this out
	const memo = "";

	await window.ethereum.request({
		method: "wallet_invokeSnap",
		params: {
			snapId,
			request: {
				method: "transferCrypto",
				params: {
					network: "previewnet",
					transfers,
					memo,
					maxFee: undefined,
					/* 
				Uncomment the below line if you want to connect 
				to a non-metamask account
			  */
					// ...externalAccountParams,
				},
			},
		},
	});
}
export default snapTransferCryptoFcn;
