const mariadb = require("mariasql");

function insertInDb(conf, insertQuery, params) {
    
    const db = new mariadb({
        host: conf.db_host,
        user: conf.db_user,
        password: conf.db_password,
        db: conf.db_name
    });

    db.query(insertQuery, params, function(err) {
        if(err) console.log(err);
    });
    db.end();
}

module.exports = insertInDb;
