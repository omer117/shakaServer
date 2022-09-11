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

app.get("/sideRequest", (request, response) => {
  client.query("SELECT  * FROM soft UNION SELECT * FROM sup order by info ASC LIMIT 3;", (err: Error, res: any) => {
    if (err) throw err;
    response.json(res.rows);
  });
});


app.get("/sideRequest", (request, response) => {
    client.query("SELECT email FROM users;", (err: Error, res: any) => {
      if (err) throw err;
      response.json(res.rows);
    });
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
  // console.log(request.body);
  
  let id = request.body[0];
  let catagory = request.body[1];
  let sqlCommand = `SELECT * FROM ${catagory} WHERE id=${id};`
  client.query(sqlCommand, (err: Error, res) => {
    if (err) throw err;
    _response.json(JSON.stringify(res.rows[0]));
  })
});

app.post('/youMayLike',(request: any, _response:any)=>{
  let catagory = request.body[0]
  let sqlCommand = `SELECT * FROM ${catagory}
  ORDER BY price DESC
  LIMIT 4
  ;`
  client.query(sqlCommand, (err: Error, res) => {
    if (err) throw err;
    _response.json(JSON.stringify(res.rows));
  })

})


app.post('/addUser', (request: any, response) => {
  let newUser = request.body.userDetails;
  if (isValidUserNameInput(newUser.userName)
    && isValidEmailInput(newUser.mailAddress)
    && isValidPasswordInput(newUser.password)) {
    DBFunctions.AddNewUser(newUser, response)
  } else {
    response.send('no sqli')
  }
});

app.post('/CheckLogIn',(request: any, response:any)=>{
  let logInDetails = request.body.userDetails;
  console.log(logInDetails.mailAddress);
  if( isValidEmailInput(logInDetails.mailAddress)
    && isValidPasswordInput(logInDetails.password)){
      DBFunctions.checkLogIn(logInDetails,response)
    }else{
      response.send('not gonna happen bro')
    }
})




function isValidEmailInput(email: string) {
  const specialCharsForEmail = /[`!#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;

  return !specialCharsForEmail.test(email)
}

function isValidPasswordInput(password: string) {
  const specialCharsForPassowrd = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  return !specialCharsForPassowrd.test(password)
}

function isValidUserNameInput(name: string) {
  const specialCharsForName = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  return !specialCharsForName.test(name)
}


const port = process.env.PORT || 5005;
app.listen(port, () => {
  console.log('Hosted: http://localhost:' + port);
});
