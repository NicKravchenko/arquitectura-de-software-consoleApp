const Person = require("./person");
const screenBuilder = require(`${__dirname}/screenBuilder`);

// screenBuilder("showWelcomeScreen");
//Read Screen JSON

//   module.exports.summNumbers = (a, b) => {
//     return a + b;
//   };

module.exports.screenBuilder = (activeScreenName) => {
  screenBuilder(activeScreenName);
};
