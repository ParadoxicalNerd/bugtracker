Okay, so from what I understand, schema.prisma helps manage the database while schema.graphql moderates the access to this schema by the user

Use this command to own all files: sudo chmod -R a+rwx .

Cannot connect to server:
Do a network reset on windows

Setting up postgresql:
Follow tutorial here to setup postgres: https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-20-04
Put in your user credentials in .env file. Use tutorial here https://chartio.com/resources/tutorials/how-to-set-the-default-user-password-in-postgresql/ if you need to reset your password
Run yarn prisma migrate reset to run all your migrations on the new database
