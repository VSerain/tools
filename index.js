#!/home/victor/.nvm/versions/node/v16.13.1/bin/node

const path = require("path");
const package = require("./package.json");

const args = process.argv.slice(2);

console.log("Hello and Welcome in tools !");

if (package.scripts[args[0]]) {
    require(path.resolve('./', package.scripts[args[0]].split(" ").slice(-1)[0]));
} else {
    console.log("Please choise an scirpt", Object.keys(package.scripts));
}