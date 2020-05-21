
const base_url = "http://127.0.0.1:3000";
const profile = document.querySelector(".profile__data");


let getprofile = () =>{
    fetch(base_url + "/api/v1/profile", {
        method: "get",
        'headers': {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }).then(result => {
        return result.json();
    }).then(json => {
        appendData(json)
    }).catch(err => {
        console.log(err)
    });
}

getprofile();

let appendData = (json) =>{
    if(json){
        if(json.sentCoins && json.receivedCoins){
            var sentCoins = [];
            var receivedCoins =[];

            json.sentCoins.forEach(element => {
                sentCoins.push(element.amount);
            });

            json.receivedCoins.forEach(element => {
                receivedCoins.push(element.amount);
            })
    
            var sumOfSent= sentCoins.reduce((a, b) => a + b)    
            var sumOfReceived = receivedCoins.reduce((a, b) => a + b)    

            var userData = `
            <div class="profile__data__balance">
            <div class="subtitle">Balance</div>
                <p>${json.user.balance}</p>
            </div
            <div class="profile__data__name">
            <div class="subtitle">Profile</div>
            <p>${json.user.fullname}</p>
            </div>
            <div class="subtitle">Sent coins</div>
            <p>${sumOfSent}</p>
            </div>
            <div class="subtitle">Received coins</div>
            <p>${sumOfReceived}</p>
            </div>`
        }
        else if(json.sentCoins){
            var sentCoins = [];

            json.sentCoins.forEach(element => {
                sentCoins.push(element.amount);
            });
    
            var sumOfSent= sentCoins.reduce((a, b) => a + b)    

            var userData = `
            <div class="profile__data__balance">
            <div class="subtitle">Balance</div>
                <p>${json.user.balance}</p>
            </div
            <div class="profile__data__name">
            <div class="subtitle">Profile</div>
            <p>${json.user.fullname}</p>
            </div>
            <div class="subtitle">Sent coins</div>
            <p>${sumOfSent}</p>
            </div>`
        }
        else if (json.receivedCoins){
            var receivedCoins =[];

            json.receivedCoins.forEach(element => {
                receivedCoins.push(element.amount);
            });
    
            var sumOfReceived = receivedCoins.reduce((a, b) => a + b)    

            var userData = `
            <div class="profile__data__balance">
            <div class="subtitle">Balance</div>
                <p>${json.user.balance}</p>
            </div
            <div class="profile__data__name">
            <div class="subtitle">Profile</div>
            <p>${json.user.fullname}</p>
            </div>
            <div class="subtitle">Sent coins</div>
            <p>${sumOfReceived}</p>
            </div>`
        }
        else{
            var userData = `
            <div class="profile__data__balance">
            <div class="subtitle">Balance</div>
                <p>${json.user.balance}</p>
            </div
            <div class="profile__data__name">
            <div class="subtitle">Profile</div>
            <p>${json.user.fullname}</p>
            </div>`
        }
    }

    document.querySelector(".profile__data").insertAdjacentHTML('beforeend', userData);
}