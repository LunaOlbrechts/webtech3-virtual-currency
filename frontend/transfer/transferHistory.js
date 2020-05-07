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
    let list = document.querySelector('.scores')
    console.log(list)
    list.innerHTML = ""
        json.data.transactions.forEach(item => {
            if(item.sender == email) { 
              var name = item.receiver
            }else {
              var name = item.sender
            }

            let transferItem = `<a class="transfer__link" href="./transferDetail.html?detail=${item._id}"><div class="transfer"> 
            <div class="transfer__item transfer__avatar"></div>
            <div class="transfer__item transfer__name"><p>` + name  + `</p></div>
            <div class="transfer__item transfer__amount"><p class="transfer__amount--send">-${item.amount}</p></div>
            </div></a>`
                
            list.insertAdjacentHTML('afterbegin', transferItem)
        });
    }).catch(err => {
        console.log(err)
    });
} 

 /* get user */
 let email;
fetch("http://localhost:3000/api/v1/transfers/user", {
method: "get",
'headers': {
    'content-type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
}
}).then(result => {
    return result.json();
}).then(json => {
    email = json.user.email
    appendTransfers()
}).catch(err => {
    console.log(err)
});

