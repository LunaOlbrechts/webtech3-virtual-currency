/* redirect if not logged in */
if (!localStorage.getItem("token")) {
    window.location.href = "../login/login.html";
}

fetch("http://localhost:3000/api/v1/leaderboard", {
    'headers': {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
}).then(result => {
    return result.json();
}).then(json => {
    console.log("🎖");
}).catch(err => {
   console.log(err)
});