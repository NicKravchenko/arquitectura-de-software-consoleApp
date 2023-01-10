# Screen handler

Screen handler is a JavaScript library for building user console windows.

* **Component-Based:** The library is made by components which can be reused and be modified with a simple modification of JSON. 
* **JSON-Based:** It bases in a JSON file which defines how an app will work, all the manipulations can be done with only tweeking the JSON config file.
* **Info-CRUD:** The library gives a posibility of showing info screens and CRUD screens, saving data in other JSON file. 

## Installation

For installing screen handler yoy need to run an npm commanda and it's all set.

```jsx
npm install arquitectura-de-software-consoleapp
```

## Documentation

The whole focus of this library is in a JSON file. Let's first of all see it's structure:
```jsx
{
    "screenName": "myScreen",
    "type": "info",
    "content": {
      "screenMessage": "Welcome to my screen",
      "actions": [
        {
          "name": "Other screen",
          "button": "oc",
          "screenName": "otherScreen"
        },
        {
          "name": "Quit",
          "button": "q",
          "screenName": ""
        }
      ]
    }
  },
```

* We need to have name screen to be able to call it from the other screen.
* Type defines the behaviour of the screen, you can use "info" or "crud" types.
* Content contains screen mesage, which is not optional, but it can be an empty string field.
* Actions contain the actions (transactions) which can be made from current screen.

There are a few important things to have in mind:
* For crud operations its necessary to use c, r, u and d button.
* Button q is pre defined to quit an programm.
* End screen is pre defined too and it is shown every time programm ends.

To use a library you need to install npm package and then to use it and call screen builder.

```jsx
const sh = require("arquitectura-de-software-consoleapp");

sh.screenBuilder("showWelcomeScreen");
```

Screen Builder recieves name of initial screen as a parameter, so, you need to write a correct name to make it work.


## JSON Checker

Before first screen will be shown, library checks if JSON file is all right

## Extentions

Screen handler has 3 points of extentions, using which you can customize your user experience and modify a place where your JSON is stored, or even to save it in another format!  

If we want to execute our extention with no modifications we just call our screen builder, sending there the name of the screen  

```jsx
screenBuilder("showWelcomeScreen");
```  

It changes if it's necessary to modify behaviour of an extention we need to pass new functions as a callback to our package. We need to keep in mind that naming of funtions is vital to make it work and for now we have 3 extentions:  

```jsx
sh.screenBuilder(
  "showWelcomeScreen",
  function setHeader(screenMessage) {},
  function setOptionsShowing(actions) {},
  function setStorage(registers) {}
);
```  

Those are 3 functions we can pass into our screen builder.  
```jsx
setHeader(screenMessage) {}  
```
It recieves a screen message which can be showed as user wants.  
```jsx
setOptionsShowing(actions) {}  
```
It recieves actions which can be decomposed and shown as user wants.  
```jsx
setStorage(registers) {} 
```
It recieves a JSON which by default is saved in the package directory, but it can be rewritten or even saved in other format.
