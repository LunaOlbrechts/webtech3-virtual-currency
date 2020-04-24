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

let transferBtn = document.querySelector('#transfer')
let amountField = document.querySelector('#input__amount')
let receiverField = document.querySelector('#input__receiver')
let messageField = document.querySelector('.messageField')
let balanceCounter = document.querySelector('.balance')

/* post transfer */
transferBtn.addEventListener('click', e => {
    let amount = amountField.value
    let receiver = receiverField.value 
    if(isEmpty(amount) || isEmpty(receiver)) {
        messageField.innerHTML = "gelieve alle velden in te vullen"
    }else {
        fetch("http://localhost:3000/api/v1/transfers", {
        method: "post",
        'headers': {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }, 
        body: JSON.stringify({
            "amount": amount,
            "receiver": receiver
        })
        }).then(result => {
            return result.json();
        }).then(json => {
            messageField.innerHTML = json.message
        }).catch(err => {
            console.log(err)
        });
    }
})

/* get balance */
fetch("http://localhost:3000/api/v1/transfers/balance", {
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

function isEmpty(value){
    return (value == null || value.length === 0);
  }