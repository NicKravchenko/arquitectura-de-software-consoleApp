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
  let crudButtons = [];
  showOptions(actions);

  //Detect available buttons of crud
  actions.forEach((element) => {
    if (["c", "r", "u", "d"].includes(element.button)) {
      crudButtons.push(element.button);
    }
  });

  const input = prompt("Screen: ");

  if (crudButtons.includes(input)) {
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

function saveJson(registers) {
  var jsonContent = JSON.stringify(registers);

  fs.writeFileSync(registersPath, jsonContent, "utf8", function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }
    console.log("JSON file has been saved.");
  });
}

function crudManager(input, content) {
  const { atribute } = content;
  const { structure } = content;
  const { actions } = content;

  var rawdataReg = fs.readFileSync(registersPath);
  let id = 0;

  try {
    registers = JSON.parse(rawdataReg);
  } catch (error) {
    console.log("Check if register.json exists and configured.");
  }

  //Add array of this type of attribute to JSON
  if (!registers[atribute]) {
    registers[atribute] = [];
  }

  saveJson(registers);
  let object = { _id: 0, ...structure };

  if (input === "c") {
    //Generate new ID
    registers[atribute].forEach((element) => {
      if (element._id + 1 > id) {
        id = element._id + 1;
      }
    });

    Object.keys(object).forEach((element) => {
      if (element == "_id") {
        object[element] = id;
      } else {
        let value = prompt(`${element} is: `);
        object[element] = value;
      }
    });

    registers[atribute].push(object);

    saveJson(registers);
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

  if (input === "u") {
    var _id = prompt("Id to modify: ");
    var element = null;

    registers[atribute].forEach((e) => {
      if (e._id == _id) {
        element = e;
        registers[atribute].pop(e);
      }
    });
    if (element) {
      Object.keys(element).forEach((e) => {
        if (e != "_id") {
          let value = prompt(`${e} is: `);
          element[e] = value;
        }
      });
      registers[atribute].push(element);
    } else {
      console.log("Id is not valid. Press any key.");
      prompt();
    }

    saveJson(registers);
  }

  if (input === "d") {
    var _id = prompt("Id to delete: ");
    var element = null;
    var elementDeleted = false;

    registers[atribute].forEach((e) => {
      if (e._id == _id) {
        element = e;
        registers[atribute].pop(e);
        saveJson(registers);
        elementDeleted = true;
      }
    });

    if (!elementDeleted) {
      console.log("Id does not exist. Press any key.");
      prompt();
    }
  }

  //Show next screen
  actions.forEach((element) => {
    if (element.button == input) {
      showScreenByName(element.screenName);
    }
  });
}

// showScreenByName("crudPerson");
// showScreenByName("showWelcomeScreen");

module.exports = function screenBuilder(activeScreenName) {
  showScreenByName(activeScreenName);
};
