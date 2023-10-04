//code frop flip effect
const container = document.getElementById("container");
function flip(){
    container.classList.add("flip");
}
function flipBack(){
    container.classList.remove("flip");
}
//getting HTML elements using DOM
const submit = document.getElementById("form");
const balance = document.getElementById("bal");
const transBalance = document.getElementById("urAmount");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const incRadio = document.getElementById("inc-radio");
const expRadio = document.getElementById("exp-radio");
const description = document.getElementById("description");
const amount = document.getElementById("amount");
const transList = document.getElementById("trans-data");
//variables 
let balAmount,incAmount,expAmount;
balAmount=incAmount=expAmount=0;
let trackData = [];
//Get data from local storage
trackData = JSON.parse(localStorage.getItem("data"))||[];
//function for displaying data
function displayData(data){
    let list = document.createElement("li");
    let id = data.id;
    let incOrExp = data.source=="income"?"inc":"exp";
    list.classList.add(incOrExp);
    list.innerHTML = `
    <label>${data.description}</label>
    <span>${incOrExp=="inc"?"+":"-"}₹${data.amount}</span>
    <button onclick=remove(${id})>X</button>
    `;
    transList.appendChild(list);
    calculate(incOrExp,data.amount)
}
//function for calculating the amount
function calculate(sourceType,amount){
    switch(sourceType){
        case "inc":
            balAmount+=amount;
            incAmount+=amount;
            break;
        case "exp":
            balAmount-=amount;
            expAmount+=amount;
            break;
    }
}
//function for updating the amount in UI
function updateData(){
    balance.innerHTML = `₹${balAmount}`;
    income.innerHTML = `₹${incAmount}`;
    expense.innerHTML = `₹${expAmount}`;
    transBalance.innerHTML = `₹${balAmount}`;
}
//function for getting input from the user
function getData(e){
    e.preventDefault();
    let incOrExp = incRadio.checked?"income":"expense";
    let descr = description.value;
    let amt = parseInt(amount.value);
    let newObj = {
        id:Math.floor(Math.random()*10000000),
        description: descr,
        amount:amt,
        source:incOrExp
    }
    if(incOrExp=="income"){
        incRadio.checked = false;
    }
    else if(incOrExp=="expense"){
        expRadio.checked = false;
    }
    description.value = "";
    amount.value = "";
    trackData.push(newObj);
    resetData();
}
//function for reset data
function resetData(){
    localStorage.setItem("data",JSON.stringify(trackData));
    transList.innerHTML="";
    balAmount=incAmount=expAmount=0;
    getEachData();
}
//function for delete
function remove(id){
    if(confirm("Do you want to delete it ?")){
        trackData = trackData.filter(data=>data.id!=id);
        resetData();
    }
}
//function for get each element from array for dispalying data
function getEachData(){
    if(trackData.length===0){
        let noTrans = document.createElement("p");
        noTrans.id="no-trans";
        noTrans.innerHTML = "No Transactions";
        transList.appendChild(noTrans);
    }
    trackData.forEach(data =>{
        displayData(data);
    })
    updateData();
}
submit.addEventListener("submit",getData);
window.addEventListener("load",getEachData);