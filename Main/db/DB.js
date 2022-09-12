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
    const questions = [
      {
        message: "What is the Employee's First Name?",
        name: "f_name",
        type: "input",
      },
      {
        message: "What is the Employee's Last Name?",
        name: "l_name",
        type: "input",
      },
    ];
    await inquirer.prompt(questions);
    return this.promptEmployee();
    //  needs to store the user input into the employee DB
  }

  saveEmployee() {
    connection.query(
      `INSERT INTO employee VALUES (default, "${f_name}", "${l_name}", "${emp_role}", "${mang_id}")`
    );
  }

  async buildDepartmentChoices() {
    let depts = await new Promise((resolve, reject) => {
      this.connection.query("SELECT * FROM department", (err, rows) => {
        if (err) return reject(err);
        console.log(rows);
        resolve(rows);
      });
    });
    let names = [];
    for (let i = 0; i < depts.length; i++) {
      names.push({ name: depts[i].name, value: depts[i].id });
    }
    return names;
    // console.log(names);
  }
  async allDepts() {
    const deptChoices = await this.buildDepartmentChoices();
    const questions = [
      {
        message: "Please choose the Employees' department?",
        name: "depts",
        type: "list",
        choices: deptChoices,
      },
    ];
    return this.promptEmployee();
    // console.log(this.allDepts);
  }
  async buildRoleChoices() {
    let roles = await new Promise((resolve, reject) => {
      this.connection.query("SELECT * FROM role", (err, rows) => {
        if (err) return reject(err);
        console.log(rows);
        resolve(rows);
      });
    });
    let emp_role = [];
    for (let i = 0; i < roles.length; i++) {
      emp_role.push({ name: roles[i].title, value: roles[i].id });
    }
    return emp_role;
  }
  async allRoles() {
    const roleChoices = await this.buildRoleChoices();
    const questions = [
      {
        message: "Please choose a role",
        name: "role",
        type: "list",
        choices: roleChoices,
      },
    ];
    return this.promptEmployee();
  }
  //   async allEmps() {
  //    const viewEmps = await this.
  //  }

  async viewAllEmployees() {
    let allEmployees = await new Promise((resolve, reject) => {
      this.connection.query("SELECT * FROM employee", (err, rows) => {
        if (err) return reject(err);
        console.log(rows);
        resolve(rows);
      });
    });
    let emps = [];
    for (let i = 0; i < allEmployees.length; i++) {
      emps.push({
        name: allEmployees[i].f_name,
        value: allEmployees[i].first_name,
        name: allEmployees[i].l_name,
        value: allEmployees[i].last_name,
      });
    }
    return this.promptEmployee();
  }
}
module.exports = DB;
