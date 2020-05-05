const base_url = "";

console.log(localStorage);
/* redirect if not logged in */
if (!localStorage.getItem("token")) {
    window.location.href = "../login/login.html";
}

let timeNow  = (new Date()).getMinutes();
let loggedTime = localStorage.getItem("token_expiry");

if((timeNow - loggedTime) >= 60){
    localStorage.removeItem('token');
    window.location.href = "../login/login.html";
}