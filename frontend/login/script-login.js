localStorage.removeItem('token');

let btnLogin = document.querySelector("#login").addEventListener("click", (e) => {
    let email = document.querySelector("#input-email").value;
    let password = document.querySelector("#input-password").value;

    fetch('http://localhost:3000/users/login', {
        method: "post",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    }).then(response => {
        return response.json();
    }).then(json => {
        if (json.status === "succes") {
            let time = (new Date()).getMinutes();
            let token = json.data.token;
            localStorage.setItem("token", token);
            localStorage.setItem("token_expiry", time);
            window.location.href = "../index/app.html";
        }
        else {
            let feedback = document.querySelector('.message');
            feedback.textContent = "Inloggen is niet gelukt, controlleer of jouw email en wachtwoord correct zijn";
        }
    })
});