fetch("http://localhost:3000/api/v1/transfers", {
    method: "get",
    'headers': {
        'content-type': 'application/json',
        'Authorization': 'Bearer' + localStorage.getItem('token')
    }
}).then(result => {
    return result.json();
}).then(json => {
    console.log(json.data.transactions);
    json.data.transactions.forEach(item => {
        if(item.sender == "test@test.com") {
            console.log("sender")
        }else {
            console.log("receiver")
        }
    });
}).catch(err => {
    console.log(err)
});