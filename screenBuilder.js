const fs = require("fs");
const prompt = require("prompt-sync")();

var rawdataConf = fs.readFileSync(`${__dirname}/config.json`);
var config = JSON.parse(rawdataConf);

var rawdataReg = fs.readFileSync(`${__dirname}/config.json`);
var registers = JSON.parse(rawdataReg);

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
  console.log("\033[2J");
  const screenToShow = getScreenToShow(screenToShowName);

  const { type } = screenToShow;

  if (type === "info") {
    showInfoScreen(screenToShow);
    return;
  }
  if (type === "get") {
    showGetScreen(screenToShow);
    return;
  }
  if (type === "crud") {
    showCrudScreen(screenToShow);
    return;
  }
}

function showOptions(actions) {
  console.log("Go to next screen:");

  //Show possible actions
  actions.forEach((element) => {
    console.log(element);
  });
}

function exitProgram() {
  process.on("exit", function (code) {
    showScreenByName("endScreen");

    return console.log(`Process to exit with code ${code}`);
  });
}

function transferToScreen(actions, content) {
  let screenFound = false;

  showOptions(actions);

  const input = prompt("Screen: ");

  if (["c", "r", "u", "d"].includes(input[0])) {
    crudManager(input, content);
  }

  //Exit if pressed q
  if (input == "q") {
    exitProgram();
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
  const { content } = screenToShow;
  const { screenMessage } = content;
  const { actions } = content;

  console.log(screenMessage);

  transferToScreen(actions, content);
}

function showGetScreen(screenToShow) {
  //Define screen parts
  const { content } = screenToShow;
  const { screenMessage } = content;
  const { actions } = content;

  console.log(screenMessage);

  transferToScreen(actions, content);
}

function showCrudScreen(screenToShow) {
  //Define screen parts
  const { content } = screenToShow;
  const { screenMessage } = content;
  const { actions } = content;

  console.log(screenMessage);

  transferToScreen(actions, content);
}

function crudManager(input, content) {
  const { atribute } = content;
  const { structure } = content;

  let object = { _id: 0, ...structure };

  console.log(object);
  if ((input = "c")) {
    Object.keys(object).forEach((element) => {
      let value = prompt(`my ${element} is: `);
      console.log(element);
      object[element] = value;
    });
  }
  console.log(object);

  const asdasd = prompt("WOWOW: ");
}

showScreenByName("crudPerson");

module.exports = function screenBuilder(activeScreenName) {
  showScreenByName(activeScreenName);
};
