// Dependancies
const mysql = require("mysql2");
const inquirer = require("inquirer");

// Creates connection to sql database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    password: "1212",
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
          updateEmployee()
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

let depNamesArray = [];
let depIdArray = [];
function addRole() {
  db.query(
      "SELECT * FROM departments",
      function (err, results) {
        for (let i=0; i<results.length; i++) {
          depNamesArray.push(results[i].name);
          depIdArray.push(results[i].departmentsID)
       }
       return depNamesArray;
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
        message: 'How much does this person make?'
      },
      {
        name: 'newRoleDpt',
        type: 'list',
        message: 'What department does this role belong to?',
        choices: depNamesArray
      },
    ])
    .then((answers) => {
      db.query("INSERT INTO ROLES (title) VALUES (?)", [answers.newRoleTitle]);
      db.query("INSERT INTO ROLES (salary) VALUES (?)", [answers.newRoleSalary]);
      switch (answers.newRoleDpt) {
        case depNamesArray[i]: db.query("INSERT INTO ROLES (name) VALUES (?)", [answers.newDpt]); 
      }
        
      generateMenu();
    })
  };

  let roleArr = [];
  function addEmployee() {
    db.query(
      "SELECT * FROM ROLES",
      function (err, results) {
        for (let i=0; i<results.length; i++) {
          roleArr.push(results[i].name + results[i].departmentsID)
          // depIdArray.push(results[i].departmentsID)
       }
      //  console.log(depNamesArray)
       return roleArr;
      }
    );

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
        // {
        //   name: "newEmployeeRole",
        //   type: "list",
        //   choices: ,
        //   message: "What role is this employee?",
        // }
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

  let empChoice = [];
  function updateEmployee() {
    db.query(
      "SELECT * FROM departments",
      function (err, results) {
        for (let i=0; i<results.length; i++) {
          empChoice.push(results[i].first_name);
          empChoice += results[i].last_name;
       }
       return empChoice;
      }
    );
    inquirer.prompt([
      {
        name: "employeeChoice",
        type: "choice",
        choices: empChoice,
        message: "Which employee would you like to update?"
      }
    ])
    .then((answers) => {});
  }

