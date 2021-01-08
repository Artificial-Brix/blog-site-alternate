const knex = require("../mysql");
const promise = require("bluebird");
const path = require("path");
const fs = require("fs");
const db = knex.client.config.connection.database || null;

function replaceAll(string, delimiter, replacement) {
  return string.split(delimiter).join(replacement);
}

fs.readdir(path.resolve(__dirname, "../migrations"), "utf-8", (err, files) => {
  if (err) throw new Error(err);
  return promise
    .each(files, (filename) => {
      return new Promise((resolve, reject) => {
        fs.readFile(
          path.resolve(__dirname, `../migrations/${filename}`),
          "utf-8",
          (err, sql) => {
            if (err) reject(err);
            return knex
              .raw(replaceAll(sql, "{}", db))
              .then(resolve)
              .catch((err) => {
                console.log(err);
              });
          }
        );
      });
    })
    .then(() => console.log("Migrations have run successfully."))
    .catch((err) => {
      console.log(err);
    });
});
