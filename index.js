const jsonChecker = require(`${__dirname}/jsonChecker`);
const extentions = require(`${__dirname}/extentions`);
const screenBuilder = require(`${__dirname}/screenBuilder`);

module.exports.screenBuilder = (activeScreenName, ...cb) => {
  extentions.colorTextAndBG();

  if (jsonChecker.check()) {
    screenBuilder.build(activeScreenName, ...cb);
  }
};

module.exports.setScreenJsonLoc = (screenJsonLoc) => {
  jsonChecker.setScreenJsonLoc(screenJsonLoc);
  screenBuilder.setScreenJsonLoc(screenJsonLoc);
};

// module.exports.setTextColor = (colorName) => {
//   extentions.changeTextColor(colorName);
//   extentions.colorTextAndBG();

//   console.log("Text color changed");
// };

// module.exports.setBackgroundColor = (colorName) => {
//   extentions.changeBackgroundColor(colorName);
//   extentions.colorTextAndBG();

//   console.log("Background color changed");
// };
