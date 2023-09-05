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
            console.log('invalid ID. Add the appropriate department');
            menuStart();
        } else {
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

    sqlConnection.query('SELECT * FROM departments', (err, departments) => {
        if (err) throw err;
        const departmentSelect = departments.map(deptChoice => ({ name: deptChoice.name, value: deptChoice.dept_name }));
        departmentSelect.push({ name: 'None', value: null });

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
                type: 'list',
                name: 'department_id',
                message: 'What is the department ID for this role?',
                choices: departmentSelect,
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
    });
};

const checkRoleId = (roleID, callback) => {
    const query = 'SELECT * FROM roles WHERE id = ?';
    sqlConnection.query(query, [roleID], (err, res) => {
        if (err) throw err;
        if (res.length === 0) {
            console.log('invalid ID. Add the appropriate role');
            menuStart();
        } else {
            callback();
        };
    });
};

// employee functions
const viewEmployees = () => {
    sqlConnection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.table(res);
        menuStart();
    });
};

const addEmployee = () => {
    sqlConnection.query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee', (err, res) => {
        if (err) throw err;

        inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: "What is the employee's first name?",
            },
            {
                type: 'input',
                name: 'last_name',
                message: "What is the employee's last name?",
            },
            {
                type: 'input',
                name: 'role_id',
                message: "What is the employee's role ID?",
            },
        ]).then((answer) => {
            checkRoleId(answer.role_id, () => {
                sqlConnection.query('INSERT INTO employee SET ?', answer, (err, res) => {
                    if (err) throw err;
                    console.log('employee successfully added');
                    menuStart();
                });
            });
        });
    });
};

const updateEmployee = () => {
    sqlConnection.query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee', (err, employees) => {
        if (err) throw err;
        const employeeDetails = employees.map(employeeChange => ({ name: employeeChange.name, value: employeeChange.id }));
        sqlConnection.query('SELECT id, title FROM roles', (err, roles) => {
            if (err) throw err;
            const roleDetails = roles.map(roleChange => ({ name: roleChange.title, value: roleChange.id }));

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employeeName',
                    message: 'which employee would you like to update?',
                    choices: employeeDetails,
                },
                {
                    type: 'list',
                    name: 'roleTitle',
                    message: 'which role would you like to switch to?',
                    choices: roleDetails,
                },
            ]).then((answer) => {
                sqlConnection.query('UPDATE employee SET role_id ? WHERE role_id = ?', [answer.roleTitle, answer.employeeName], (err, res) => {
                    if (err) throw err;
                    console.log('employee successfully updated');
                    menuStart();
                });
            });
        });
    });
};

function quit() {
    console.log('Clocking out');
    process.exit();
}

menuStart();