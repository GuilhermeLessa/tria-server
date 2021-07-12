# TRIA-SERVER
A Node GraphQL HTTP Server to test the new fullstack developers.

<br>

### 1. Install and up server

First run npm install to download tria server dependencies.
```
  npm install
```

Then use nodemon to up server at <code>http://localhost:4000/</code>.
```
  nodemon server
```

<hr>

### 2. Create the database

Create a database and configure the connection object at <code>/server/core/database.js</code>:

![image](https://user-images.githubusercontent.com/8376833/125345589-1b8b1580-e32f-11eb-9a28-3b83237cd007.png)

There is a working model in <code>/server/assets/database.sql</code>:

![image](https://user-images.githubusercontent.com/8376833/125346804-8db02a00-e330-11eb-9f99-3fec7d5ab466.png)

<hr>

### 3. Let's Go! to the Playground

Use the <code>http://localhost:4000/</code> GraphQL Playground to test requisitions:

![image](https://user-images.githubusercontent.com/8376833/125347767-b389fe80-e331-11eb-96a4-ae17848b64f2.png)

There is querys and mutations examples to your tests at <code>/server/assets/*.examples.txt</code>:

![image](https://user-images.githubusercontent.com/8376833/125347937-f51aa980-e331-11eb-9a5f-af67c340b853.png)
