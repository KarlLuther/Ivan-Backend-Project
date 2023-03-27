# Ivan's House of Games API

## Instruction on using this Repo

To start interacting with the databases localy you have to create the environment variables(which you do not have initially for security reasons).

To create them you have to **create two files**(one for testing and one for development) called '.env.test' and '.env.development' within your **main directory**.

Inside the files you type the following code.

```
//For '.env.test'

PGDATABASE=nc_games_test;

//For '.env.development'

PGDATABASE=nc_games;
```

Once you have this done, the programm will be able to access the local enviroment variables and use them in course of it's execution.
