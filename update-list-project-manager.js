const fs = require("fs").promises;
const path = require("path");

const pathToProjectFile =  `${process.env.HOME}/Library/Application\ Support/Code/User/globalStorage/alefragnani.project-manager/projects.json`;
const pathToProject = `${process.env.HOME}/Projects`;

const templateProject = {
    name: "",
    rootPath: "",
    paths: [],
    group: "Leadformance",
    enabled: true,
}

async function main() {
    const buffer = await fs.readFile(pathToProjectFile);
    const content = buffer.toString();
    const configuredProjects = JSON.parse(content);

    const projectsList = await fs.readdir(pathToProject);

    const newConfiguredProjects = projectsList.reduce((acc, projectName) => {
        if (acc.find(p => p.rootPath === path.resolve(pathToProject, projectName))) return acc;
        acc.push(Object.assign({}, templateProject, {
            name: projectName,
            rootPath: path.resolve(pathToProject, projectName),
            paths: [
                path.resolve(pathToProject, projectName)
            ]
        }));
        return acc;
    }, configuredProjects.slice());

    console.log(`${newConfiguredProjects.length - configuredProjects.length} projects added in projectManager`);

    await fs.writeFile(pathToProjectFile, JSON.stringify(newConfiguredProjects, null, "\t"));
}

main();