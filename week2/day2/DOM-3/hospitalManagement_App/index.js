// fill in javascript code here

// step 1 
document.querySelector("form").addEventListener("submit", getDetails);

// step 2
function getDetails(e) {
    e.preventDefault();
    let name = document.querySelector("#name").value;
    let docID = document.querySelector("#docID").value;
    let dept = document.querySelector("#dept").value;
    let exper = document.querySelector("#exp").value;
    let email = document.querySelector("#email").value;
    let mobile = document.querySelector("#mbl").value;

    // console.log(name, docID, dept, exper, email, mobile);

    // here we will make object now same as previous 
    let obj = {name, docID, dept, exper, email, mobile}

    console.log(obj);

    displayTable(obj);
}

function displayTable(obj) {
    const row = document.createElement("tr");

    const td1 = document.createElement("td");
    td1.innerText = obj.name;

    const td2 = document.createElement("td");
    td2.innerText = obj.docID;

    const td3 = document.createElement("td");
    td3.innerText = obj.dept;

    const td4 = document.createElement("td");
    td4.innerText = obj.exper;

    const td5 = document.createElement("td");
    td5.innerText = obj.email;

    const td6 = document.createElement("td");
    td6.innerText = obj.mobile;

    row.append(td1, td2, td3, td4, td5, td6);
    document.querySelector("tbody").append(row);
}