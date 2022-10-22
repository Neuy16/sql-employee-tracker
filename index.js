// Dependancies
const mysql = require("mysql2");
const inquirer = require("inquirer");

// Creates connection to sql database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // TODO: Add MySQL password here
    password: "Emma2003!",
    database: "store_db",
  },
  console.log(`Connected to the movies_db database.`)
);

db.connect((err) => {
  if (err) throw err;
  generateMenu();
});

function generateMenu() {
  inquirer
    .prompt([
      {
        name: "menu",
        type: "list",
        message: "Please select one from the options.",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
        ],
      },
    ])
    .then((answers) => {
      switch (answers) {
        case "View all departments":
          db.query(`SELECT * FROM store_db`, (err, results) => {
            console.table(results);
          });
          generateMenu();
          break;
        case "View all roles":
          // code block
          break;
        case "View all employees":
          // code block
          break;
        case "Add a department":
          // code block
          break;
        case "Add a role":
          // code block
          break;
        case "Add an employee":
          // code block
          break;
        case "Update an employee role":
          // code block
          break;
        default:
        // code block
      }
      // Use user feedback for... whatever!!
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
        console.log("Good try, but this didnt render correctly");
      } else {
        // Something else went wrong
        console.log("What did you do man.... this didnt work!");
      }
    });
}

