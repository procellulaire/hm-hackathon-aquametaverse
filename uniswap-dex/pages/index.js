import { SwapWidget } from "@uniswap/widgets";
import "@uniswap/widgets/fonts.css";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

export default function Home() {
  const providers = [];

  try {
    const { ethereum } = window;
    if (!ethereum) {
      console.log("Install metamask");
      return;
    }

    const accounts = ethereum.request({
      method: "eth_requestAccounts",
    });

    const account = accounts[0];
    console.log(account);
    console.log("Logging in..");
    const provider = new ethers.providers.Web3Provider(ethereum);
    console.log(provider);

    providers.push(provider);
  } catch (e) {
    console.log(e);
  }
  // const provider = new ethers.providers.Web3Provider(connection);

  const jsonRpcEndpoint = "https://rinkeby.infura.io/v3/infura_id";

  const CMC_TOKEN_LIST =
    "https://api.coinmarketcap.com/data-api/v3/uniswap/all.json";

  console.log(providers);
  return (
    <div className="Uniswap">
      <SwapWidget
        provider={providers[0]}
        jsonRpcEndpoint={jsonRpcEndpoint}
        tokenList={CMC_TOKEN_LIST}
      />
    </div>
  );
}
