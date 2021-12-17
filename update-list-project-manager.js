const fs = require("fs").promises;
const path = require("path");

const pathToProjectFile =  `${process.env.HOME}/.config/Code/User/globalStorage/alefragnani.project-manager/projects.json`;
const pathToProject = `${process.env.HOME}/Projects`;

const templateProject = {
    name: "",
    rootPath: "",
    tags: [],
    enabled: true,
}

async function findOrganisations(path) {
    return fs.readdir(path)
}

async function main() {
    const buffer = await fs.readFile(pathToProjectFile);
    const content = buffer.toString();
    const configuredProjects = JSON.parse(content);

    const organisations = await findOrganisations(pathToProject);
    let count = 0;

    console.info('Start scanning projects ...');

    await Promise.all(organisations.map(async (orga) => {
        const projectsList = await fs.readdir(path.resolve(pathToProject, orga));

        projectsList.reduce((acc, projectName) => {
            if (acc.find(p => p.rootPath === path.resolve(pathToProject, orga, projectName))) return acc;
            acc.push(Object.assign({}, templateProject, {
                name: projectName,
                rootPath: path.resolve(pathToProject, orga, projectName),
                tags: [orga]
            }));
            console.info(`\t• ${projectName} (Organisation: ${orga}) as been added ProjectManager`);
            count++;
            return acc;
        }, configuredProjects);
    }));
    
    if (count === 0) {
        console.info('Not new project found.');
        return
    }

    console.info(`${count} projects added in ProjectManager`);
    await fs.writeFile(pathToProjectFile, JSON.stringify(configuredProjects, null, "\t"));
}

/*
    This project is based on this architecture :

    Base of all projects -> Organisations -> Project

    For exemple

    /home/victor/Projects/Hermes/Hermes-worker-core

    Projects is folder with all projects by organisation
    Hermes is an Organisations
    Hermes-worker-core is project
*/

main();