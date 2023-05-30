const app = require("express")();
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "mysqlcontainer",
  user: "root",
  password: "senhaforte",
  database: "dbpeople",
});

app.get("/", (req, resp) => {
  const names = ["Thiago", "Roberto", "Pedro", "Arthur"];
  const values = names.map(name => [name]);

  const query = "INSERT INTO people (nome) VALUES ?";

  connection.query(query, [values], (err, results)  => {
      if (err) {
        return resp.send(`Ocorreu um erro  
          ${err.message}`);
      }
      connection.query(
        "SELECT * FROM `people`",
        function (err, results, fields) {
          if (err) {
            return resp.send(`Ocorreu um erro  
            ${err.message}`);
          }
          return resp.send(`
        <h1>Full Cycle Rocks!</h1>
        <ul>
        ${results.reduce((agg, cur) => agg + `<li>${cur.nome}</li>`, "")}
        </ul>`);
        }
      );
    }
  );
});

const port = 3000;

app.listen(port, () => {
  console.log(`app is running on ${port}`);
});
