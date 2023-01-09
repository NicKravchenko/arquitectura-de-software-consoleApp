const sh = require("./index");
const fs = require("fs");

// sh.setTextColor("red");
// sh.setBackgroundColor("default");
// sh.changeRegisterJsonLocation('default')
// sh.changeRegisterJsonLocation('E:\\Books')
const prompt = require("prompt-sync")();


sh.screenBuilder(
  "showWelcomeScreen",
  function setHeader(screenMessage) {
    const textToShow = String(screenMessage).toUpperCase();
    console.log("\033[2J");
    console.log(`\x1b[31m${textToShow}\x1b[37m`);
  },
  function setOptionsShowing(actions) {
    console.log("\nWOW My custom options\n");
    actions.forEach((option) => {
      console.log(`${option.name}\t\t: ${option.button}`);
    });
  },
  function setStorage(registers) {
    var jsonContent = JSON.stringify(registers);
    const registersPath = "E:/ChromeDownloads/config.json";

    if (!registers) return registersPath
    fs.writeFileSync(registersPath, jsonContent, "utf8", function (err) {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
      }
      console.log("JSON file has been saved.");
    });
  }
);
