const gunsContract = artifacts.require("GunsContract");

module.exports = function (deployer) {
  deployer.deploy(gunsContract);
};
