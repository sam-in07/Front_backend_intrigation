

# 🔁 BIG PICTURE (One-line Answer for Viva)

> “My frontend (HTML + JS) sends HTTP requests using `fetch()` to an Express backend.
> The backend processes the request, updates an in-memory users array, and sends JSON data back.
> The frontend then dynamically updates the DOM without reloading the page.”

---

# 🧠 COMPLETE WORKFLOW (Step by Step)

## 1️⃣ Browser loads `index.html`

* HTML loads UI (table + form)
* `script.js` is loaded at the bottom

⬇️

## 2️⃣ `script.js` runs immediately

```js
fetchUsers();
```

⬇️

## 3️⃣ Frontend sends GET request

```http
GET http://localhost:3000/users
```

⬇️

## 4️⃣ Backend (`index.js`) receives request

```js
app.get('/users', (req, res) => {
  res.send(users);
});
```

* Express sends users array as JSON

⬇️

## 5️⃣ Frontend receives JSON

```js
.then(data => showUserData(data));
```

⬇️

## 6️⃣ DOM is updated dynamically

* Table rows are created using `document.createElement`
* Data is shown **without page reload**

---

# 🗂 FILE-BY-FILE EXPLANATION (VIVA STYLE)

---

## 📄 1. index.html (Frontend UI)

### Purpose:

> “It provides the structure of the webpage.”

### Important parts:

### Table body

```html
<tbody id="users-table"></tbody>
```

➡ Empty initially
➡ JS injects rows dynamically

---

### Form Inputs

```html
<input id="inp-name" />
<input id="inp-job" />
<input id="inp-country" />
<input id="inp-color" />
```

➡ JS reads values using `getElementById`

---

### Button

```html
<button id="btn-createuser">Create User</button>
```

➡ Clicking triggers POST request

---

### Script link

```html
<script src="script.js"></script>
```

➡ Loads JavaScript after HTML is ready

---

## 📄 2. script.js (Frontend Logic)

### 🔹 Fetch users on page load

```js
fetchUsers();
```

➡ Automatically runs when page loads

---

### 🔹 GET request

```js
fetch("http://localhost:3000/users")
```

➡ Asks backend for users data

---

### 🔹 Convert response to JSON

```js
.then(res => res.json())
```

➡ Converts raw response to JS object

---

### 🔹 Update UI

```js
.then(data => {
  document.getElementById("users-table").innerHTML = "";
  showUserData(data);
});
```

➡ Clears old rows
➡ Shows latest data

---

### 🔹 Create table rows

```js
function showUserData(users) {
```

➡ Loops through users array

```js
for (const user of users) {
```

➡ Each user → one table row

---

### 🔹 DOM manipulation

```js
const tr = document.createElement("tr");
tr.innerHTML = `...`;
```

➡ Creates HTML dynamically

---

### 🔹 POST request (Create user)

```js
fetch("http://localhost:3000/users", {
  method: "POST",
```

➡ Sends data to backend

---

### 🔹 Send JSON body

```js
body: JSON.stringify(newUser)
```

➡ Converts JS object → JSON

---

### 🔹 Auto refresh UI

```js
.then(() => {
  fetchUsers();
});
```

➡ Re-fetches updated data
➡ No page reload

---

## 📄 3. index.js (Backend – Express)

---

### 🔹 Import libraries

```js
const express = require('express');
const cors = require('cors');
```

➡ Express: server
➡ CORS: allow frontend requests

---

### 🔹 Middleware

```js
app.use(cors());
app.use(express.json());
```

➡ Parses incoming JSON
➡ Allows cross-origin requests

---

### 🔹 In-memory database

```js
let users = [];
```

➡ Temporary storage (RAM)

---

### 🔹 GET route

```js
app.get('/users', (req, res) => {
  res.send(users);
});
```

➡ Sends all users to frontend

---

### 🔹 POST route

```js
app.post('/users', (req, res) => {
```

➡ Receives new user data

---

### 🔹 Create new user

```js
const newUser = {
  id: users.length + 1,
  name: user.name,
};
```

➡ Adds missing fields
➡ Pushes into array

---

### 🔹 Send response

```js
res.status(201).send(newUser);
```

➡ Sends created user back

---

## 🔄 FULL REQUEST–RESPONSE FLOW (Sir Loves This)

```
Button Click
   ↓
fetch() POST request
   ↓
Express receives request
   ↓
Data stored in array
   ↓
Response sent to frontend
   ↓
Frontend fetches users again
   ↓
DOM updated dynamically
```

---

## ⚠️ IMPORTANT VIVA POINTS (MEMORIZE)

### ❓ Why page doesn’t reload?

✔ Because DOM is updated using JavaScript

---

### ❓ Why fetch is used?

✔ To communicate with backend via HTTP

---

### ❓ Why express.json()?

✔ To convert JSON → JS object

---

### ❓ Where is database?

✔ Currently in memory (array)

---

### ❓ What happens if server restarts?

❌ Data lost

---

## 🧠 FINAL ONE-LINE VIVA ANSWER

> “This project demonstrates frontend–backend integration using Fetch API and Express, where the frontend dynamically updates the UI based on backend responses without reloading the page.”


