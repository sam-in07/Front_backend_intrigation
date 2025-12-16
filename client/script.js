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

document.getElementById("btn-createUser").addEventListener("click", () => {
  const name = document.getElementById("inp-name").ariaValueMax;
  const job = document.getElementById("inp-job").ariaValueMax;
  const country = document.getElementById("inp-country").ariaValueMax;
  const color = document.getElementById("inp-color").ariaValueMax;
  console.log(name, job);
});
