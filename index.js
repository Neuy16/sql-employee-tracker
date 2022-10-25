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
});

generateMenu();
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
      console.log(answers.menu);
      switch (answers.menu) {
        case "View all departments":
          viewDepartments();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "View all employees":
          viewEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          // code block
          break;
        case "Update an employee role":
          // code block
          break;
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

// SQL query functions
function viewDepartments() {
  db.query(
    `SELECT departmentsID, name FROM departments`,
    function (err, results) {
      console.log("----------------*ALL DEPARTMENTS*------------------");
      console.table(results);
      console.log("---------------------------------------------------");
      generateMenu();
    }
  );
}

function viewRoles() {
  db.query(
    `SELECT rolesID, title, salary, departmentsID FROM roles`,
    function (err, results) {
      console.log("----------------*ALL ROLES*------------------");
      console.table(results);
      console.log("---------------------------------------------------");
      generateMenu();
    }
  );
}

function viewEmployees() {
  db.query(
    `SELECT employeesID, first_name, last_name, managersID, rolesID FROM employees`,
    function (err, results) {
      console.log("----------------*ALL EMPLOYEES*------------------");
      console.table(results);
      console.log("---------------------------------------------------");
      generateMenu();
    }
  );
}

function addDepartment() {
  inquirer
    .prompt([
      {
        name: "newDpt",
        type: "input",
        message: "What's the department name?",
      },
    ])
    .then((answer) => {
      db.query("INSERT INTO DEPARTMENTS (name) VALUES (?)", [answer.newDpt]);
      generateMenu();
    });
}

function addRole() {
    let sql = db.query(
      "SELECT departmentsID, name FROM departments",
      function (err, results) { 
        console.table(results);
      }
    );
  
    inquirer
    .prompt([
      {
        name: 'newRoleTitle',
        type: 'input',
        message: 'What is the title for this role?'
      },
      {
        name: 'newRoleSalary',
        type: 'input',
        message: 'How much do they make?'
      },
      {
        name: 'newRoleDpt',
        type: 'list',
        message: 'What ID number does this role belong to?',
        choices: [
          sql
        ]
      },
    ])
    .then((answers) => {

    })
  };

  function addEmployee() {
    inquirer
      .prompt([
        {
          name: "newEmployeeFirstname",
          type: "input",
          message: "Whats the first name of the employee?",
        },
        {
          name: "newEmployeeLastname",
          type: "input",
          message: "Whats the last name of the employee?",
        },
        {
          name: "newEmployeeMgr",
          type: "list",
          choices: ["Yes", "No"],
          message: "Does this employee have a Manager?",
        },
      ])
      .then((answers) => {
        let employeeMgr = db.query(
          "SELECT *  FROM students",
          function (err, results) {
            console.log(results);
          }
        );
        switch (answers.newEmployeeMgr) {
          case "Yes":
            inquirer.prompt([
              {
                name: "mgrID",
                type: "choice",
                choices: "",
                message: "Which option is this employee manager?",
              },
            ]);
            break;
          case "No":
        }
      });
  }

  function updateEmployee() {
    inquirer.prompt([{}]).then((answers) => {});
  }

