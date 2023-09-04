const inquirer = require('inquirer');
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

// option lists for db tasks cli
const menuStart = () => {
    inquirer.prompt({
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
        ],
    }).then((answer) => {
        switch (answer.tasks) {
            case 'View all departments':
                viewAllDepts();
                break;
            case 'Add department':
                addDept();
                break;
            case 'View all roles':
                viewRole();
                break;
            case 'Add role':
                addRole();
                break;
            case 'View all employees':
                viewEmployees();
                break;
            case 'Add employee':
                addEmployee();
                break;
            case 'Update employee role':
                updateEmployee();
                break;
            case 'Quit':
                quit();
                break;
        }
    });
};



// brings back to start of cli
function start() {
    inquirer.prompt(cliEnquirer)
        .then((response) => {
            menuStart(response.tasks);
        })
};

function quit () {
    console.log('Clocking out');
    process.exit();
}

function init() {
    start();
};

init();

exports.start = start;