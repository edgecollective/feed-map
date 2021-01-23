var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "./db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQlite database.')
        db.run(`CREATE TABLE feedmaps (
            feedmap_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(255),
            public_key VARCHAR(255),
            private_key VARCHAR(255),
            map_url VARCHAR(255)
            );
            
            CREATE TABLE feeds(
                id SERIAL PRIMARY KEY,
                feed_base_url;
                feed_public_key;
                added TIMESTAMP DEFAULT NOW(),
                CONSTRAINT feedmap
                    FOREIGN KEY(feedmap_id)
                        REFERENCES feedmaps(feedmap_id)
            );
            `,(err) => {
        if (err) {
            // Table already created
            console.log("found table 'feedmaps'");
        }else{
            console.log("created table 'feedmaps'"); 
        }
    })  
    }
})


module.exports = db

