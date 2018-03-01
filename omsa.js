const fs = require("fs");
const pwrmonitoring = require("./pwr.js");
const tmpmonitoring = require("./tmp.js");

console.log("Load config ...");
const confkeys = [
    "db_host",
    "db_user",
    "db_password",
    "db_name",
    "pwr_interval",
    "tmp_interval"
];
const conf = JSON.parse(fs.readFileSync("config.json"));
for(var i = 0; i < confkeys.length; i++) {
    var k = confkeys[i];
    if(!conf[k]) {
        throw "Config: missing "+k;
    }
}

setInterval(pwrmonitoring, conf.pwr_interval*60*1000, conf);
setInterval(tmpmonitoring, conf.tmp_interval*60*1000, conf);
