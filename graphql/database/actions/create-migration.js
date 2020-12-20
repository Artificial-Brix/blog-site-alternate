const fs = require("fs");
const path = require("path");

let tableName;

try {
  tableName = process.argv
    .find((arg) => arg.includes("--tableName="))
    .split("=")[1];
} catch (err) {
  return console.log("--tableName not found. Please specify a tableName");
}

const fileName = new Date().getTime() + `_${tableName}.sql`;

fs.writeFile(
  path.resolve(__dirname, `../migrations/${fileName}`),
  "",
  (err) => {
    if (err) throw new Error(err);
    console.log("created new migrations file in the migrations folder");
  }
);
