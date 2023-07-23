# NotesNodeApp
# How to run my project?
1) in terminal use npm install
2) create .ext file with MONGO_KEY variable
3) in terminal use node app.js
   
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

response:
```
{
    "result": string,
    "id": string
}
```

Login or creare account
<br>
<br>
> POST `http://localhost:3001/note`

headers:
```
"ownerId": string
```
body:
```
{
    "title": string,
    "body": string
}
```

response:
```
{
    "result": string,
    "value": string
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

response:
```
{
    "result": string,
    "value": [
        {
            "ownerId": string,
            "title": string,
            "body": string,
            "id": string
        }
    ]
}
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

response:
```
{
    "result": string,
    "value": int
}
```

Delete a note
<br>
<br>
> PUT `http://localhost:3001/note`

header:
```
ownerId: string
```

body:
```
{
    "title": string,
    "body": string,
    "noteId": string
}
```

Update a note
