const fs = require('fs');

const valueName = "Jail-Time";
const value = 0;



AddValueToUser();

function AddValueToUser(){
  const dir = './Users/'
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const data = fs.readFileSync('./Users/' + file, 'utf8')
    var jsonObj = JSON.parse(data);
    jsonObj[valueName] = value;
    var json = JSON.stringify(jsonObj, null, 4)
    fs.writeFile('./Users/' + file, json, err => {
    if (err) {
        console.log(err);
    }
  })
}}

function AddValueToCompany(){
  const dir = './Economy/companies/current/'
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const data = fs.readFileSync('./Economy/companies/current/' + file, 'utf8')
    var jsonObj = JSON.parse(data);
    jsonObj[valueName] = value;
    var json = JSON.stringify(jsonObj, null, 4)
    fs.writeFile('./Economy/companies/current/' + file, json, err => {
    if (err) {
        console.log(err);
    }
  })
}}