import { Client } from 'pg';
import dotenv from 'dotenv';
dotenv.config()

export const DATABASE_URL = process.env.DATABASE_URL
console.log(DATABASE_URL);

export const client = new Client({
    connectionString: DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect();
// @ts-ignore
async function initDb() {
    await client.query(
        `CREATE TABLE IF NOT EXISTS swimsuit_man(
          id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          price INTEGER NOT NULL,
          info TEXT NOT NULL,
          sizes INTEGER[] NOT NULL,
          image TEXT NOT NULL);`
    );

    await client.query(
        `CREATE TABLE IF NOT EXISTS swimsuit_women(
          id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          price INTEGER NOT NULL,
          info TEXT NOT NULL,
          sizes INTEGER[] NOT NULL,
          image TEXT NOT NULL);`
    );
    await client.query(
        `CREATE TABLE IF NOT EXISTS boogi(
          id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          price INTEGER NOT NULL,
          info TEXT NOT NULL,
          sizes INTEGER[] NOT NULL,
          image TEXT NOT NULL);`
    );

    await client.query(
        `CREATE TABLE IF NOT EXISTS sup(
          id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          price INTEGER NOT NULL,
          info TEXT NOT NULL,
          sizes INTEGER[] NOT NULL,
          image TEXT NOT NULL);`
    );

    await client.query(
        `CREATE TABLE IF NOT EXISTS soft(
          id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          price INTEGER NOT NULL,
          info TEXT NOT NULL,
          sizes INTEGER[] NOT NULL,
          image TEXT NOT NULL);`
    );

    await client.query(
        `CREATE TABLE IF NOT EXISTS accessories(
          id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          price INTEGER NOT NULL,
          info TEXT NOT NULL,
          sizes INTEGER[] NOT NULL,
          image TEXT NOT NULL);`
    );
    // await client.query(
    //     `CREATE TABLE IF NOT EXISTS boogi(
    //       sock_id SERIAL PRIMARY KEY,
    //       model TEXT NOT NULL,
    //       quantity INTEGER NOT NULL,
    //       size INTEGER NOT NULL,
    //       manufacturing_year TEXT NOT NULL,
    //       location_id INTEGER,
    //       officer_id INTEGER,
    //       CONSTRAINT FK_locationID FOREIGN KEY(location_id)
    //       REFERENCES locations(location_id), 
    //       CONSTRAINT FK_officerId FOREIGN KEY(officer_id)
    //       REFERENCES officers(officer_id)
    //   );`
    // );

    // await client.query(
    //     `CREATE TABLE IF NOT EXISTS locations_history(
    //     location_history_id SERIAL PRIMARY KEY,
    //     arrival_date TEXT NOT NULL,
    //     departure_date TEXT NOT NULL,
    //     location_id INTEGER,
    //     sock_id INTEGER,
    //     CONSTRAINT FK_locationID FOREIGN KEY(location_id)
    //     REFERENCES locations(location_id), 
    //     CONSTRAINT FK_sockId FOREIGN KEY(sock_id)
    //     REFERENCES socks(sock_id)
    //     );`
    // );
    
    await client.query(
        `INSERT INTO boogi (title,price,info,sizes,image) VALUES (24124678,1410123, 'Ligma', 'Dimona'),(687848,148754, 'Hod-Hashron', 'Kefar Sava'), (987648,3214454, 'Hadera', 'Sdot-Yam');`
    );

    // await client.query(
    //     `INSERT INTO officers (name,army_identity_number,email,phone_number) VALUES ('MaximusGlorius', 8802308, 'LigmaBalls@gmail.com', 069-4206969);`
    // );

    // await client.query(
    //     `INSERT INTO socks (model,quantity,size,manufacturing_year,location_id,officer_id) VALUES ('MSocks888', 2, 4, '1945',1, 1);`
    // );

    // await client.query(
    //     `INSERT INTO locations_history (arrival_date,departure_date, location_id, sock_id) VALUES ('1945-11-13', '1945-11-12',1, 1);`
    // );         
    await client.end()
}
    initDb(); //create the tables