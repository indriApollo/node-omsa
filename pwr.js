const child_process = require("child_process");

function parse(str) {

    /*
    Power Consumption
    Index             : 2
    Status            : Ok
    Probe Name        : System Board System Level
    Reading           : 154 W
    Warning Threshold : 917 W
    Failure Threshold : 966 W
    */
    const re = /Power Consumption\nIndex\s+: \d\nStatus\s+: .+\nProbe Name\s+: System Board System Level\nReading\s+: (\d+) W/;
    var m = re.exec(str);
    if(!m) {
        console.log("Not found");
        return -1;
    }
    return m[1];
}

function omreport(callback) {
    child_process.exec("omreport chassis pwrmonitoring unit=watt", function (error, stdout, stderr) {
        if(error) console.log(stderr);
        callback(stdout);
    });
}

function omsaPwr(callback) {
    omreport((output) => {
        callback( parse(output) );
    });
}

module.exports = omsaPwr;