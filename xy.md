PS D:\CSE 3532\Pern_Course\Front_backend_intrigation> cd .\server\
PS D:\CSE 3532\Pern_Course\Front_backend_intrigation\server> npm ini
PS D:\CSE 3532\Pern_Course\Front_backend_intrigation\server> npm init -y
npm install express
 npm i nodemon





**Index.js **

## 1️⃣ Import libraries

```js
const express = require('express');
const cors = require('cors');
```

* `express`: Node.js framework to create a web server easily.
* `cors`: Middleware to allow requests from different origins (e.g., your frontend running on `localhost:5500`).

> Viva Tip: “We use CORS to avoid cross-origin errors when frontend and backend run on different ports.”

---

## 2️⃣ Create Express app

```js
const app = express();
```

* Initializes the Express server object to define routes and middleware.

---

## 3️⃣ Middleware

```js
app.use(cors());
app.use(express.json());
```

* `cors()`: Enables Cross-Origin Resource Sharing.
* `express.json()`: Converts incoming JSON string in requests to a JavaScript object automatically.

> Viva Tip: “Without `express.json()`, `req.body` would be undefined for JSON POST requests.”

---

## 4️⃣ In-memory user array

```js
let users = [
    { id: 1, name: "Alice", country: "USA" , job : "Engineer" , favouriteColor : "Blue" , image_url : "https://avatar.iran.liara.run/public/43" }, 
    { id: 2, name: "AAAA", country: "BD" , job : "Engineer" , favouriteColor : "RED" , image_url : "https://avatar.iran.liara.run/public/42" }, 
]
```

* `users` is a temporary storage (in RAM).
* Each object represents a user with **id, name, country, job, favouriteColor, image_url**.

> Viva Tip: “Since it’s in memory, data will reset if server restarts.”

---

## 5️⃣ GET `/users` route

```js
app.get('/users', (req, res) => {
  res.send(users);
});
```

* When the frontend calls `GET /users`, server responds with the full `users` array.
* `res.send(users)` converts JS array into JSON automatically.

> Viva Tip: “This is how the frontend can fetch and display existing users.”

---

## 6️⃣ POST `/users` route

```js
app.post('/users', (req, res) => {
    const user = req.body;
    const newUser = {
        id : users.length + 1,
        name : user.name,
        country : user.country,
        job : user.job,
        favouriteColor : user.color,
    }
    users.push(newUser);
    res.status(201).send(newUser);
});
```

Step by step:

1. `const user = req.body;`

   * Fetches the data sent from frontend in JSON.

2. `const newUser = {...}`

   * Creates a new user object.
   * `id` is assigned automatically.
   * Notice `favouriteColor: user.color` (the frontend sends `color`, backend stores as `favouriteColor`).

3. `users.push(newUser);`

   * Adds the new user to the in-memory array.

4. `res.status(201).send(newUser);`

   * Responds to the frontend with the newly created user.
   * `201` means **Created successfully**.

> Viva Tip: “We send the new user back so the frontend can update the UI immediately.”

---

## 7️⃣ Start server

```js
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
```

* Starts the server on port 3000.
* Console log confirms it’s running.

> Viva Tip: “Frontend fetches data from `http://localhost:3000/users`.”

---

## 8️⃣ Summary of Flow

1. Frontend sends **GET** → Backend responds with users → Display in table.
2. Frontend sends **POST** → Backend adds user → Sends back new user → Frontend updates table automatically.
3. All data is stored in **memory**, not in a database.
4. `express.json()` and `cors()` are essential for proper communication.

---

**script.js**





# 📝 Line-by-line explanation of `script.js`

---

## 1️⃣ Load users when page loads

```js
fetchUsers();
```

* Calls the `fetchUsers()` function **immediately** when the page loads.
* Ensures the table shows existing users automatically without clicking anything.

> Viva Tip: “This is the initial data fetch for the table.”

---

## 2️⃣ Define `fetchUsers` function

```js
function fetchUsers() {
  fetch("http://localhost:3000/users")
    .then(res => res.json())
    .then(data => {
      document.getElementById("users-table").innerHTML = "";
      showUserData(data);
    });
}
```

