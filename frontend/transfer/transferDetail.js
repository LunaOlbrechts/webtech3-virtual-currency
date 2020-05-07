const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const transferId = urlParams.get('detail');

let balance = document.querySelector('.balance')
let sender = document.querySelector('.sender__name')
let receiver = document.querySelector('.receiver__name')
let reason = document.querySelector('.sender__reason')
let comment = document.querySelector('.sender__comment')

fetch("http://localhost:3000/api/v1/transfers/" + transferId, {
method: "get",
'headers': {
    'content-type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
}
}).then(result => {
    return result.json();
}).then(json => {
    sender.innerHTML = json.transfer.sender
    receiver.innerHTML = json.transfer.receiver
    balance.innerHTML = json.transfer.amount
    reason.innerHTML = json.transfer.reason
    comment.innerHTML = json.transfer.comment
    
}).catch(err => {
    console.log(err)
});