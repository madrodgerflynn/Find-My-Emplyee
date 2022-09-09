// const connection = require("./connections");
class DB {
  constructor(connection) {
    this.connection = connection;
  }
}
async promptEmployee() {
  let roleQuestion = await this.buildRoleQuestion();
  let departmentQuestion = await this.buildDepartmentQuestion();
  let nameQuestion = this.buildNameQuestion();
  let salaryQuestion = this.buildSalaryQuestion();
  let managerQuestion = this.buildManagerQuestion();
  inquirer.prompt([
      roleQuestion,
      nameQuestion,
      departmentQuestion,
      salaryQuestion,
      managerQuestion,
    ]);
  }
  async buildDepartmentQuestion() {
    let depts = await new Promise((resolve, reject) => {
      this.connection.query("SELECT * FROM department", (err, rows) => {
        if (err) return reject(err);
        console.log(rows);
        resolve(rows);
      });
    });
    let names = [];
    for (let i = 0; i < depts.length; i++) {
      names.push(depts[i].name);
    }
    console.log(names);
    
    
    // query the sql for a list of departments
    //use the dept names as a list of options for a list question
    //return that question object
    buildNameQuestion() {
      return {
        message: "What is the Employee's First Name?",
        name: "f_name",
        type: "input",
      };
  }
  async buildRoleQuestion() {
    // query the sql for a list of roles
    //use the role names as a list of options for a list question
    //return that question object
  }
  saveEmployee(employee) {
    connection.query(
      `INSERT INTO employee VALUES (default, "${f_name}", "${l_name}", "${emp_role}", "${mang_id}")`
    );
  }
}
//
module.exports = DB;
