const fs = require("fs");

function ChangeJSONValue(UUID, jsonValue, newValue){
  const data = fs.readFileSync('./Users/' + UUID + '.json', 'utf8')
  var jsonObj = JSON.parse(data);
  jsonObj[jsonValue] = newValue
  var json = JSON.stringify(jsonObj, null, 4)
  fs.writeFile('./Users/' + UUID + '.json', json, err => {
  if (err) {
     console.log("uh oh : " + err)
   }
  });
}
function SubtractCurrentJSONValue(UUID, jsonValue, amountToSub){
  const data = fs.readFileSync('./Users/' + UUID + '.json', 'utf8')
  var jsonObj = JSON.parse(data);
  jsonObj[jsonValue] = jsonObj[jsonValue] - amountToSub;
  newAMM = jsonObj[jsonValue] = jsonObj[jsonValue] - amountToSub;
  var json = JSON.stringify(jsonObj, null, 4)
  fs.writeFile('./Users/' + UUID + '.json', json, err => {
  if (err) {
     console.log("uh oh : " + err)
   }
  });

  return newAMM;
}

function GetJSONValue(UUID, _valName){
  const data = fs.readFileSync('./Users/' + UUID + '.json', 'utf8');
  var jsonObj = JSON.parse(data);
  return jsonObj[jsonValue];
}