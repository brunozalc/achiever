const AchieverNFT = artifacts.require("AchieverNFT");

module.exports = function (deployer) {
    const taxAmountInWei = web3.utils.toWei('0.01', 'ether');
    deployer.deploy(AchieverNFT, taxAmountInWei);
};
