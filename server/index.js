const express = require('express');
const app = express();

let users = [
    { id: 1, name: "Alice", country: "USA" , Job : "Engineer" , favouriteColor : "Blue" , image_url : "https://avatar.iran.liara.run/public/43" }, 
    { id: 1, name: "AAAA", country: "BD" , Job : "Engineer" , favouriteColor : "RED" , image_url : "https://avatar.iran.liara.run/public/42" }, 
]


app.get('/hellw', (req, res) => {
  res.send('Hello World!');
});


app.get('/users', (req, res) => {
  res.send(users);
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});