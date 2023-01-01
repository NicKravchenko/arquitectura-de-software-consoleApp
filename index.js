const jsonChecker = require("./jsonChecker");
const screenBuilder = require(`${__dirname}/screenBuilder`);

module.exports.screenBuilder = (activeScreenName) => {
  if (jsonChecker()) {
    screenBuilder(activeScreenName);
  }
};

module.exports.setTextColor = (colorName) => {
  console.log('Text color changed')
}

module.exports.setBackgroundColor = (colorName) => {
  console.log('Text color changed')
}

module.exports.changeJSONLocation = (location) => {
  console.log('Json location has been change')
}

module.exports.enableQuitScreenMessage = (doEnable) => {
  console.log('Quit screen has been enabled to show')
}