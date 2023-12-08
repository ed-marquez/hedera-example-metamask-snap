async function snapGetAccountInfoFcn(walletData) {
	console.log(`\n=======================================`);
	console.log(`- Invoking GetAccountInfo...🟠`);

	const snapId = `npm:@hashgraph/hedera-wallet-snap`;

	// await window.ethereum.request({
	// 	method: "wallet_invokeSnap",
	// 	params: {
	// 		snapId,
	// 		request: {
	// 			method: "hello",
	// 			params: {
	// 				network: "testnet",
	// 				mirrorNodeUrl: "https://testnet.mirrornode.hedera.com",
	// 			},
	// 		},
	// 	},
	// });

	const externalAccountParams = {
		externalAccount: {
			accountIdOrEvmAddress: "0.0.141617",
			curve: "ED25519",
		},
	};

	const a = await window.ethereum.request({
		method: "wallet_invokeSnap",
		params: {
			snapId,
			request: {
				method: "getAccountInfo",
				params: {
					network: "previewnet",
					mirrorNodeUrl: "https://previewnet.mirrornode.hedera.com",
					/*
				Uncomment the below line if you want to connect
				to a non-metamask account
				...externalAccountParams,
			  */
				},
			},
		},
	});
	console.log("a", a);
}
export default snapGetAccountInfoFcn;
