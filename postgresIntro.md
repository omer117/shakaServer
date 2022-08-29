# PostgresSQL
![PostgreSQL](https://i.ibb.co/gznhhdr/postgres.png)  

PostgreSQL is an advanced open-source relational database system. PostgreSQL supports both SQL (relational) and JSON (non-relational) querying.

PostgreSQL is used as a primary database for many web applications as well as mobile and analytics applications.

PostgreSQL allows you to define your own data types, index types, functional languages, etc.

In this lesson we will practice PostgreSQL with Heroku.

### Heroku + PostgreSQL Setup

Heroku Postgres is a managed SQL database service provided directly by Heroku.

Follow the [Heroku postgreSQL tutorial](https://devcenter.heroku.com/articles/heroku-postgresql) to set up your environment.

1) Install the postgres client:
`sudo apt-get install postgresql-client`
2) Create a new Heroku app
3) Connect your app:
   ```
   mkdir heroku-app
   cd heroku-app/
   git init
   heroku git:remote -a <app-name>
   ```

4) To install PostgreSQL:
   ```
   npm install pg
   ```

5) Add [PostgreSQL addon](https://devcenter.heroku.com/articles/heroku-postgresql#provisioning-heroku-postgres):
   ```
   heroku addons:create heroku-postgresql:hobby-dev
   ```
7) Manage postgreSQL [with the CLI](https://devcenter.heroku.com/articles/managing-heroku-postgres-using-cli):
   ```
   heroku pg:psql
   ```

Using the CLI, you can now [create a table](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-create-table/) and [add rows](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-insert-multiple-rows/) into it:
```sql
DROP TABLE IF EXISTS weather;

CREATE TABLE weather (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  area VARCHAR(255) NOT NULL,
  low INT NOT NULL CHECK (low >= 0),
  high INT NOT NULL CHECK (high >= 0),
  prediction_date DATE
);

INSERT INTO 
    weather (name, area, low, high, prediction_date)
VALUES
    ('Jerusalem', 'Center', 30, 19, '2022-07-18'), 
    ('Tel Aviv', 'Center', 30, 25, '2022-07-18'),
    ('Haifa', 'North', 28, 22, '2022-07-18'),
    ('Beer Sheva', 'South', 33, 22, '2022-07-18'),
    ('Eilat', 'South', 38, 24, '2022-07-18'),
    ('Rehovot', 'North', 31, 24, '2022-07-18');

SELECT * FROM weather;
```

### Resources
- [PostgreSQL documentation](https://www.postgresql.org/)
- [PostgreSQL tutorial](https://www.postgresqltutorial.com/)

## Connect from Heroku starter project

Now that you have created a PostgreSQL DB in Heroku, and added some data to it, we want to deploy a server that writes to the DB in heroku.

Let's use the Heroku starter project for that. We'd like to add postgres to it, and also connect it to our new Heroku app.

1) First, let's connect to the Heroku starter project to a local postgres DB. Afterwards, we will deploy our code to Heroku.
2) Look at the [Heroku PostgreSQL connection instructions](https://devcenter.heroku.com/articles/connecting-heroku-postgres#connecting-in-node-js).
   Replace the Heroku starter project `server.ts` with the one in this lesson.

   Make sure to `npm install pg`

   If you're using TypeScript, also `npm install --save @types/pg`

   Note, since we first work locally, you should replace `process.env.DATABASE_URL` with [your DATABASE_URL](https://devcenter.heroku.com/articles/connecting-heroku-postgres#external-connections-ingress). In order to find it use:
   ```
   heroku config
   ```
   If heroku doesn't recognize your project, add `--app <project-name>`.
4) After `npm run start`, accessing `/weather` should give you data from the DB.

### Deploy to Heroku

Now we will deploy our code to Heroku. Look at the instructions in `how-to-deploy.md` in the starter project.

We should set the remote for the git repo in the `deploy` folder to our new Heroku project:

`heroku git:remote -a <heroku project name>`

Once you change back to `connectionString: process.env.DATABASE_URL` in your connection, you can deploy.

After deploying to heroku, go to the URL deployed to with `/weather` to get the weather table data.

