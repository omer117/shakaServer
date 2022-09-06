import path from 'path';
import express, { Express, response } from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import { client } from './postgres';
import * as DBFunctions from "./postgres"

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
  client.query("SELECT * FROM mansuit;", (err: Error, res: any) => {
    if (err) throw err;
    response.json(res.rows);
  });
});

app.get("/getAllWomanSuit", (_request, response) => {
  client.query("SELECT * FROM womansuit;", (err: Error, res: any) => {
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


app.post('/addUser', (request: any, response) => {
  let newUser = request.body.userDetails;
  if (isValidNameInput(newUser.userName)
    && isValidEmailInput(newUser.mailAddress)
    && isValidPasswordInput(newUser.password)) {
    console.log('first server if');
    DBFunctions.AddNewUser(newUser, response)
  } else {
    response.send('no sqli')
  }
});





function isValidEmailInput(email: string) {
  const specialCharsForEmail = /[`!#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;

  return !specialCharsForEmail.test(email)
}

function isValidPasswordInput(password: string) {
  const specialCharsForPassowrd = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  return !specialCharsForPassowrd.test(password)
}

function isValidNameInput(name: string) {
  const specialCharsForName = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  return !specialCharsForName.test(name)
}

// function isValidIdInput(id: string) {
//   const specialCharsForId = /^[0-9]+$/;

//   return specialCharsForId.test(id)
// }

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
