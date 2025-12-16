fetch("http://localhost:3000/users")
  // promice dey
  .then((res) => res.json())

  .then((data) => {
    showUserData(data);
  });

function showUserData(users) {
  for (const user of users) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
<td>
  <div class="flex items-center gap-3">
    <div class="avatar">
      <div class="mask mask-squircle h-12 w-12">
        <img src="${users.image_url}" alt="Avatar Tailwind CSS Component" />
      </div>
    </div>
    <div>
      <div class="font-bold">${user.name}</div>
      <div class="text-sm opacity-50">${user.country}</div>
    </div>
  </div>
</td>
<td>
  ${user.job}
</td>
<td>${user.favouriteColor}</td>
`;
    document.getElementById("users-table").appendChild(tr);
  }
}

document.getElementById("btn-createuser").addEventListener("click", () => {
  const name = document.getElementById("inp-name").value;
  const job = document.getElementById("inp-job").value;
  const country = document.getElementById("inp-country").value;
  const color = document.getElementById("inp-color").value;
  const newUser = {
    name: name,
    job: job,
    country: country,
    color: color,
  };
  fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
});
