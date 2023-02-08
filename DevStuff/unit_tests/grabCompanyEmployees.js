const fs = require('fs')

const fileData = fs.readFileSync('./unit_tests/testJson.json', 'utf8');
const companyObj = JSON.parse(fileData);

if(companyObj["employees"].length == 0){ return; }

console.log("Employees for "+companyObj["name"]);
for(var i = 0; i < companyObj["employees"].length; i++){
  console.log(i+1 + '. ' + companyObj["employees"][i]);
}
console.log("Buy " + companyObj["name"] + " stock using Stock tag - " + companyObj["stockTag"]);