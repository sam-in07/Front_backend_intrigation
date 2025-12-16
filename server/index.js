const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

let users = [
    { id: 1, name: "Alice", country: "USA" , job : "Engineer" , favouriteColor : "Blue" , image_url : "https://avatar.iran.liara.run/public/43" }, 
    { id: 1, name: "AAAA", country: "BD" , job : "Engineer" , favouriteColor : "RED" , image_url : "https://avatar.iran.liara.run/public/42" }, 
]





app.get('/users', (req, res) => {
  res.send(users);
});

app.post('/users', (req, res) => {
    const newUser = req.body;
    console.log(newUser);
});


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});