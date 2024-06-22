document.querySelector("#login").addEventListener("submit", (e) => {
    e.preventDefault();
    const loginData = {
        username: document.querySelector("#userName").value,
        password: document.querySelector("#passWord").value
    };
    login(loginData);
})

function login(loginData) {
    const form = document.querySelector("#login");
    const message = document.createElement("div");

    fetch("https://www.fulek.com/data/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData)
    })
        .then((response) => response.json())
        .then((result) => {
            if (result.isSuccess) {
                sessionStorage.setItem("JWT", result.data.token);
                sessionStorage.setItem("username", result.data.username);
                location.assign("homePage.html");
            }
            else {
                message.style.color = "red";
                message.innerHTML = "Pogrešno korisničko ime ili lozinka, pokušajte ponovo";
                form.after(message);
            }
        })
        .catch((error) => {
            alert("Problem povezivanja sa poslužiteljem", error)
        })
}