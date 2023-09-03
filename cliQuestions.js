const mysql = require('mysql2');
const inquirer = require('inquirer');

function quit () {
    console.table(logo({
        name: "Bye!",
    }).render());
    process.exit();
}

module.exports = cliEnquiry;