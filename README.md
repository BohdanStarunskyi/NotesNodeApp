# NotesNodeApp
# How to run my project?
1) open constants/app_constants.js
2) set your values
3) in terminate use node app.js
   
Congrats! You're all set
# Api documentation
Using localhost
<br>
<br>
> POST `http://localhost:3001/login`

body:
```
{
    "email": string,
    "password": string
}
```

Login or creare account
<br>
<br>
> POST `http://localhost:3001/note`

body:
```
{
    "ownerId": string,
    "title": string,
    "body": string
}
```

Create a note
<br>
<br>
> GET `http://localhost:3001/notes`

query:
```
ownerId: string
```

Get list of notes
<br>
<br>
> DELETE `http://localhost:3001/note`

query:
```
noteId: string
```
header:
```
ownerId: string
```

Delete a note
<br>
<br>
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

Update a note
