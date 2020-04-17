fetch("http://localhost:3000/api/v1/transfers", {
    method: "post",
    'headers': {
        'content-type': 'application/json',
        'Authorization': 'Bearer' + localStorage.getItem('token')
    }
}).then(result => {
    return result.json();
}).then(json => {
    console.log("test");
}).catch(err => {
    console.log(err)
});