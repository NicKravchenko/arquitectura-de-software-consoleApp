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

  const { type } = screenToShow;
  console.log("Im in show screen by name");
  switch (type) {
    case "info":
      showInfoScreen(screenToShow);
    case "get":
      showGetScreen(screenToShow);
  }
}

function showInfoScreen(screenToShow) {
  //Define screen parts
  let nextScreenToShowName = "";
  const { content } = screenToShow;
  const { screenMessage } = content;
  const { actions } = content;

  console.log(screenMessage);

  console.log("Go to next screen:");

  //Show possible actions
  actions.forEach((element) => {
    console.log(element);
  });

  const input = prompt("Screen: ");

  //Exit if pressed q
  if (input == "q") {
    console.log("q pressed");
  } else {
    //Call screen
    actions.forEach((element) => {
      if (element.button === input) {
        nextScreenToShowName = element.screenName;
        showScreenByName(nextScreenToShowName);
      } else {
        showScreenByName("show404Screen");
      }
    });
  }
}

function showGetScreen(screenToShow) {
  //Define screen parts
  let nextScreenToShowName = "";
  const { content } = screenToShow;
  const { screenMessage } = content;
  const { actions } = content;

  console.log(screenMessage);

  console.log("Go to next screen:");

  //Show possible actions
  actions.forEach((element) => {
    console.log(element);
  });

  const input = prompt("Screen: ");

  //Exit if pressed q
  if (input == "q") {
    console.log("q pressed");
    return;
  } else {
    //Call screen
    actions.forEach((element) => {
      if (element.button === input) {
        nextScreenToShowName = element.screenName;
        showScreenByName(nextScreenToShowName);
      } else {
        showScreenByName("show404Screen");
      }
      return;
    });
  }
}

showScreenByName("showWelcomeScreen");

module.exports = function screenBuilder(activeScreenName) {
  //   showInfoScreen(activeScreenName);
  showScreenByName(activeScreenName);
};
