const base_url = "https://imdcurrency.herokuapp.com";
/* redirect if not logged in */
if (!localStorage.getItem("token")) {
    window.location.href = "../login/login.html";
}

/* Primus live */
primus = Primus.connect(base_url, {
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

            let transferItem = `<a class="link" href="./transferDetail.html?detail=${item._id}"><div class="list__row"> 
            <div class="avatar"></div>
            <div class="list__name"><p>` + name  + `</p></div>
           <p class="list__balance list__balance--right"><span class="${color}">${sign} ${item.amount}</span></p></div>
            </a>`
                
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

