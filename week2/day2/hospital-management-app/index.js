// fill in javascript code here

// step 1

let infoArr = JSON.parse(localStorage.getItem("info")) || [];

displayTable(infoArr);

document.querySelector("form").addEventListener("submit", getDetails);

// step 2
function getDetails(e) {
  e.preventDefault();
  let name = document.querySelector("#name").value;
  let docID = document.querySelector("#docID").value;
  let dept = document.querySelector("#dept").value;
  let exper = Number(document.querySelector("#exp").value);
  let email = document.querySelector("#email").value;
  let mobile = document.querySelector("#mbl").value;

  // console.log(name, docID, dept, exper, email, mobile);

  // here we will make object now same as previous
  let obj = { name, docID, dept, exper, email, mobile };
  infoArr.push(obj);
  localStorage.setItem("info", JSON.stringify(infoArr));
  displayTable(infoArr);
  document.querySelector("form").reset();
}

function displayTable(obj) {
  document.querySelector("tbody").innerText = "";

  obj.forEach((el, i) => {
    const row = document.createElement("tr");

    const td1 = document.createElement("td");
    td1.innerText = el.name;

    const td2 = document.createElement("td");
    td2.innerText = el.docID;

    const td3 = document.createElement("td");
    td3.innerText = el.dept;

    const td4 = document.createElement("td");
    td4.innerText = el.exper;

    const td5 = document.createElement("td");
    td5.innerText = el.email;

    const td6 = document.createElement("td");
    td6.innerText = el.mobile;

    const td7 = document.createElement("td");
    if (el.exper > 10) {
      td7.innerText = "Expert";
      td7.style.color = "blue";
    } else if (el.exper > 5) {
      td7.innerText = "Senior";
      td7.style.color = "green";
    } else if (el.exper >= 2) {
      td7.innerText = "Junior";
      td7.style.color = "orange";
    } else {
      td7.innerText = "Trainee";
      td7.style.color = "red";
    }

    // const td8 = document.createElement("button");
    // td8.innerText = "Delete";
    // td8.addEventListener("click", function() {
    //     infoArr.splice(i, 1)
    //     localStorage.setItem("info", JSON.stringify(infoArr));
    //     displayTable(infoArr);

    //     alert("row deleted")
    // })

    const td8 = document.createElement("td");
    const btn = document.createElement("button");
    btn.innerText = "Delete";

    btn.addEventListener("click", function () {
      infoArr.splice(i, 1);
      localStorage.setItem("info", JSON.stringify(infoArr));
      displayTable(infoArr);

      alert("Row Deleted Successfully");
    });

    td8.append(btn);

    row.append(td1, td2, td3, td4, td5, td6, td7, td8);
    document.querySelector("tbody").append(row);
  });
}
