const inquirer = require('inquirer');
const sqlConnection = require('./db/sqlConnection');
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

// department functions
const viewAllDepts = () => {
    sqlConnection.query('SELECT * FROM departments', (err, res) => {
        if (err) throw err;
        console.table(res);
        menuStart();
    });
};

const addDept = () => {
    inquirer.prompt({
        type: 'input',
        name: 'dept_name',
        message: 'What is the new department called?',
    }).then((answer) => {
        sqlConnection.query('INSERT INTO departments SET ?', { dept_name: answer.dept_name }, (err, res) => {
            if (err) throw err;
            console.log('department successfully added');
            menuStart();
        });
    });
};

const checkDeptId = (deptID, callback) => {
    const query = 'SELECT * FROM departments WHERE id = ?';
    sqlConnection.query(query, [deptID], (err, res) => {
        if (err) throw err;
        if (res.length === 0) {
            console.log('invalid ID. Add the department');
            startMenu();
        }  else {
            callback();
        }
    })
}

// role functions
const viewRole = () => {
    sqlConnection.query('SELECT * FROM roles', (err, res) => {
        if (err) throw err;
        console.table(res);
        menuStart();
    });
};

const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the new role titled?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary for this role?'
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'What is the department ID for this role?'
        },
    ]).then((answer) => {
        checkDeptId(answer.department_id, () => {
            sqlConnection.query('INSERT INTO roles SET ?', answer, (err, res) => {
                if (err) throw err;
                console.log('role successfully added');
                menuStart();
            });
        });
    });
};

function quit() {
    console.log('Clocking out');
    process.exit();
}

menuStart();