// const connection = require("./connections");
const inquirer = require("inquirer");
class DB {
  constructor(connection) {
    this.connection = connection;
  }

  async promptEmployee() {
    const selectedOption = await inquirer.prompt({
      message: "What would you like to do?",
      name: "basicChoice",
      type: "list",
      choices: [
        {
          name: "Add an Employee",
          value: "addEmployee",
        },
        {
          name: "Add a Department",
          value: "addDepartment",
        },
        {
          name: "Add a Role",
          value: "addRole",
        },
        {
          name: "View all Departments",
          value: "allDepts",
        },
        {
          name: "View all Roles",
          value: "allRoles",
        },
        {
          name: "View all Employess",
          value: "allEmps",
        },
        {
          name: "Exit",
          value: "exit",
        },
      ],
    });

    if (selectedOption.basicChoice === "addEmployee") {
      await this.addEmployee();
    }
    if (selectedOption.basicChoice === "allDepts") {
      await this.allDepts();
    }
    if (selectedOption.basicChoice === "allRoles") {
      await this.allRoles();
    }
    if (selectedOption.basicChoice === "allEmps") {
      await this.viewAllEmployees();
    }
    if (selectedOption.basicChoice === "addDepartment") {
      await this.addDepartment();
    }
    if (selectedOption.basicChoice === "addRole") {
      await this.addRole();
    }
    if (selectedOption.basicChoice === "exit") {
      await this.exit();
    }
  }
  async exit() {
    return process.exit();
  }

  async addRole() {
    const roleChoices = await this.questions;
    // const roleQuestions = (await this.buildRoleChoices()).map((role) => ({
    //   name: role.title,
    //   value: role.id,
    // }));

    const questions = [
      {
        message: "What is the name of the Role you would like to add?",
        name: "title",
        type: "input",
      },
      {
        message: "What is the desired Salary of this role?",
        name: "salary",
        type: "input",
      },
      {
        message: "What is the Departments' ID?",
        name: "department_id",
        type: "input",
      },
    ];
    this.connection.query(
      `INSERT INTO role SET ?`,
      await inquirer.prompt(questions)
    );
    return this.promptEmployee();
  }

  async addDepartment() {
    const deptChoices = await this.questions;

    const questions = [
      {
        message: "What is the name of the Department?",
        name: "name",
        type: "input",
      },
    ];
    this.connection.query(
      `INSERT INTO department SET ?`,
      await inquirer.prompt(questions)
    );
    return this.promptEmployee();
  }

  async addEmployee() {
    const nameChoices = await this.questions;
    const roleChoices = (await this.buildRoleChoices()).map((role) => ({
      name: role.title,
      value: role.id,
    }));
    const managerChoices = (await this.buildManagerChoices()).map(
      (manager) => ({
        name: manager.first_name + " " + manager.last_name,
        value: manager.id,
      })
    );
    managerChoices.push({ name: "none", value: null });

    const questions = [
      {
        message: "What is the Employee's First Name?",
        name: "first_name",
        type: "input",
      },
      {
        message: "What is the Employee's Last Name?",
        name: "last_name",
        type: "input",
      },
      {
        message: "What is the Employees Role?",
        name: "role_id",
        type: "list",
        choices: roleChoices,
      },
      {
        message: "What is the Manager's Name?",
        name: "manager_id",
        type: "list",
        choices: managerChoices,
      },
    ];
    this.connection.query(
      `INSERT INTO employee SET ?`,
      await inquirer.prompt(questions)
    );

    return this.promptEmployee();
  }

  saveEmployee() {}
  async buildManagerChoices() {
    let man_id = await new Promise((resolve, reject) => {
      this.connection.query("SELECT * FROM employee", (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
        console.table(rows);
      });
    });
    return man_id;
  }

  async buildDepartmentChoices() {
    let depts = await new Promise((resolve, reject) => {
      this.connection.query("SELECT * FROM department", (err, rows) => {
        if (err) return reject(err);
        console.table(rows);
        resolve(rows);
      });
    });
    return depts;
  }
  async allDepts() {
    const deptChoices = await this.buildDepartmentChoices();

    return this.promptEmployee();
  }
  async buildRoleChoices() {
    let roles = await new Promise((resolve, reject) => {
      this.connection.query("SELECT * FROM role", (err, rows) => {
        if (err) return reject(err);
        console.table(rows);
        resolve(rows);
      });
    });

    return roles;
  }
  async allRoles() {
    const roleChoices = await this.buildRoleChoices();
    return this.promptEmployee();
  }

  async viewAllEmployees() {
    let allEmployees = await new Promise((resolve, reject) => {
      this.connection.query("SELECT * FROM employee", (err, rows) => {
        if (err) return reject(err);
        console.table(rows);
        resolve(rows);
      });
    });
    let emps = [];

    return this.promptEmployee();
  }
}
module.exports = DB;
