/* redirect if not logged in */
if (!localStorage.getItem("token")) {
    window.location.href = "../login/login.html";
}

/* Primus live */
primus = Primus.connect("http://localhost:3000", {
    reconnect: {
        max: Infinity,
        min: 500,
        retries: 10
    }
})

primus.on('data', (json) => {
    if(json.action === "updated balance counter") {
        appendTransfers()
    }
})

/* append transfers */
let appendTransfers = () => {
    fetch("http://localhost:3000/api/v1/transfers", {
    method: "get",
    'headers': {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
    }).then(result => {
        return result.json();
    }).then(json => {
        json.data.transactions.forEach(item => {
            
            if(item.sender == name) {
                var transferItem = `<a class="transfer__link" href="./transferDetail.html?detail=${item._id}"><div class="transfer"> 
                <div class="transfer__item transfer__avatar"></div>
                <div class="transfer__item transfer__name"><p>${item.receiver}</p></div>
                <div class="transfer__item transfer__amount"><p class="transfer__amount--send">-${item.amount}</p></div>
                </div></a>`
                
            }else {
                var transferItem = `<a class="transfer__link" href="./transferDetail.html?detail=${item._id}"><div class="transfer"> 
                <div class="transfer__item transfer__avatar"></div>
                <div class="transfer__item transfer__name"><p>${item.sender}</p></div>
                <div class="transfer__item transfer__amount"><p class="transfer__amount--received">+${item.amount}</p></div>
                </div></a>`
            }
            document.querySelector('.header').insertAdjacentHTML('afterend', transferItem)
        });
    }).catch(err => {
        console.log(err)
    });
} 

 /* get user */
 let name;
fetch("http://localhost:3000/api/v1/transfers/user", {
method: "get",
'headers': {
    'content-type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
}
}).then(result => {
    return result.json();
}).then(json => {
    name = json.user.fullname
    appendTransfers()
}).catch(err => {
    console.log(err)
});

