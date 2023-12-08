import React, { useState } from "react";
// import MyText from "./components/MyText.jsx";
// import SetterGroup from "./components/SetterGroup.jsx";
// import GetterGroup from "./components/GetterGroup.jsx";
import MyGroup from "./components/MyGroup.jsx";
import walletConnectFcn from "./components/hedera/walletConnect.js";
import snapInstallFcn from "./components/hedera/snapInstall.js";
import snapGetAccountInfoFcn from "./components/hedera/snapGetAccountInfo.js";
import snapTransferCryptoFcn from "./components/hedera/snapTransferCrypto.js";
import contractExecuteFcn from "./components/hedera/contractExecute.js";
import contractCallViewFcn from "./components/hedera/contractCallView.js";
import "./styles/App.css";

function App() {
	const [walletData, setWalletData] = useState();
	const [account, setAccount] = useState();
	const [network, setNetwork] = useState();
	const [contract, setContract] = useState();
	const [sPartName, set_sPartName] = useState();
	const [sPartAmount, set_sPartAmount] = useState();
	const [gPartName, set_gPartName] = useState();

	const [connectText, setConnectText] = useState("🔌 Connect here...");
	const [snapText, setSnapText] = useState("Install Hedera Wallet Snap");
	const [deployText, setDeployText] = useState("");
	const [setterGroupText, setSetterGroupText] = useState("Store a part name and corresponding amount on-chain");
	const [getterGroupText, setGetterGroupText] = useState("Check amount available for a given part");
	const [amountText, setAmountText] = useState("");

	const [connectLink, setConnectLink] = useState("");
	const [deployLink, setDeployLink] = useState("");
	const [setterGroupLink, set_setterGroupLink] = useState("");

	async function connectWallet() {
		if (account !== undefined) {
			setConnectText(`🔌 Account ${account} already connected ⚡ ✅`);
		} else {
			const wData = await walletConnectFcn();

			let newAccount = wData[0];
			let newNetwork = wData[2];
			if (newAccount !== undefined) {
				setConnectText(`🔌 Account ${newAccount} connected ⚡ ✅`);
				setConnectLink(`https://hashscan.io/${newNetwork}/account/${newAccount}`);
				setWalletData(wData);
				setAccount(newAccount);
				setNetwork(newNetwork);
				setDeployText();
			}
		}
	}

	async function snapInstall() {
		if (account === undefined) {
			setDeployText("🛑Connect a wallet first!🛑");
		} else if (contract !== undefined) {
			setDeployText(`You already have contract ${contract} ✅`);
		} else {
			await snapInstallFcn(walletData);

			setSnapText(`Button clicked ✅`);
		}
	}

	async function snapGetAccountInfo() {
		if (account === undefined) {
			setDeployText("🛑Connect a wallet first!🛑");
		} else if (contract !== undefined) {
			setDeployText(`You already have contract ${contract} ✅`);
		} else {
			const newContractAddress = await snapGetAccountInfoFcn(walletData);
			setDeployText(`Deployed contract ${newContractAddress} ✅`);
			setDeployLink(`https://hashscan.io/${network}/address/${newContractAddress}`);
			setSetterGroupText("Store a part name and corresponding amount on-chain");
		}
	}

	async function snapTransferCrypto() {
		if (account === undefined) {
			setDeployText("🛑Connect a wallet first!🛑");
		} else if (contract !== undefined) {
			setDeployText(`You already have contract ${contract} ✅`);
		} else {
			const newContractAddress = await snapTransferCryptoFcn(walletData);
			setDeployText(`Deployed contract ${newContractAddress} ✅`);
			setDeployLink(`https://hashscan.io/${network}/address/${newContractAddress}`);
			setSetterGroupText("Store a part name and corresponding amount on-chain");
		}
	}

	function handle_sPartNameChange(event) {
		let new_sPartName = event.target.value;
		if (new_sPartName === "") {
			set_sPartName();
		} else {
			set_sPartName(new_sPartName);
		}
	}
	function handle_sPartAmountChange(event) {
		let new_sPartAmount = event.target.value;
		if (new_sPartAmount === "") {
			set_sPartAmount();
		} else {
			set_sPartAmount(new_sPartAmount);
		}
	}
	function handle_gPartNameChange(event) {
		let new_gPartName = event.target.value;
		if (new_gPartName === "") {
			set_gPartName();
		} else {
			set_gPartName(new_gPartName);
		}
	}

	async function contractExecute() {
		if (account === undefined || contract === undefined) {
			setSetterGroupText("🛑Connect a wallet AND deploy a contract!🛑");
		} else if (sPartName === undefined || sPartAmount === undefined) {
			setSetterGroupText("🛑Enter a valid part name and address!🛑");
		} else {
			setSetterGroupText(`Storing ${sPartAmount} unit(s) of ${sPartName} on-chain...`);

			const [txHash, outText] = await contractExecuteFcn(walletData, contract, [sPartName, sPartAmount]);

			if (txHash !== undefined && outText !== undefined) {
				setSetterGroupText(`${outText} | Store a new part name and corresponding amount!`);
				set_setterGroupLink(`https://hashscan.io/${network}/tx/${txHash}`);
			} else {
				setSetterGroupText(`Transaction failed - try again 🔴`);
			}
		}
	}

	async function contractCallView() {
		if (gPartName === undefined) {
			setGetterGroupText("🛑Enter a valid part name to check the amount!🛑");
		} else {
			setGetterGroupText(`Getting current amount of ${gPartName} from contract...`);

			const outText = await contractCallViewFcn(walletData, network, contract, gPartName);

			if (outText !== undefined) {
				setGetterGroupText("Check amount available for a given part");
				setAmountText(outText);
			} else {
				setGetterGroupText(`Transaction failed - try again 🔴`);
			}
		}
	}

	//=====================

	return (
		<div className="App">
			<h1 className="header">Write and read on-chain data on Hedera!</h1>

			<MyGroup fcn={connectWallet} buttonLabel={"Connect Wallet"} text={connectText} link={connectLink} />

			<MyGroup fcn={snapInstall} buttonLabel={"Install Snap"} text={snapText} link={""} />

			<MyGroup fcn={snapGetAccountInfo} buttonLabel={"Snap - Get Account Info"} text={deployText} link={""} />

			<MyGroup fcn={snapTransferCrypto} buttonLabel={"Snap - Transfer HBAR"} text={deployText} link={""} />

			{/* <SetterGroup
				text_app={setterGroupText}
				link_app={setterGroupLink}
				//
				fcnI1_app={handle_sPartNameChange}
				placeholderTxt1_app={"Part name"}
				//
				fcnI2_app={handle_sPartAmountChange}
				placeholderTxt2_app={"Amount"}
				//
				fcnB1_app={contractExecute}
				buttonLabel_app={"Store Info"}
			/>

			<GetterGroup
				text_app={getterGroupText}
				//
				fcnI1_app={handle_gPartNameChange}
				placeholderTxt1_app={"Part name"}
				//
				fcnB1_app={contractCallView}
				buttonLabel_app={"Get Info"}
			/> */}

			{/* <MyText text={amountText} /> */}

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
