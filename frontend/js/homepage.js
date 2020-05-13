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

primus.on('data', (json) => {
    if(json.action === "updated balance counter") {
        appendTransfers()
        updateBalance()
    }
})

let balanceCounter = document.querySelector('#balance')
let transferBtn = document.querySelector('.btn')

/* append transfers */
let appendTransfers = () => {
    fetch(base_url + "/api/v1/transfers", {
    method: "get",
    'headers': {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
    }).then(result => {
        return result.json();
    }).then(json => {
    let list = document.querySelector('.list')
    list.innerHTML = ""
        json.data.transactions.forEach(item => {
            if(item.sender == fullname) { 
                var name = item.receiver
                var color = "transfer__amount--send"
                var sign = "-"
              }else {
                var name = item.sender
                var color = "transfer__amount--received"
                var sign = "+"
              }

            let transferItem = `<a class="link" href="../transfer/transferDetail.html?detail=${item._id}"><div class="list__row"> 
            <div class="avatar"></div>
            <div class="list__name"><p>` + name  + `</p></div>
            <div class="list__balance list__balance--right"><p class="` + color + `"> ` + sign + `${item.amount}</p></div>
            </div></a>`
                
            list.insertAdjacentHTML('afterbegin', transferItem)
        });
    }).catch(err => {
        console.log(err)
    });
} 

 /* get user */
 let fullname;
fetch(base_url + "/api/v1/transfers/user", {
method: "get",
'headers': {
    'content-type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
}
}).then(result => {
    return result.json();
}).then(json => {
    fullname = json.user.fullname
    appendTransfers()
}).catch(err => {
    console.log(err)
});

/* updateBalance function */
let updateBalance = () => {
    /* get balance */
    fetch(base_url + "/api/v1/transfers/user", {
        method: "get",
        'headers': {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }).then(result => {
        return result.json();
    }).then(json => {
        balanceCounter.innerHTML = json.user.balance
    }).catch(err => {
        console.log(err)
    });
}
updateBalance()

transferBtn.addEventListener('click', () => {
    window.location.href = "../transfer/transfer.html" 
})