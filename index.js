const jsonChecker = require("./jsonChecker");
const extentions = require("./extentions");
const screenBuilder = require(`${__dirname}/screenBuilder`);

module.exports.screenBuilder = (activeScreenName) => {
  extentions.colorTextAndBG();

  if (jsonChecker()) {
    screenBuilder(activeScreenName);
  }
};

module.exports.setTextColor = (colorName) => {
  extentions.changeTextColor(colorName);
  extentions.colorTextAndBG();

  console.log("Text color changed");
};

module.exports.setBackgroundColor = (colorName) => {
  extentions.changeBackgroundColor(colorName);
  extentions.colorTextAndBG();

  console.log("Background color changed");
};

module.exports.changeRegisterJsonLocation = (location) => {
  extentions.changeRegisterJsonLocation(location);
  console.log("Json location has been change");
};

module.exports.enableQuitScreenMessage = (doEnable) => {
  extentions.changeShowQuitScreen(doEnable);
  console.log("Quit screen has been enabled to show");
};
