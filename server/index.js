const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
let users = [
    { id: 1, name: "Alice", country: "USA" , job : "Engineer" , favouriteColor : "Blue" , image_url : "https://avatar.iran.liara.run/public/43" }, 
    { id: 2, name: "AAAA", country: "BD" , job : "Engineer" , favouriteColor : "RED" , image_url : "https://avatar.iran.liara.run/public/42" }, 
]





app.get('/users', (req, res) => {
  res.send(users);
});

app.post('/users', (req, res) => {
    const user = req.body;
    const newUser = {
        id : users.length + 1,
        name : user.name,
        country : user.country,
        job : user.job,
        favouriteColor : user.color,
    }
   // console.log(user);
    users.push(newUser);
    res.status(201).send(newUser);
});


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

//data from web then middle ware Expreess.js to oikhan theke 
//strirng ta ke ney string akare json akare convert kore user modhe dhuke kaj korbe 