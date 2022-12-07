const Person = require("./person");

person = new Person("s", "s", 1);

const config = fetch("./config.json")
  .then((response) => response.json())
  .then((json) => console.log(json));

const showWelcomeScreen = () => {
  console.log("Hello, it's ");
};
