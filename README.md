# Bugtracker

A fullstack responsive bugtracking application I built over the Summer of 2021. It uses React + Bootstrap + Urql for frontend, Express + Prisma + Postgres + Apollo for backend, and Auth0 + Passport for authentication. The project is deployed on heroku right here: https://murmuring-shore-99299.herokuapp.com/. Feel free to create an account (I've currently set it up to accept all new user requests) and poke around a bit.

While a good chunk of the backend is done parts of the frontend still need to be completed such as the ability to create new projects and hiding different options from different levels of users. These features should be trivial enough to implement and should take a couple of days at best to do. 

Heroku App template: create-react-app

## Personal notes (feel free to ignore): 

- From what I understand, schema.prisma helps manage the database while schema.graphql moderates the access to this schema by the user

- Use this command to own all files: sudo chmod -R a+rwx .

- Cannot connect to server: Do a network reset on windows

- Setting up postgresql:
 
1. Follow tutorial here to setup postgres: https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-20-04

2. Put in your user credentials in .env file. Use tutorial here https://chartio.com/resources/tutorials/how-to-set-the-default-user-password-in-postgresql/ if you need to reset your password

3. Run yarn prisma migrate reset to run all your migrations on the new database
