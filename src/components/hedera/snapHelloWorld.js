async function snapHelloWorldFcn(walletData, snapId) {
	console.log(`\n=======================================`);
	console.log(`- Invoking HelloWorld...🟠`);

	const network = walletData[2];

	await window.ethereum.request({
		method: "wallet_invokeSnap",
		params: {
			snapId,
			request: {
				method: "hello",
				params: {
					network: network,
					mirrorNodeUrl: `https://${network}.mirrornode.hedera.com`,
				},
			},
		},
	});
}
export default snapHelloWorldFcn;