**Step by step:**

1. `fetch("http://localhost:3000/users")`

   * Sends an HTTP GET request to backend to get all users.

2. `.then(res => res.json())`

   * Converts response from JSON string to JavaScript object/array.

3. `.then(data => { ... })`

   * `data` is now an array of users from the backend.

4. `document.getElementById("users-table").innerHTML = "";`

   * Clears previous rows to avoid duplication.

5. `showUserData(data)`

   * Calls another function to render each user in the table.

> Viva Tip: “`fetch` is asynchronous, so `.then()` waits for the server response before updating the table.”

---

## 3️⃣ Define `showUserData` function

```js
function showUserData(users) {
  for (const user of users) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>
        <div class="flex items-center gap-3">
          <div class="avatar">
            <div class="mask mask-squircle h-12 w-12">
              <img src="${user.image_url}" alt="Avatar" />
            </div>
          </div>
          <div>
            <div class="font-bold">${user.name}</div>
            <div class="text-sm opacity-50">${user.country}</div>
          </div>
        </div>
      </td>
      <td>${user.job}</td>
      <td>${user.favouriteColor}</td>
    `;
    document.getElementById("users-table").appendChild(tr);
  }
}
```

**Step by step:**

1. Loops through each user in the array.
2. Creates a `<tr>` element for each user.
3. Fills the row with:

   * Avatar image (`user.image_url`)
   * Name (`user.name`)
   * Country (`user.country`)
   * Job (`user.job`)
   * Favourite Color (`user.favouriteColor`)
4. Appends the row to `<tbody id="users-table">`.

> Viva Tip: “We are dynamically creating table rows so that the UI updates automatically when data changes.”

---

## 4️⃣ Add event listener for Create User button

```js
document.getElementById("btn-createuser").addEventListener("click", (e) => {
  e.preventDefault();
```

* Listens for click on the “Create User” button.
* `e.preventDefault()` prevents default behavior (like page reload if inside a form).

> Viva Tip: “We prevent reload because we want to update the table dynamically.”

---

## 5️⃣ Get input values

```js
const newUser = {
  name: document.getElementById("inp-name").value,
  job: document.getElementById("inp-job").value,
  country: document.getElementById("inp-country").value,
  color: document.getElementById("inp-color").value,
};
```

* Reads data typed by the user in input fields.
* Stores it in a JS object `newUser`.

> Viva Tip: “The keys in `newUser` correspond to what the backend expects.”

---

## 6️⃣ Send POST request to backend

```js
fetch("http://localhost:3000/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(newUser),
})
  .then(res => res.json())
  .then(() => {
    fetchUsers();   // auto refresh table
    clearInputs();
  });
```

**Step by step:**

1. Sends a POST request to `http://localhost:3000/users`.
2. `method: "POST"` specifies it is a POST request.
3. `headers: { "Content-Type": "application/json" }`

   * Tells the server we are sending JSON.
4. `body: JSON.stringify(newUser)`

   * Converts JS object to JSON string for the backend.
5. `.then(res => res.json())`

   * Converts server response to JS object.
6. `.then(() => { fetchUsers(); clearInputs(); })`

   * Fetch latest users to update table automatically.
   * Clears input fields for next entry.

> Viva Tip: “After POST, we immediately refresh the table to show the new user without reloading.”

---

## 7️⃣ Clear form inputs

```js
function clearInputs() {
  document.getElementById("inp-name").value = "";
  document.getElementById("inp-job").value = "";
  document.getElementById("inp-country").value = "";
  document.getElementById("inp-color").value = "";
}
```

* Simply resets all input fields to blank.

> Viva Tip: “Improves user experience by clearing the form after submission.”

---

## 8️⃣ Overall Frontend Flow

1. Page loads → `fetchUsers()` runs → table populated.
2. User types data → clicks “Create User”.
3. JS reads input → sends POST → backend stores data.
4. JS fetches updated users → updates table dynamically.
5. Input fields cleared.

---

