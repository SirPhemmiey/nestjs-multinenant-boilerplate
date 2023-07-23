<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Description

Personal and production-ready [Nest](https://github.com/nestjs/nest) boilierplate to kick-start a new schema-based multitenant project right off the bat! This is hooked up with PostgreSQL as the database (although configurable) and TypeORM as the ORM. Because it's a simple boilerplate, i just have the endpoint for creating an `organization` and then you can go ahead to customize it for your needs. You can use it as a boilerplate for your SaaS solution if you'll have different `organizations` (it may have a different name depending on your context) and you want to keep their data isolated. I'll be writing an article on this in a while.

The goal and intention is for it to be simple and easy to use. You can find other boilerplates in my profile.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```
