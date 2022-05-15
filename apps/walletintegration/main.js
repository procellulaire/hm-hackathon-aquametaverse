//QUick codinng for POC/Hackathon

(function () {
  // Moralis keys - replace them with yours, only my user can add to the collection with this setup
  const MORALIS_APP_ID = "mx4r4MfE2mKTrYjIxGS3zC8G8alnPfAEvbi79FRT";
  const MORALIS_SERVER = "https://x17awiybnzn6.usemoralis.com:2053/server";
  // Adjust collection names according to your Moralis database configuration

  const CHAIN_ID = "rinkeby"; // Ethereum testnet chain

  const metaloginButton = document.getElementById("metalogin");
  const wcloginButton = document.getElementById("wclogin");
  const logoutButton = document.getElementById("logout");
  const userAddress = document.getElementById("user-address");
  const transactionsContainer = document.getElementById("transactions-list");
  const loggedInSection = document.getElementById("for-logged-in-user");

  // Moralis initialize (paste your keys)
  Moralis.initialize(MORALIS_APP_ID);
  Moralis.serverURL = MORALIS_SERVER;
  Moralis.start({ serverUrl: MORALIS_SERVER, appId: MORALIS_APP_ID });
  const web3 = new Moralis.Web3();
  // General UI logic for switching between logged in and logged out states
  const switchLoginStateInUI = function (user) {
    if (user) {
      userAddress.innerHTML = user.get("ethAddress");
      metaloginButton.classList.add("js-disabled");
      wcloginButton.classList.add("js-disabled");
      logoutButton.classList.remove("js-disabled");
      loggedInSection.classList.remove("js-disabled");
      console.log(web3);
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
      metaloginButton.classList.remove("js-disabled");
      wcloginButton.classList.remove("js-disabled");
      logoutButton.classList.add("js-disabled");
      loggedInSection.classList.add("js-disabled");
    }
  };

  //Insert User Info into Aqua Metaverse DB
  const handleAMDBUpdate = function (user) {
    if (user) {
    }
  };

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
