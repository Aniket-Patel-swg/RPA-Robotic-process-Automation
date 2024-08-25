#! /usr/bin/env node

const { execSync } = require('child_process');

const runCommand = command => {
    try {
        execSync(`${command}`, { stdio: 'inherit' });
    }
    catch (e) {
        console.error(`Failed to execute ${command}`, e);
        return false;
    }
    return true;
}

const repoName = process.argv[2]

const gitCheckoutCommand = `git clone --depth 1 https://github.com/Aniket-Patel-swg/RPA-Robotic-process-Automation.git ${repoName}`;
const installDepsCommand = `cd ${repoName} && npm install`;

console.log(`Making project ${repoName} for cool developer`);

const checkedOut = runCommand(gitCheckoutCommand);

if (!checkedOut) process.exit(-1);

console.log(`Installing dependencies for you!! Project Name: ${repoName}`);

const installeDeps = runCommand(installDepsCommand)
if (!installeDeps) process.exit(-1);

console.log('There you go')