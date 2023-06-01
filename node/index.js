const app = require("express")();
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "mysqlcontainer",
  user: "root",
  password: "senhaforte",
  database: "dbpeople",
});

app.get("/favicon.ico", (req, resp) => {
  resp.sendStatus(204);
});

app.get("/:name", (req, resp) => {
  const { name } = req.params;
  console.log(name);

  connection.query(
    `INSERT INTO people SET nome=?`, name,
    (err, results) => {
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
