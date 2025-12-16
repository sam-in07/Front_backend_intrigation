// Load users when page loads
fetchUsers();

function fetchUsers() {
  fetch("http://localhost:3000/users")
    .then(res => res.json())
    .then(data => {
      document.getElementById("users-table").innerHTML = "";
      showUserData(data);
    });
}

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

// Create user
document.getElementById("btn-createuser").addEventListener("click", (e) => {
  e.preventDefault();

  const newUser = {
    name: document.getElementById("inp-name").value,
    job: document.getElementById("inp-job").value,
    country: document.getElementById("inp-country").value,
    color: document.getElementById("inp-color").value,
  };

  fetch("http://localhost:3000/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  })
    .then(res => res.json())
    .then(() => {
      fetchUsers();   // 👈 auto refresh table
      clearInputs();
    });
});

// Clear form
function clearInputs() {
  document.getElementById("inp-name").value = "";
  document.getElementById("inp-job").value = "";
  document.getElementById("inp-country").value = "";
  document.getElementById("inp-color").value = "";
}
