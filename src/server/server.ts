import path from 'path';
import express, { Express, response } from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import { client } from './postgres';
import * as DBFunctions from "./postgres"
import * as weatherScript from "./weatherScript"

const app: Express = express();
app.use(cors());
app.use(json());
app.use(express.urlencoded({ extended: true }));
const root: string = path.join(process.cwd(), 'dist');

app.use(express.static(root));

app.use(express.static(root), (_req, _res, next) => {
  next();
});



app.get('/', (_req, response) => {

  console.log('asd');
  client.connect();
  response.send("hello");
});

app.get('/new', (request, response) => {
  console.log('asd');
  weatherScript.checkAndUpdateDailyForecast(response);
})

app.get('/weatherForecast', (request, response) => {
  client.query(`SELECT * FROM daily_forecast;`,(err: Error, res: any)=>{
    if  (err) throw err;
    response.json(res.rows)
  })
})

app.post("/queryRequestNoReturn", (request, response) => {  
  client.query(request.body.sqlString, (err: Error, res: any) => {
    if (err) throw err;
    response.send('yay')
    })
})

app.post("/everyDayGet", (request, response) => {
  client.query(request.body.sqlString, (err: Error, res: any) => {
    if (err) throw err;
    response.json(res.rows)
    })
})


app.post("/getForecast", (request, response) => {
  client.query(request.body.sqlString, (err: Error, res: any) => {
    if (err) throw err;
    response.json(res.rows);
  });
});



app.get("/sideRequest", (request, response) => {
  client.query("SELECT  * FROM soft UNION SELECT * FROM sup order by info ASC LIMIT 3;", (err: Error, res: any) => {
    if (err) throw err;
    response.json(res.rows);
  });
});


app.post("/addProduct", (request, response) => {
  client.query(request.body.sqlString, (err: Error, res: any) => {
    if (err) throw err;
    response.send('product Added successfully');
  })});

app.post("/deleteProduct", (request, response) => {
  client.query(request.body.sqlString, (err: Error, res: any) => {
    if (err) throw err;
    response.send('product Deleted successfully');
  })
})

app.get("/getMailUser", (request, response) => {
  client.query("SELECT email,username FROM users;", (err: Error, res: any) => {
    if (err) throw err;
    response.json(res.rows);
  });
});

app.get("/getBeaches", (request, response) => {
  client.query("SELECT * FROM beaches;", (err: Error, res: any) => {
    if (err) throw err;
    response.json(res.rows);
  });
});




app.post("/getAll", (request, response) => {
  let product = request.body[0];
  let sqlCommand = `SELECT * FROM ${product};`
  client.query(sqlCommand, (err: Error, res) => {
    if (err) throw err;
    response.json(JSON.stringify(res.rows));
  })
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

app.post('/youMayLike', (request: any, _response: any) => {
  let catagory = request.body[0]
  let sqlCommand = `SELECT * FROM ${catagory}
  ORDER BY price DESC LIMIT 4;`
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

app.post('/CheckLogIn', (request: any, response: any) => {
  let logInDetails = request.body.userDetails;
  console.log(logInDetails.mailAddress);
  if (isValidEmailInput(logInDetails.mailAddress)
    && isValidPasswordInput(logInDetails.password)) {
    DBFunctions.checkLogIn(logInDetails, response)
  } else {
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


const port = process.env.PORT || 5006;
app.listen(port, () => {
  console.log('Hosted: http://localhost:' + port);
});
