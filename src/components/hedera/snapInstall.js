async function snapInstallFcn(snapId) {
	console.log(`\n=======================================`);
	console.log(`- Installing Hedera Wallet Snap...🟠`);

	console.log(`SnapId: ${snapId}`);

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
					[snapId]: {},
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
}
export default snapInstallFcn;
