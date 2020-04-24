/* redirect if not logged in */
if (!localStorage.getItem("token")) {
    window.location.href = "../login/login.html";
}

let transferBtn = document.querySelector('#transfer')
let amountField = document.querySelector('#input__amount')
let receiverField = document.querySelector('#input__receiver')
let messageField = document.querySelector('.messageField')

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

function isEmpty(value){
    return (value == null || value.length === 0);
  }