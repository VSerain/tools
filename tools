#!/home/victor/.nvm/versions/node/v16.13.1/bin/node

const path = require("path");

const toolsDir = "/home/victor/Projects/Tools/tools"; // Please change me when we change a directory or a computer
const package = require(path.resolve(toolsDir, "package.json"));

const args = process.argv.slice(2);

console.log("Hello and Welcome in tools !");

if (package.scripts[args[0]]) {
    require(path.resolve(toolsDir, package.scripts[args[0]].split(" ").slice(-1)[0]));
} else {
    console.log("Please choise an scirpt", Object.keys(package.scripts));
}