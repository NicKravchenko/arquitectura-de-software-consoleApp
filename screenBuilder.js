const fs = require("fs");
const prompt = require("prompt-sync")();

var rawdata = fs.readFileSync(`${__dirname}/config.json`);
var config = JSON.parse(rawdata);

function getScreenToShow(screenToShowName) {
  const conf = config;
  let screenToShow = [];

  //Choose  screen to show
  conf.forEach((element) => {
    if (screenToShowName === element.screenName) {
      screenToShow = element;
    }
  });

  return screenToShow;
}

function showScreenByName(screenToShowName) {
  const screenToShow = getScreenToShow(screenToShowName);
  console.log("\033[2J");

  const { type } = screenToShow;

  if (type === "info") {
    showInfoScreen(screenToShow);
    return;
  }
  if (type === "get") {
    showGetScreen(screenToShow);
    return;
  }
}

function transferToScreen(actions) {
  let screenFound = false;

  console.log("Go to next screen:");

  //Show possible actions
  actions.forEach((element) => {
    console.log(element);
  });
  const input = prompt("Screen: ");

  //Exit if pressed q
  if (input == "q") {
    process.on("exit", function (code) {
      showScreenByName("endScreen");

      return console.log(`Process to exit with code ${code}`);
    });
    return;
  } else {
    //Call screen
    actions.forEach((element) => {
      console.log(element);

      if (element.button == input) {
        nextScreenToShowName = element.screenName;
        console.log(nextScreenToShowName);
        showScreenByName(nextScreenToShowName);
        screenFound = true;
        return;
      }
    });
    if (!screenFound) {
      showScreenByName("show404Screen");
      return;
    }
  }
}

function showInfoScreen(screenToShow) {
  //Define screen parts
  let nextScreenToShowName = "";
  const { content } = screenToShow;
  const { screenMessage } = content;
  const { actions } = content;

  console.log(screenMessage);

  transferToScreen(actions);
}

function showGetScreen(screenToShow) {
  //Define screen parts
  let nextScreenToShowName = "";
  const { content } = screenToShow;
  const { screenMessage } = content;
  const { actions } = content;

  console.log(screenMessage);

  transferToScreen(actions);
}

// showScreenByName("showWelcomeScreen");

module.exports = function screenBuilder(activeScreenName) {
  showScreenByName(activeScreenName);
};
