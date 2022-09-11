// const connection = require("./connections");
const inquirer = require("inquirer");
class DB {
  constructor(connection) {
    this.connection = connection;
  }
  buildNameQuestion() {
    return {
      message: "What is the Employee's First Name?",
      name: "f_name",
      type: "input",
    };
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
      choices: [{ name: "Add an Employee", value: "addEmployee" }],
    });
    console.log(selectedOption);
    if (selectedOption.basicChoice === "addEmployee") {
      await this.addEmployee();
    }
  }
  async addEmployee() {
    const roleChoices = await this.buildRoleChoices();
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
      {
        message: "Please choose the Employees' role?",
        name: "emp_role",
        type: "list",
        choices: roleChoices,
      },
    ];
    await inquirer.prompt(questions);
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

  saveEmployee(employee) {
    connection.query(
      `INSERT INTO employee VALUES (default, "${f_name}", "${l_name}", "${emp_role}", "${mang_id}")`
    );
  }
}
module.exports = DB;
