/* redirect if not logged in */
if (!localStorage.getItem("token")) {
    window.location.href = "../login/login.html";
}

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
        if(item.sender == "test@test.com" /* change test@test.com from hardcoded to logged in user id */) {
            var transferItem = `<div class="transfer"> 
            <div class="transfer__item transfer__avatar"></div>
            <div class="transfer__item transfer__name"><p>${item.receiver}</p></div>
            <div class="transfer__item transfer__amount"><p class="transfer__amount--send">-${item.amount}</p></div>
            </div>`
            
        }else {
            var transferItem = `<div class="transfer"> 
            <div class="transfer__item transfer__avatar"></div>
            <div class="transfer__item transfer__name"><p>${item.sender}</p></div>
            <div class="transfer__item transfer__amount"><p class="transfer__amount--received">+${item.amount}</p></div>
            </div>`
        }
        document.querySelector('.history__container').insertAdjacentHTML('afterend', transferItem)
    });
}).catch(err => {
    console.log(err)
});