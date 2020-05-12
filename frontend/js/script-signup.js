const base_url = "https://imdcurrency.herokuapp.com";
localStorage.removeItem('token');

let btnSignup = document.querySelector("#btn--signup").addEventListener("click", (e) => {
    let email = document.querySelector("#input-email").value;
    let firstname = document.querySelector("#input-firstname").value;
    let lastname = document.querySelector("#input-lastname").value;
    let password = document.querySelector("#input-password").value;

    let emailCheck = email.split("@");

    if(emailCheck[1] == "student.thomasmore.be"){
        fetch(base_url + '/users/signup', {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "firstname": firstname,
                "lastname": lastname,
                "password": password
            })
        }).then(response => {
            return response.json();
        }).then(json => {
            console.log(json);
            if(json.status === "succes"){
                let feedback = document.querySelector('.message');
                let timeNow  = (new Date()).getTime();
                let token = json.data.token;
                localStorage.setItem("token", token);
                localStorage.setItem("token_expiry", timeNow);
                window.location.href = "../leaderboard/leaderboard.html";
            }
        });
    }
    else{
        document.querySelector(".message__field").innerHTML = "Sorry de email moet eindigen met @student.thomasmore.be";
    }
});