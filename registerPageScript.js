document.querySelector("#register").addEventListener("submit", (e) => {
    e.preventDefault();
    const registerData = {
        username: document.querySelector("#userName").value,
        password: document.querySelector("#passWord").value
    };
    register(registerData);
})

const message = document.querySelector("#message");

function register(registerData) {
    const form = document.querySelector("#register");
    const message = document.createElement("div");

    fetch("https://www.fulek.com/data/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData)
    })
        .then((response) => response.json())
        .then((result) => {
            if (result.isSuccess) {
                location.assign("loginPage.html");
            }
            else {
                message.style.color = "red";
                message.innerHTML = "Registracija nije uspjela";
                form.after(message);
                alert(result.errorMessages[0]);
            }
        })
        .catch((error) => {
            alert("Problem povezivanja sa poslužiteljem", error)
        })
}