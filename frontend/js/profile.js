
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
        console.log(json.sendedCoins);

    }).catch(err => {
        console.log(err)
    });
}

getprofile();

let appendData = (json) =>{
    if(json){
        if(json.sendedCoins){
            var amount = [];

            json.sendedCoins.forEach(element => {
                amount.push(element.amount);
            });
    
            var sumOfAmount= amount.reduce((a, b) => a + b)    

            var userData = `
            <div class="profile__data__balance">
            <div class="subtitle">Balance</div>
                <p>${json.user.balance}</p>
            </div
            <div class="profile__data__name">
            <div class="subtitle">Profile</div>
            <p>${json.user.fullname}</p>
            </div>
            <div class="subtitle">Sended coins</div>
            <p>${sumOfAmount}</p>
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