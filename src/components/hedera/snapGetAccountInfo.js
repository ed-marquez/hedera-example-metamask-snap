async function snapGetAccountInfoFcn(network, walletData, snapId) {
	console.log(`\n=======================================`);
	console.log(`- Invoking GetAccountInfo...🟠`);

	const response = await window.ethereum.request({
		method: "wallet_invokeSnap",
		params: {
			snapId,
			request: {
				method: "getAccountInfo",
				params: {
					network: network,
					mirrorNodeUrl: `https://${network}.mirrornode.hedera.com`,
				},
			},
		},
	});
	console.log("accountInfo:", response);

	const snapAccountEvmAddress = response.accountInfo.evmAddress;
	const snapAccountBalance = response.accountInfo.balance.hbars;
	const outText = `Snap Account ${snapAccountEvmAddress} has ${snapAccountBalance} ℏ`;
	return [outText];
}
export default snapGetAccountInfoFcn;
