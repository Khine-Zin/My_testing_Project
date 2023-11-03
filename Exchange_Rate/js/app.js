let input = document.getElementById("input");
let from = document.getElementById("from");
let to = document.getElementById("to");
let result = document.getElementById("result");
let historyList = document.getElementById("history-list");

function createOption(x, y ,z){
    //x is selector  , y is parameter passing
    let o = document.createElement("option");
    let t = document.createTextNode(y);
    o.setAttribute("value",toNumber(z));
    o.appendChild(t);
    x.appendChild(o);
}

function toNumber(x){ // removeComma
    return Number(x.replace(",",""));
}

for(x in data.rates){
    // console.log(x);// x : data.rates[x]
    // console.log(data.rates[x]);
    createOption(from,x ,data.rates[x]);
    createOption(to,x,data.rates[x]);
}

function createTr(x){//x is array
    let rowSpace = document.getElementById("rowSpace");
    if(rowSpace){
        rowSpace.remove();

    }
    let tr = document.createElement("tr");

    x.map(function(el){
        let td = document.createElement("td");
        let text = document.createTextNode(el);
        td.appendChild(text);
        tr.appendChild(td);
    })
    historyList.appendChild(tr);
}

//store in localStorage
function store(){
    localStorage.setItem("record",historyList.innerHTML);
}

document.getElementById("calc").addEventListener("submit",function(){ // form-sumit
    event.preventDefault();//default refresh
    //get state
    let x = input.value;
    let y = from.value;
    let z = to.value;

    //process
    let fromText = x +" " + from.options[from.selectedIndex].innerHTML;// x+currency
    let toText = x + " " + to.options[to.selectedIndex].innerHTML;
    let first = y *x;
    let second = first/z;
    let result = second.toFixed(2);
    let date = new Date().toLocaleString();
    let arr = [date,fromText,toText,result];
    createTr(arr);
    store();

    //set
    result.innerHTML = result;
    input.value = "";
    input.focus();
    from.value = "";
    to.value = "1";
});

(function(){
    if(localStorage.getItem("record")){
        historyList.innerHTML = localStorage.getItem("record") ;
    }else{
        historyList.innerHTML = `<tr id="rowSpace"><td colspan="4">There is no Record</td></tr>`;
    }
})();

function test(){

    console.log(from.options[from.selectedIndex].innerHTML);
}


