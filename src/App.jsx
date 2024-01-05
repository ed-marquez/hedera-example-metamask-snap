import React, { useState } from "react";
import MyGroup from "./components/MyGroup.jsx";
import SetterGroup from "./components/SetterGroup.jsx";
import walletConnectFcn from "./components/hedera/walletConnect.js";
import snapInstallFcn from "./components/hedera/snapInstall.js";
import snapGetAccountInfoFcn from "./components/hedera/snapGetAccountInfo.js";
import snapTransferCryptoFcn from "./components/hedera/snapTransferCrypto.js";
import "./styles/App.css";

function App() {
	const [snapId, setSnapId] = useState("npm:@hashgraph/hedera-wallet-snap");
	const [walletData, setWalletData] = useState();
	const [account, setAccount] = useState();
	const [network, setNetwork] = useState("previewnet");
	const [receiverAddress, setReceiverAddress] = useState();
	const [hbarAmount, setHbarAmount] = useState();

	const [connectText, setConnectText] = useState("🔌 Start here...");
	const [snapInstallText, setSnapInstallText] = useState();
	const [snapInfoText, setSnapInfoText] = useState();
	const [snapTransferText, setSnapTransferText] = useState("");

	const [connectLink, setConnectLink] = useState("");
	const [infoLink, setInfoLink] = useState("");
	const [transferGroupLink, setTransferGroupLink] = useState("");

	async function connectWallet() {
		if (account !== undefined) {
			setConnectText(`🔌 Account ${account} already connected ⚡ ✅`);
		} else {
			const wData = await walletConnectFcn(network);

			let newAccount = wData[0];
			if (newAccount !== undefined) {
				setConnectText(`🔌 Account ${newAccount} connected ⚡ ✅`);
				setConnectLink(`https://hashscan.io/${network}/account/${newAccount}`);
				setWalletData(wData);
				setAccount(newAccount);
				setSnapInstallText();
				setSnapInfoText();
				setSnapTransferText();
			}
		}
	}

	async function snapInstall() {
		if (account === undefined) {
			setSnapInstallText("🛑Connect a wallet first!🛑");
		} else {
			await snapInstallFcn(snapId);
			setSnapInstallText(`Snap installation OK ✅`);
		}
	}

	async function snapGetAccountInfo() {
		if (account === undefined) {
			setSnapInfoText("🛑Connect a wallet first!🛑");
		} else {
			const infoText = await snapGetAccountInfoFcn(network, walletData, snapId);
			setSnapInfoText(infoText);
			// setDeployText(`Deployed contract ${newContractAddress} ✅`);
			// setDeployLink(`https://hashscan.io/${network}/address/${newContractAddress}`);
		}
	}

	function handle_AdressChange(event) {
		let newAddress = event.target.value;
		if (newAddress === "") {
			setReceiverAddress();
		} else {
			setReceiverAddress(newAddress);
		}
	}
	function handle_AmountChange(event) {
		let newAmount = event.target.value;
		if (newAmount === "") {
			setHbarAmount();
		} else {
			setHbarAmount(newAmount);
		}
	}

	async function snapTransferCrypto() {
		if (account === undefined) {
			setSnapTransferText("🛑Connect a wallet first!🛑");
		} else {
			setSnapTransferText(`Storing ${hbarAmount} unit(s) of ${receiverAddress} on-chain...`);

			// const [txHash, outText] = await snapTransferCryptoFcn(walletData, snapId, [sPartName, sPartAmount]);
			await snapTransferCryptoFcn(network, walletData, snapId, [receiverAddress, hbarAmount]);

			// if (txHash !== undefined && outText !== undefined) {
			// 	setSetterGroupText(`${outText} | Store a new part name and corresponding amount!`);
			// 	set_setterGroupLink(`https://hashscan.io/${network}/tx/${txHash}`);
			// } else {
			// 	setSetterGroupText(`Transaction failed - try again 🔴`);
			// }
		}
	}

	return (
		<div className="App">
			<h1 className="header">Write and read on-chain data on Hedera!</h1>

			<MyGroup fcn={connectWallet} buttonLabel={"Connect Wallet"} text={connectText} link={connectLink} />

			<MyGroup fcn={snapInstall} buttonLabel={"Install Snap"} text={snapInstallText} link={""} />

			<MyGroup fcn={snapGetAccountInfo} buttonLabel={"Get Snap Account Info"} text={snapInfoText} link={infoLink} />

			<SetterGroup
				text_app={snapTransferText}
				link_app={transferGroupLink}
				//
				fcnI1_app={handle_AdressChange}
				placeholderTxt1_app={"Receiver address"}
				//
				fcnI2_app={handle_AmountChange}
				placeholderTxt2_app={"HBAR amount"}
				//
				fcnB1_app={snapTransferCrypto}
				buttonLabel_app={"Transfer HBAR w/ Snap"}
			/>

			<div className="logo">
				<div className="symbol">
					<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
						<path d="M20 0a20 20 0 1 0 20 20A20 20 0 0 0 20 0" className="circle"></path>
						<path d="M28.13 28.65h-2.54v-5.4H14.41v5.4h-2.54V11.14h2.54v5.27h11.18v-5.27h2.54zm-13.6-7.42h11.18v-2.79H14.53z" className="h"></path>
					</svg>
				</div>
				<span>Hedera</span>
			</div>
		</div>
	);
}
export default App;
