const inquirer = require('inquirer');
const cliEnquiry = require('./cliQuestions');
const figlet = require('figlet');

// splash title 
console.log(
    figlet.textSync("Employee Tracker", {
      font: "standard",
      horizontalLayout: "default",
      verticalLayout: "default",
      whitespaceBreak: true,
    })
);

// option lists for db tasks
const cliEnquirer = [
    {
        type: 'list',
        name: 'tasks',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'Add department',
            'View all roles',
            'Add role',
            'View all employees',
            'Add employee',
            'Update employee role',
            'Quit',
        ]
    }
];

// brings back to start of cli
function start() {
    inquirer.prompt(cliEnquirer)
    .then((response) => {
        cliEnquiry(response.tasks);
    })
};

function init() {
    start();
};

init();