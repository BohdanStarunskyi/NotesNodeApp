# NotesNodeApp
# How to run my project?
1) open constants/app_constants.js
2) set your values
3) in terminate use node app.js
   
Congrats! You're all set
# Api documentation
Using localhost

> POST `http://localhost:3001/login`

body:
```
{
    "email": string,
    "password": string
}
```

> POST `http://localhost:3001/note`

body:
```
{
    "ownerId": string,
    "title": string,
    "body": string
}
```

> GET `http://localhost:3001/notes`

query:
```
ownerId: string
```

> DELETE `http://localhost:3001/note`

query:
```
noteId: string
```
header:
```
ownerId: string
```

> PUT `http://localhost:3001/note`

body:
```
{
    "ownerId": string,
    "title": string,
    "body": string,
    "noteId": string
}
```
