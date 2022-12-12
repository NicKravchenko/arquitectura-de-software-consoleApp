const fs = require("fs");
const prompt = require("prompt-sync")();

var rawdataConf = fs.readFileSync(`${__dirname}/config.json`);
var config = JSON.parse(rawdataConf);

const registersPath = `${__dirname}/registers.json`;

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
  console.log(actions[0].button);
  const input = prompt("Screen: ");

  if (["c", "r", "u", "d"].includes(input)) {
    crudManager(input, content);
    return;
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
  const { actions } = content;

  var rawdataReg = fs.readFileSync(registersPath);
  let id = -1;

  try {
    registers = JSON.parse(rawdataReg);
  } catch (error) {
    console.log("Check if register.json exists and configured.");
  }

  let object = { _id: 0, ...structure };

  registers[atribute].forEach((element) => {
    if (element._id + 1 > id) {
      id = element._id + 1;
    }
  });

  // function createRegister(input, object, element, registers, atribute) {}
  //create logic
  if (input === "c") {
    Object.keys(object).forEach((element) => {
      if (element == "_id") {
        object[element] = id;
      } else {
        let value = prompt(`${element} is: `);
        object[element] = value;
      }
    });

    // console.log(object);
    registers[atribute].push(object);

    var jsonContent = JSON.stringify(registers);

    fs.writeFileSync(registersPath, jsonContent, "utf8", function (err) {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
      }
      console.log("JSON file has been saved.");
    });
  }

  if (input === "r") {
    var idFound = false;
    var _id = prompt("Id of search: ");

    registers[atribute].forEach((element) => {
      if (element._id == _id) {
        console.log(element);
        idFound = true;
      }
    });
    if (idFound == false) {
      console.log(`Element with id ${_id} doesnt exist.`);
    }

    prompt("Press enter to continue.");
  }
  showScreenByName(actions[0].screenName);
  // const asdasd = prompt("WOWOW: ");
}

// showScreenByName("crudPerson");
// showScreenByName("showWelcomeScreen");

module.exports = function screenBuilder(activeScreenName) {
  showScreenByName(activeScreenName);
};
