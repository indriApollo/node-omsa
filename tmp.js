const child_process = require("child_process");
const db = require("./db.js");

function parse(str) {

    /*
    Index                     : 0
    Status                    : Ok
    Probe Name                : System Board Ambient Temp
    Reading                   : 17.0 C
    Minimum Warning Threshold : 8.0 C
    Maximum Warning Threshold : 42.0 C
    Minimum Failure Threshold : 3.0 C
    Maximum Failure Threshold : 47.0 C
    */
    const re = /Index\s+: \d\nStatus\s+: .+\nProbe Name\s+: System Board Ambient Temp\nReading\s+: (\d+)\.0 C/;
    var m = re.exec(str);
    if(!m) {
        console.log("temps not found");
        return -1;
    }
    return m[1];
}

function omreport(callback) {
    child_process.exec("/opt/dell/srvadmin/sbin/omreport chassis temps", function (error, stdout, stderr) {
        if(error) console.log(stderr);
        callback(stdout);
    });
}

function tmpmonitoring(conf) {
    omreport((output) => {
        var tmpReading = parse(output);

        var query = "INSERT INTO tmpmonitoring (tmp_reading) VALUES(?)";
        var params = [tmpReading];

        console.log("temps: "+tmpReading+" C");
        db(conf, query, params);
    });
}

module.exports = tmpmonitoring;
