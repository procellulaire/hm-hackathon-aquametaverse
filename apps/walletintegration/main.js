//QUick codinng for POC/Hackathon

(function () {
  // Moralis keys - replace them with the actual server and NFT Token
  const MORALIS_APP_ID = "mx4r4MfE2mKTrYjIxGS3zC8G8alnPfAEvbi79FRT";
  const MORALIS_SERVER = "https://x17awiybnzn6.usemoralis.com:2053/server";
  const NFT_TOKEN_VALID_ADDRESS = "0x6fe9c57ae423d14e78cdd5877d16558bb959d303";
  // Adjust collection names according to your Moralis database configuration

  const CHAIN_ID = "rinkeby"; // Ethereum testnet chain

  const metaloginButton = document.getElementById("metalogin");
  const wcloginButton = document.getElementById("wclogin");
  const nftloginButton = document.getElementById("nftlogin");
  const logoutButton = document.getElementById("logout");
  const userAddress = document.getElementById("user-address");
  const transactionsHeader = document.getElementById("header-trans");
  const transactionsContainer = document.getElementById("transactions-list");
  const nftHeader = document.getElementById("header-nft");
  const nftContainer = document.getElementById("nft-list");
  const loggedInSection = document.getElementById("for-logged-in-user");

  // Moralis initialize (paste your keys)
  Moralis.initialize(MORALIS_APP_ID);
  Moralis.serverURL = MORALIS_SERVER;
  Moralis.start({ serverUrl: MORALIS_SERVER, appId: MORALIS_APP_ID });
  const web3 = new Moralis.Web3();
  // General UI logic for switching between logged in and logged out states
  const switchLoginStateInUI = function (user) {
    if (user) {
      userAddress.innerHTML = "User Adddress - " + user.get("ethAddress");
      metaloginButton.classList.add("js-disabled");
      wcloginButton.classList.add("js-disabled");
      nftloginButton.classList.add("js-disabled");
      logoutButton.classList.remove("js-disabled");
      loggedInSection.classList.remove("js-disabled");
      // console.log(web3);
      // List all transactions on this address
      Moralis.Web3API.account
        .getTransactions({ chain: CHAIN_ID, address: user.get("ethAddress") })
        .then(function (transactions) {
          transactionsContainer.innerHTML = "";

          transactions.result.forEach(function (transaction) {
            const transactionWrapper = document.createElement("div");
            transactionWrapper.innerHTML =
              transaction.hash +
              " | value: " +
              Moralis.Units.FromWei(transaction.value, "ether") +
              " Eth";
            transactionsContainer.appendChild(transactionWrapper);
          });
        })
        .catch(function (error) {
          console.log("Error: ", error);
        });
    } else {
      userAddress.innerHTML = "";
      transactionsHeader.innerHTML = "";
      nftHeader.innerHTML = "";
      metaloginButton.classList.remove("js-disabled");
      wcloginButton.classList.remove("js-disabled");
      nftloginButton.classList.remove("js-disabled");
      logoutButton.classList.add("js-disabled");
      loggedInSection.classList.add("js-disabled");
    }
  };

  const validateNFT = function (user) {
    if (user) {
      const options = { chain: CHAIN_ID, address: user.get("ethAddress") };
      const flag = false;
      //const nfts =
      userAddress.innerHTML = "User Adddress - " + user.get("ethAddress");
      nftContainer.innerHTML = "";
      Moralis.Web3API.account.getNFTs(options).then(function (nft) {
        nft.result.forEach(function (token) {
          if (NFT_TOKEN_VALID_ADDRESS == token.token_address) {
            flag = true;
            const nftWrapper = document.createElement("div");
            nftWrapper.innerHTML =
              "Valid " +
              token.name +
              " NFT holder " +
              "<img width=100px src=" +
              JSON.parse(token.metadata).image +
              "/>";
            nftContainer.appendChild(nftWrapper);
          }
        });
      });
      if (flag) {
        metaloginButton.classList.add("js-disabled");
        wcloginButton.classList.add("js-disabled");
        nftloginButton.classList.add("js-disabled");
        logoutButton.classList.remove("js-disabled");
        loggedInSection.classList.remove("js-disabled");
      } else {
        userAddress.innerHTML = "Invalid User - No matching NFT found";
        nftContainer.innerHTML = "";
        transactionsHeader.innerHTML = "";
        nftHeader.innerHTML = "";
        metaloginButton.classList.remove("js-disabled");
        wcloginButton.classList.remove("js-disabled");
        nftloginButton.classList.remove("js-disabled");
        logoutButton.classList.add("js-disabled");
        loggedInSection.classList.add("js-disabled");
      }
    } else {
      userAddress.innerHTML = "";
      nftContainer.innerHTML = "";
      transactionsHeader.innerHTML = "";
      nftHeader.innerHTML = "";
      metaloginButton.classList.remove("js-disabled");
      wcloginButton.classList.remove("js-disabled");
      nftloginButton.classList.remove("js-disabled");
      logoutButton.classList.add("js-disabled");
      loggedInSection.classList.add("js-disabled");
    }
  };

  //Insert User Info into Aqua Metaverse DB
  const handleAMDBUpdate = function (user) {
    if (user) {
    }
  };

  /*
  // Check if user is logged in
  Moralis.User.currentAsync()
    .then(function (user) {
      if (user) {
        switchLoginStateInUI(user);
      } else {
        switchLoginStateInUI(null);
      }
    })
    .catch(function (error) {
      console.log("Error: ", error);
    });
*/
  // Login user using crypto auth (Metamask)
  metaloginButton.addEventListener("click", function () {
    //Metamask Authentication
    Moralis.authenticate()
      .then(function (user) {
        switchLoginStateInUI(user);
        handleAMDBUpdate(user);
      })
      .catch(function (error) {
        console.log("Error: ", error);
      });
  });

  // Login user using crypto auth (Metamask)
  wcloginButton.addEventListener("click", function () {
    //WalletConnect Authentication
    Moralis.authenticate({ provider: "walletconnect" })
      .then(function (user) {
        switchLoginStateInUI(user);
        handleAMDBUpdate(user);
      })
      .catch(function (error) {
        console.log("Error: ", error);
      });
  });

  //NFT Login
  nftloginButton.addEventListener("click", function () {
    //Metamask Authentication
    Moralis.authenticate()
      .then(function (user) {
        validateNFT(user);
        handleAMDBUpdate(user);
      })
      .catch(function (error) {
        console.log("Error: ", error);
      });
  });

  // Logut user
  logoutButton.addEventListener("click", function () {
    Moralis.User.logOut()
      .then(function () {
        switchLoginStateInUI(null);
      })
      .catch(function (error) {
        console.log("Error: ", error);
      });
  });
})();
