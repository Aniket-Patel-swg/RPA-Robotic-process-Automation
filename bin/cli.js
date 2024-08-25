#!/usr/bin/env node

const { execSync } = require('child_process');
const ora = require('ora');

// Function to run a command synchronously and print the output with a spinner
const runCommandWithSpinner = (command, spinnerText) => {
    const spinner = ora({
        text: spinnerText,
        color: 'blue'
    }).start();

    try {
        execSync(command, { stdio: 'inherit' });
        spinner.succeed(`Completed: ${spinnerText}`);
    } catch (e) {
        spinner.fail(`Failed: ${spinnerText}`);
        console.error(`Failed to execute ${command}`, e);
        return false;
    }
    return true;
};

// Get the repository name from command-line arguments
const repoName = process.argv[2];

if (!repoName) {
    console.error('Please provide a repository name.');
    process.exit(1);
}

const gitCheckoutCommand = `git clone --depth 1 https://github.com/Aniket-Patel-swg/RPA-Robotic-process-Automation.git ${repoName}`;
const installDepsCommand = `cd ${repoName} && npm install`;

console.log(`Starting project setup for ${repoName}`);

// Run the git clone command with a spinner
const checkedOut = runCommandWithSpinner(gitCheckoutCommand, 'Cloning repository');

if (!checkedOut) process.exit(-1);

// Run the npm install command with a spinner
const installedDeps = runCommandWithSpinner(installDepsCommand, 'Installing dependencies');

if (!installedDeps) process.exit(-1);

console.log('Setup complete! You can now navigate to your project directory and start developing.');
console.log(`Next steps:
1. Navigate to the project directory: cd ${repoName}
2. Start the development server: npm start
`);
