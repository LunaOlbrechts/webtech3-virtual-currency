const base_url = "";
/* primus live */ 
primus = Primus.connect("http://localhost:3000", {
    reconnect: {
        max: Infinity // Number: The max delay before we try to reconnect.
      , min: 500 // Number: The minimum delay before we try reconnect.
      , retries: 10 // Number: How many times we should try to reconnect.
    }
});

let updateLeaderboard = () => {

    fetch("http://localhost:3000/api/v1/leaderboard", {
        
        method: "get",
        'headers': {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(result => {
            return result.json();
        }).then(json => {
            //clear
            document.querySelector("#leaderboard").innerHTML = "";
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
}