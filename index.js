const jsonChecker = require("./jsonChecker");
const screenBuilder = require(`${__dirname}/screenBuilder`);

module.exports.screenBuilder = (activeScreenName) => {
  if (jsonChecker()) {
    screenBuilder(activeScreenName);
  }
};
