const fs = require("fs");
const prompt = require("prompt-sync")();
const extentions = require("./extentions");

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

function showScreenByName(screenToShowName, ...cb) {
  extentions.colorTextAndBG();
  const screenToShow = getScreenToShow(screenToShowName);

  const { type } = screenToShow;

  if (type === "info") {
    showScreen(screenToShow, ...cb);
    return;
  }
  if (type === "get") {
    showScreen(screenToShow, ...cb);
    return;
  }
  if (type === "crud") {
    showScreen(screenToShow, ...cb);
    return;
  }
}

function showOptions(actions, ...cb) {
  const funcs = [];

  cb.forEach((element) => {
    funcs.push(element.name);
  });

  if (funcs.includes("setOptionsShowing")) {
    cb[funcs.indexOf("setOptionsShowing")](actions);
  } else {
    console.log("Go to next screen:");
    extentions.resetTextAndBG();
    //Show possible actions
    actions.forEach((element) => {
      console.log(element);
    });
    extentions.colorTextAndBG();
  }
  return actions;
}

function exitProgram(...cb) {
  process.on("exit", function (code) {
    showScreenByName("endScreen", ...cb);

    return console.log(`Process to exit with code ${code}`);
  });
}

function transferToScreen(actions, content, ...cb) {
  let screenFound = false;
  let crudButtons = [];
  showOptions(actions, ...cb);

  //Detect available buttons of crud
  actions.forEach((element) => {
    if (["c", "r", "u", "d"].includes(element.button)) {
      crudButtons.push(element.button);
    }
  });

  const input = prompt("Screen: ");

  if (crudButtons.includes(input)) {
    crudManager(input, content, ...cb);
    return;
  }

  //Exit if pressed q
  if (input == "q") {
    exitProgram(...cb);
    return;
  } else {
    //Call screen
    acts = showOptions(actions, ...cb);

    actions.forEach((element) => {
      if (element.button == input) {
        nextScreenToShowName = element.screenName;
        showScreenByName(nextScreenToShowName, ...cb);
        screenFound = true;
        return;
      }
    });

    if (!screenFound) {
      showScreenByName("show404Screen", ...cb);
      return;
    }
  }
}

function showScreen(screenToShow, ...cb) {
  //Define screen parts
  const { content } = screenToShow;
  const { screenMessage } = content;
  const { actions } = content;

  const funcs = [];

  cb.forEach((element) => {
    funcs.push(element.name);
  });

  if (funcs.includes("setHeader")) {
    cb[funcs.indexOf("setHeader")](screenMessage);
  } else {
    console.log("\033[2J");
    console.log(screenMessage);
  }
  transferToScreen(actions, content, ...cb);
}

function saveJson(registers, ...cb) {
  funcs = [];

  cb.forEach((element) => {
    funcs.push(element.name);
  });

  if (funcs.includes("setStorage")) {
    cb[funcs.indexOf("setStorage")](registers);
  } else {
    var jsonContent = JSON.stringify(registers);

    fs.writeFileSync(registersPath, jsonContent, "utf8", function (err) {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
      }
      console.log("JSON file has been saved.");
    });
  }
}

function crudManager(input, content, ...cb) {
  const { atribute } = content;
  const { structure } = content;
  const { actions } = content;
  var rawdataReg = "";
  funcs = [];

  cb.forEach((element) => {
    funcs.push(element.name);
  });
  if (funcs.includes("setStorage")) {
    rawdataReg = fs.readFileSync(cb[funcs.indexOf("setStorage")]());
  } else {
    rawdataReg = fs.readFileSync(registersPath);
  }

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

  saveJson(registers, ...cb);
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

    saveJson(registers, ...cb);
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

    saveJson(registers, ...cb);
  }

  if (input === "d") {
    var _id = prompt("Id to delete: ");
    var element = null;
    var elementDeleted = false;

    registers[atribute].forEach((e) => {
      if (e._id == _id) {
        element = e;
        registers[atribute].pop(e);
        saveJson(registers, ...cb);
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
      showScreenByName(element.screenName, ...cb);
    }
  });
}

// showScreenByName("crudPerson");
// showScreenByName("showWelcomeScreen");

module.exports = function screenBuilder(activeScreenName, ...cb) {
  funcs = [];
  cb.forEach((element) => {
    funcs.push(element.name);
  });
  if (funcs.includes("setStorage")) {
    console.log(cb[funcs.indexOf("setStorage")]());
    extentions.createArchiveForRegistersIfNotExists(
      cb[funcs.indexOf("setStorage")]()
    );
  }

  showScreenByName(activeScreenName, ...cb);
};
