<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/psatler/barbershop-backend.svg">

  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/psatler/barbershop-backend.svg">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/psatler/barbershop-backend.svg">

  <img alt="Repository Last Commit Date" src="https://img.shields.io/github/last-commit/psatler/barbershop-backend?color=blue">

  <a href="https://www.linkedin.com/in/pablosatler/">
    <img alt="Made by Pablo Satler" src="https://img.shields.io/badge/made%20by-Pablo%20Satler-blue">
  </a>

  <!-- <img alt="License" src="https://img.shields.io/github/license/psatler/barbershop-backend?color=blue"> -->

</p>

# GoBarber
> Backend of GoBarber in Typescript

Trying to use SOLID principles in this backend using the framework Express.


## How to run

```
git clone https://github.com/psatler/barbershop-backend.git
yarn
yarn dev:server
```

To get the database up, the easiest way is using docker. So, please be sure to install Docker and Docker-Compose. Then, just run:
```
docker-compose up
```


## Dependencies used

- Express
- TypeORM
- PG (for Postgres)
- Mongodb
- JWT
- ESLint
- Prettier
- Uuidv4
- Date Fns
- [Reflect Metadata](https://github.com/rbuckton/reflect-metadata)
- [Tsyringe](https://github.com/microsoft/tsyringe): to apply dependency injection
- [Nodemailer](https://nodemailer.com/about/) for sending emails.
- Cors
- Jest with ts-jest (for testing)


## Acknowledments

- Some TypeORM CLI commands:

```
yarn typeorm migration:create -n CreateAppointments - to create a migration named CreateAppointments

yarn typeorm migration:run - to execute the migrations

yarn typeorm migration:show - to display the migrations already run

yarn typeorm migration:revert - to revert the last migration which will drop the table created
```

- [Here](https://www.restapitutorial.com/httpstatuscodes.html) a good reference for HTTP Status Codes.

