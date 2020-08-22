const fs = require('fs');

const JSONData = fs.readFileSync('tempapp.json');

const data = JSON.parse(JSONData);
data.name = 'mert degil';
data.age = 10;

fs.writeFileSync('tempapp.json',JSON.stringify(data));