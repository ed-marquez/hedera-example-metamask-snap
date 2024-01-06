async function snapGetAccountInfoFcn(network, walletData, snapId) {
	console.log(`\n=======================================`);
	console.log(`- Invoking GetAccountInfo...🟠`);

	let outText;
	let snapAccountEvmAddress;
	let snapAccountBalance;

	try {
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

		snapAccountEvmAddress = response.accountInfo.evmAddress;
		snapAccountBalance = response.accountInfo.balance.hbars;
		outText = `Snap Account ${snapAccountEvmAddress} has ${snapAccountBalance} ℏ ✅`;
	} catch (e) {
		snapAccountEvmAddress = e.message.match(/0x[a-fA-F0-9]{40}/)[0];
		outText = `Go to MetaMask and transfer HBAR to the snap address to activate it: ${snapAccountEvmAddress} 📤`;
	}

	console.log(`- ${outText}}`);
	console.log(`- Got account info ✅`);

	return [snapAccountEvmAddress, outText];
}
export default snapGetAccountInfoFcn;
