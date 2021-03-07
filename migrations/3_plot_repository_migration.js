const PlotRepository = artifacts.require("PlotRepository");

module.exports = function (deployer) {
  deployer.deploy(PlotRepository);
};
