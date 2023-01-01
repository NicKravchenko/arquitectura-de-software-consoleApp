const prompt = require("prompt-sync")();
const fs = require("fs");

const registersPath = `${__dirname}/extentionsconfig.json`;

var extentionsconfigRaw = fs.readFileSync(registersPath);
var extentionsconfig = JSON.parse(extentionsconfigRaw);

const colors = require(`${__dirname}/colors.js`);

const configTextColor = extentionsconfig.textColor;
const configBackgroundColor = extentionsconfig.bgColor;

let textColor;
let backgroundColor;

const fgColors = colors.fg;
const bgColors = colors.bg;
// console.log(fgColors);

Object.keys(fgColors).forEach((key) => {
  if (key == configTextColor) {
    textColor = fgColors[key];
    return true;
  }
});

Object.keys(bgColors).forEach((key) => {
  if (key == configBackgroundColor) {
    backgroundColor = bgColors[key];
    return true;
  }
});

if (!textColor) {
  console.log("Process to exit with code 1");
  throw new Error("Text color does not exist");
}
if (!backgroundColor) {
  console.log("Process to exit with code 1");
  throw new Error("Background color does not exist");
}

module.exports.colorTextAndBG = () => {
  return console.log(backgroundColor, textColor);
};

module.exports.resetTextAndBG = () => {
  return console.log(fgColors.white, bgColors.default);
};

module.exports.changeTextColor = (textColor) => {
  extentionsconfig.textColor = String(textColor).toLowerCase();

  var jsonContent = JSON.stringify(extentionsconfig);
  fs.writeFileSync(registersPath, jsonContent, "utf8", function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }
    console.log("JSON file has been saved.");
  });
};

module.exports.changeBackgroundColor = (bgColor) => {
  extentionsconfig.bgColor = String(bgColor).toLowerCase();

  var jsonContent = JSON.stringify(extentionsconfig);
  fs.writeFileSync(registersPath, jsonContent, "utf8", function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }
    console.log("JSON file has been saved.");
  });
};
