function givePayCheck() {
  const dir = './Users/'
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const data = fs.readFileSync('./Users/' + file, 'utf8')
    var jsonObj = JSON.parse(data);
    if (jsonObj["paycheck"] == 0) { continue; }
    if (jsonObj["employer"] == "None") { continue; }
    const companyData = fs.readFileSync('./Economy/companies/current/' + jsonObj["employer"] + '.json', 'utf8');
    var companyObj = JSON.parse(companyData);
    if (companyObj["funds"] - jsonObj["paycheck"] < 0) { continue; }
    jsonObj["money"] = jsonObj["money"] + jsonObj["paycheck"];
    var json = JSON.stringify(jsonObj, null, 4)
    fs.writeFile('./Users/' + file, json, err => {
      if (err) {
        console.log(err);
      }
    })
    companyObj["funds"] = companyObj["funds"] - jsonObj["paycheck"]
    json = JSON.stringify(companyObj, null, 4)
    fs.writeFile('./Economy/companies/current/' + jsonObj["employer"] + ".json", json, err => {
      if (err) { console.log(err) }
    })
  }

}