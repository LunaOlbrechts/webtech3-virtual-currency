const base_url = "https://imdcurrency.herokuapp.com";

/* redirect if user has no valid token */
if (!localStorage.getItem("token")) {
    window.location.href = "../login/login.html";
}

/* primus live */ 
primus = Primus.connect(base_url, {
    reconnect: {
        max: Infinity // Number: The max delay before we try to reconnect.
      , min: 500 // Number: The minimum delay before we try reconnect.
      , retries: 10 // Number: How many times we should try to reconnect.
    }
});

let updateLeaderboard = () => {

    fetch(base_url + "/api/v1/leaderboard", {
        method: "get",
        'headers': {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(result => {
            return result.json();
        }).then(json => {
            //clear
            document.querySelector(".list").innerHTML = "";
            appendScore(json);
        }).catch(err => {
            console.log(err)
    });
}

updateLeaderboard();

primus.on('data', (json) => {
    if(json.action === "updated balance counter"){
        updateLeaderboard();
    }
});

/* append a score to the leaderboard*/ 
let appendScore = (json) => {
    json.data.forEach(element => {
        if (element.place === 1) {
            var score = `<div class="list__row">
                <p class="score score--gold">${element.place}</p>
                <p class="score list__name">${element.fullname}</p>
                <p class="score list__balance">${element.balance}</p>
            </div>`
        }
        else if (element.place === 2) {
            var score = `<div class="list__row">
                <p class="score score--silver">${element.place}</p>
                <p class="score list__name">${element.fullname}</p>
                <p class="score list__balance">${element.balance}</p>
            </div>`
        }
        else if (element.place === 3) {
            var score = `<div class="list__row">
                <p class="score score--bronze">${element.place}</p>
                <p class="score list__name">${element.fullname}</p>
                <p class="score list__balance">${element.balance}</p>
            </div>`
        }
        else{
            var score = `<div class="list__row">
                <p class="score">${element.place}</p>
                <p class="score list__name">${element.fullname}</p>
                <p class="score list__balance">${element.balance}</p>
            </div>`
        }
        
        document.querySelector('.list').insertAdjacentHTML('beforeend', score);
    });
}