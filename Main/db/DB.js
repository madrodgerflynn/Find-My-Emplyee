// const connection = require("./connections");
const inquirer = require("inquirer");
class DB {
  constructor(connection) {
    this.connection = connection;
  }

  async promptEmployee() {
    // let roleQuestion = await this.buildRoleChoices();
    // let departmentQuestion = await this.buildDepartmentQuestion();
    // let nameQuestion = this.buildNameQuestion();
    // let salaryQuestion = this.buildSalaryQuestion();
    // // let managerQuestion = this.buildManagerQuestion();
    // inquirer.prompt([
    //   roleQuestion,
    //   nameQuestion,
    //   departmentQuestion,
    //   salaryQuestion,
    //   // managerQuestion,
    // ]);
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
          name: "View all Departments",
          value: "allDepts",
          //need to call a fx to view depts?
        },
        {
          name: "View all Roles",
          value: "allRoles",
        },
        {
          name: "View all Employess",
          value: "allEmps",
        },
      ],
    });
    // console.log(selectedOption);
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

    // let names = [];
    // for (let i = 0; i < depts.length; i++) {
    //   names.push({ name: depts[i].name, value: depts[i].id });
    // }

    return this.promptEmployee();
    //  needs to store the user input into the employee DB
  }

  saveEmployee() {}
  async buildManagerChoices() {
    let man_id = await new Promise((resolve, reject) => {
      this.connection.query("SELECT * FROM employee", (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
    return man_id;
  }

  // let names = [];
  // for (let i = 0; i < depts.length; i++) {
  //   names.push({ name: depts[i].name, value: depts[i].id });
  // }
  async buildDepartmentChoices() {
    let depts = await new Promise((resolve, reject) => {
      this.connection.query("SELECT * FROM department", (err, rows) => {
        if (err) return reject(err);

        resolve(rows);
      });
    });
    return depts;
  }
  async allDepts() {
    const deptChoices = await this.buildDepartmentChoices();
    console.log(deptChoices);
    return this.promptEmployee();
  }
  async buildRoleChoices() {
    let roles = await new Promise((resolve, reject) => {
      this.connection.query("SELECT * FROM role", (err, rows) => {
        if (err) return reject(err);

        resolve(rows);
      });
    });

    // let emp_role = [];
    // for (let i = 0; i < roles.length; i++) {
    //   emp_role.push({ name: roles[i].title, value: roles[i].id });
    // }
    return roles;
  }
  async allRoles() {
    const roleChoices = await this.buildRoleChoices();
    console.log(roleChoices);
    return this.promptEmployee();
  }

  async viewAllEmployees() {
    let allEmployees = await new Promise((resolve, reject) => {
      this.connection.query("SELECT * FROM employee", (err, rows) => {
        if (err) return reject(err);
        console.log(rows);
        resolve(rows);
      });
    });
    let emps = [];

    return this.promptEmployee();
  }
}
module.exports = DB;
