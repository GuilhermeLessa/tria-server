# TRIA SERVER
A Node Server to test the new fullstack developers.

:white_check_mark: GraphQL <br>
:white_check_mark: Docker <br>
:white_check_mark: AWS Lambda <br>
:white_check_mark: Vanilla JS <br>

<br>

### Use Docker 

First run Docker Compose to build tria-server images that containes Node and PostgreSQL
```
  docker-compose build
```

Then up tria-server/node and tria-server/postgres Docker containers
```
  docker-compose up
```

<hr>

### Let's Go! to the Playground

Use the localhost <code>http://0.0.0.0:4000/</code> exposed by Docker to test request's with GraphQL Playground:

![Seleção_001](https://user-images.githubusercontent.com/8376833/126673127-3a83d271-6aef-44aa-b3a4-3aaf6316a2ca.png)


There is querys and mutations examples to your tests at <code>/server/assets/*.examples.txt</code>:

![image](https://user-images.githubusercontent.com/8376833/125347937-f51aa980-e331-11eb-9a5f-af67c340b853.png)

<hr>

### Access to the PostgreSQL database

Use the host:port exposed by Docker to access and manipulate the created database into tria-server/postgres Docker container.

HOST: 0.0.0.0<br>
USER: postgres<br>
PASSWORD: postgres<br>
DATABASE: postgres<br>
PORT: 5432<br>

I'm using localhost pgAdmin web feature:

![Seleção_002](https://user-images.githubusercontent.com/8376833/126674795-8e8763b7-691a-4187-92da-40225255ec35.png)


