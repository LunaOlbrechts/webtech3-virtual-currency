const base_url="https://imdcurrency.herokuapp.com";localStorage.getItem("token")||(window.location.href="../login/login.html"),primus=Primus.connect(base_url,{reconnect:{max:1/0,min:500,retries:10}}),primus.on("data",e=>{"updated balance counter"===e.action&&(appendTransfers(),updateBalance())});let fullname,balanceCounter=document.querySelector("#balance"),transferBtn=document.querySelector(".btn"),appendTransfers=()=>{fetch(base_url+"/api/v1/transfers",{method:"get",headers:{"content-type":"application/json",Authorization:"Bearer "+localStorage.getItem("token")}}).then(e=>e.json()).then(e=>{let t=document.querySelector(".list");t.innerHTML="",e.data.transactions.forEach(e=>{if(e.sender==fullname)var a=e.receiver,n="transfer__amount--send",r="-";else a=e.sender,n="transfer__amount--received",r="+";let o=`<a class="link" href="../transfer/transferDetail.html?detail=${e._id}"><div class="list__row"> \n            <div class="avatar"></div>\n            <div class="list__name"><p>`+a+'</p></div>\n            <div class="list__balance list__balance--right"><p class="'+n+'"> '+r+`${e.amount}</p></div>\n            </div></a>`;t.insertAdjacentHTML("afterbegin",o)})}).catch(e=>{console.log(e)})};fetch(base_url+"/api/v1/transfers/user",{method:"get",headers:{"content-type":"application/json",Authorization:"Bearer "+localStorage.getItem("token")}}).then(e=>e.json()).then(e=>{fullname=e.user.fullname,appendTransfers()}).catch(e=>{console.log(e)});let updateBalance=()=>{fetch(base_url+"/api/v1/transfers/user",{method:"get",headers:{"content-type":"application/json",Authorization:"Bearer "+localStorage.getItem("token")}}).then(e=>e.json()).then(e=>{balanceCounter.innerHTML=e.user.balance}).catch(e=>{console.log(e)})};updateBalance(),transferBtn.addEventListener("click",()=>{window.location.href="../transfer/transfer.html"});