const connection = require("./connections");
class DB {
  constructor(connection) {
    this.connection = connection;
  }

  createEmployee(employee) {
    return this.connection.promise();
    inquirer
      .prompt([
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
          message: "What is the Employee's role?",
          name: "emp_role",
          type: "input",
        },
        {
          message: "What is the Manager's ID Number?",
          name: "mang_id",
          type: "input",
        },
        console.log(this.createEmployee),
      ])
      // Add some lets and making it into an [] to push it into the query
      // After query, throw console.log to check values

      .query(
        `INSERT INTO employee VALUES (default, "${f_name}", "${l_name}", "${emp_role}", "${mang_id}")`
      );
  }
}
