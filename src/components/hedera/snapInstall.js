async function snapInstallFcn(walletData) {
	console.log(`\n=======================================`);
	console.log(`- Installing Hedera Wallet Snap...🟠`);

	// ETHERS PROVIDER AND SIGNER
	const provider = walletData[1];
	const signer = provider.getSigner();

	// ========================
	// ========================
	// Get permissions to interact with and install the Hedera Wallet Snap
	const snapId = `npm:@hashgraph/hedera-wallet-snap`;
	console.log("snap id", snapId);

	let snaps = await window.ethereum.request({
		method: "wallet_getSnaps",
	});
	console.log("Installed snaps...", snaps);
	try {
		if (!(snapId in snaps)) {
			console.log("Hedera Wallet Snap is not yet installed. Installing now...");
			const result = await window.ethereum.request({
				method: "wallet_requestSnaps",
				params: {
					[snapId]: { version: "0.1.2" },
				},
			});
			console.log("result: ", result);
			snaps = await window.ethereum.request({
				method: "wallet_getSnaps",
			});
		}
	} catch (e) {
		console.log(`Failed to obtain installed snap: ${JSON.stringify(e, null, 4)}`);
		alert(`Failed to obtain installed snap: ${JSON.stringify(e, null, 4)}`);
	}

	if (snapId in snaps) {
		console.log("Connected successfully!");
		alert("Connected successfully!");
	} else {
		console.log("Could not connect successfully. Please try again!");
		alert("Could not connect successfully. Please try again!");
	}

	// ========================
	// ========================

	// return contractAddress;
}
export default snapInstallFcn;
