async function snapTransferCryptoFcn(network, walletData, snapId, args) {
	console.log(`\n=======================================`);
	console.log(`- Invoking transferCrypto...🟠`);

	const receiverAddress = args[0];
	const hbarAmount = parseFloat(args[1]);
	const maxFee = 0.1;

	const transfers = [
		{
			asset: "HBAR",
			to: receiverAddress,
			amount: hbarAmount, // in Hbar
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
					network: network,
					transfers,
					memo,
					maxFee: maxFee,
				},
			},
		},
	});
}
export default snapTransferCryptoFcn;
