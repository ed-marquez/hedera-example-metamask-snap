async function snapTransferHbarFcn(network, walletData, snapId, args) {
	console.log(`\n=======================================`);
	console.log(`- Invoking transferCrypto...🟠`);

	let outText;
	const receiverAddress = args[0];
	const hbarAmount = parseFloat(args[1]);
	const maxFee = 0.05;

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

	try {
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

		outText = `Transfer successful ✅ | Get the snap account info again to see the updated balance!`;
		console.log(`- ${outText}`);
	} catch (e) {
		outText = `Transaction failed. Try again 🛑`;
		console.log(`- Transfer failed 🛑: ${JSON.stringify(e, null, 4)}`);
	}

	return outText;
}
export default snapTransferHbarFcn;
