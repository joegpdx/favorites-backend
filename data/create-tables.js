const client = require('../lib/client');

run();

async function run() {

    try {
        // run a query to create tables
        await client.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                email VARCHAR(256) NOT NULL,
                hash VARCHAR(512) NOT NULL,
                display_name VARCHAR(256) NOT NULL
            );
        
            CREATE TABLE favorites (
                id SERIAL PRIMARY KEY,
                name VARCHAR(1024),
                user_id INTEGER NOT NULL REFERENCES users(id),
                status VARCHAR(256) NOT NULL,
                image VARCHAR(512) NOT NULL,
                species VARCHAR(512) NOT NULL
            );
        `);

        console.log('create tables complete');
    }
    catch (err) {
        // problem? let's see the error...
        console.log(err);
    }
    finally {
        // success or failure, need to close the db connection
        client.end();
    }
    
}