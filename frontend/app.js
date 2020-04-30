/* redirect if not logged in */
if (!localStorage.getItem("token")) {
    window.location.href = "../login/login.html";
}

fetch("http://localhost:3000/api/v1/leaderboard", {
    method: "get",
    'headers': {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
}).then(result => {
    return result.json();
}).then(json => {
    json.values.forEach(element => {
        if (element.place === 1) {
            var score = `<div class="score">
                <p class="score--gold">${element.place}</p>
                <p class="score__name">${element.email}</p>
                <p class="score__balance">${element.balance}</p>
            </div>`
        }
        if (element.place === 2) {
            var score = `<div class="score">
                <p class="score--silver">${element.place}</p>
                <p class="score__name">${element.email}</p>
                <p class="score__balance">${element.balance}</p>
            </div>`
        }
        if (element.place === 3) {
            var score = `<div class="score">
                <p class="score--bronze">${element.place}</p>
                <p class="score__name">${element.email}</p>
                <p class="score__balance">${element.balance}</p>
            </div>`
        }

        document.querySelector('.template').insertAdjacentHTML('beforeend', score);
    });
}).catch(err => {
   console.log(err)
});