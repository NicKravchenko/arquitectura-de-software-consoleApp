const fs = require("fs");

var extentionsconfigRaw = fs.readFileSync(`${__dirname}/extentionsconfig.json`);
var extentionsconfig = JSON.parse(extentionsconfigRaw);

const colors = require(`${__dirname}/colors.js`);

const configTextColor = extentionsconfig.textColor
const configBackgroundColor = extentionsconfig.bgColor

let textColor
let backgroundColor

const fgColors = colors.fg

console.log(fgColors)


Object.keys(fgColors).forEach(key => {
    if (key == configTextColor){ 
        textColor = fgColors[key];
        break;
    }
    else console.log('Color does not exist')
})


coloredPrint('My text')





function coloredPrint(text) { 
    return console.log(textColor, text);
}