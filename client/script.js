fetch("http://localhost:3000/users")
// promice dey
.then(res => res.json())

.then(data => {
  console.log(data);
});


function showUserData(users){
    for(const user of users){
        console.log(user.id);
    }
}