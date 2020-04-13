
let btnLogin = document.querySelector("#login").addEventListener("click", function (){
    let email = document.querySelector("#input-email").value;
    let password = document.querySelector("#input-password").value;

    fetch('http://localhost:3000/users/signup', {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    }).then(response => {
        return response.json();
    }).then(json => {
        console.log(json);
        if(json.status === "succes"){
            let feedback = document.querySelector('.message');
            
            let token = json.data.token;
            localStorage.setItem("token", token);
            window.location.href = "../index/app.html";
        }
    });
});