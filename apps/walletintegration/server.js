const handler = require("serve-handler");
const http = require("http");
const Moralis = require("moralis/node");
const WalletConnect = require("@walletconnect/web3-provider");

const server = http.createServer((request, response) => {
  return handler(request, response, {
    headers: [
      {
        source: "**/*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache",
          },
        ],
      },
    ],
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log(
    `Dev server running at http://localhost:${process.env.PORT || 3000}`
  );
});
