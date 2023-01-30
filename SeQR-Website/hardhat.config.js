/**
* @type import('hardhat/config').HardhatUserConfig
*/
require("@nomiclabs/hardhat-ethers");
module.exports = {
    solidity: {
    compilers: [
      {
        version: "0.8.0",
      },
      {
        version: "0.8.1",
        settings: {},
      },
      {
        version: "0.8.17",
        settings: {},
      },
      {
        version: "0.8.4",
        settings: {},
      },
      
      
    ],   
}, 
   defaultNetwork: "goerli",
   networks: {
      hardhat: {},
      goerli: {
         url: "https://eth-goerli.g.alchemy.com/v2/ggyD0gO2hEm7byjiDBM2wwDlNm6y1xWM",
         accounts: [`0x${"5f1582d6e860e3fd0025d6f79e986b3b7c3f717fba11288999afd121664364b2"}`]
      }
   },
}