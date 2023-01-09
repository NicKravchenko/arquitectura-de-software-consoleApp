const jsonChecker = require("./jsonChecker");
const extentions = require("./extentions");
const screenBuilder = require(`${__dirname}/screenBuilder`);

module.exports.screenBuilder = (activeScreenName, ...cb) => {
  extentions.colorTextAndBG();

  if (jsonChecker()) {
    screenBuilder(activeScreenName, ...cb);
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
