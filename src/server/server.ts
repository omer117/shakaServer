import path from 'path';
import express, { Express } from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import { client } from './postgres';


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
  client.connect();
  res.send("hello");
});

app.get("/getAllBoogi", (_request, response) => {
  client.query("SELECT * FROM boogi;", (err: Error, res: any) => {
    if (err) throw err;
    response.json(res.rows);
  });
});


app.get("/getAllsup", (_request, response) => {
  client.query("SELECT * FROM sup;", (err: Error, res: any) => {
    if (err) throw err;
    response.json(res.rows);
  });
});

app.get("/getAllsoft", (_request, response) => {
  client.query("SELECT * FROM soft;", (err: Error, res: any) => {
    if (err) throw err;
    response.json(res.rows);
  });
});

app.get("/getAllmanSuit", (_request, response) => {
  client.query("SELECT * FROM swimsuit_man;", (err: Error, res: any) => {
    if (err) throw err;
    response.json(res.rows);
  });
});

app.get("/getAllWomanSuit", (_request, response) => {
  client.query("SELECT * FROM swimsuit_women;", (err: Error, res: any) => {
    if (err) throw err;
    response.json(res.rows);
  });
});


app.post('/getProduct', (request: any, _response) => {
  let id = request.body[0];
  let catagory = request.body[1];
  let sqlCommand = `SELECT * FROM ${catagory} WHERE id=${id};`
  client.query(sqlCommand, (err: Error, res) => {
    if (err) throw err;
    _response.json(JSON.stringify(res.rows[0]));
  })
});

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

const port = process.env.PORT || 5005;
app.listen(port, () => {
  console.log('Hosted: http://localhost:' + port);
});
