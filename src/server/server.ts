import path from 'path';
import express, { Express } from 'express';
import cors from 'cors';
import { json } from 'body-parser';
// import { client } from './postgres';


const app: Express = express();
app.use(cors());
app.use(json());
app.use(express.urlencoded({ extended: true }));
const root: string = path.join(process.cwd(), 'dist');

app.use(express.static(root));

app.use(express.static(root), (_req, _res, next) => {
  next();
});

app.get('/', (_req, res) => {
  console.log('asd');
  
  res.send("hello");
});

// app.get("/getSocks", (_request, response) => {
//   client.query("SELECT * FROM socks", (err: Error, res: any) => {
//     if (err) throw err;
//     response.json(res.rows);
//   });
// });

// app.get("/getLocationsID", (_request, response) => {
//   client.query("SELECT location_id FROM locations;", (err: Error, res: any) => {
//     if (err) throw err;
//     response.json(res.rows.map((obj: any) => obj.location_id));
//   });
// });

// app.get("/getOfficersID", (_request, response) => {
//   client.query("SELECT officer_id FROM officers;", (err: Error, res: any) => {
//     if (err) throw err;
//     response.json(res.rows.map((obj: any) => obj.officer_id));
//   });
// });

// app.post('/getSockById', (request: any, _response) => {
//   client.query(request.body.sqlString, (err: Error, res) => {
//     if (err) throw err;
//     _response.json(JSON.stringify(res.rows[0]));
//   })
// });

// app.post('/addSockToDb', (request: any, _response) => {
//   client.query(request.body.sqlString, (err: Error) => {
//     if (err) throw err;
//   })
// });

// app.post('/editSockById', (request: any, _response) => {
//   client.query(request.body.sqlString, (err: Error) => {
//     if (err) throw err;
//   })
// });

// app.post('/deleteSockById', (request: any, _response) => {
//   request.body.sqlString.forEach((str: string) => {
//     client.query(str, (err: Error) => {
//       if (err) throw err;
//     })
//   })
// });

const port = process.env.PORT || 5002;
app.listen(port, () => {
  console.log('Hosted: http://localhost:' + port);
});
