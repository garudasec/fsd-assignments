// step-1 select/catch the form
document.querySelector("form").addEventListener("submit", getDetails);

// step-2
function getDetails(e) {
  e.preventDefault();
  let name = document.querySelector("#task").value;
  let priority = document.querySelector("#priority").value;
  // console.log(name, priority);

  // here we are making object!
  // let taskObj = {name:name,
  //     priority:priority
  // }

  //agar key,value name same hai to aisi likh sakte hai!
  let taskObj = { name, priority };

  console.log(taskObj);

  // hume ye karna hai..
  // <tr>
  //     <td>Task</td>
  //     <td>Priority</td>
  //     <td>Favourite</td>

  // </tr>

  displayTable(taskObj);
}

function displayTable(taskObj) {
  const row = document.createElement("tr");

  const td1 = document.createElement("td");
  td1.innerText = taskObj.name;

  const td2 = document.createElement("td");
  td2.innerText = taskObj.priority;

  const td3 = document.createElement("td");
  td3.innerText = "add";

  row.append(td1, td2, td3);
  document.querySelector("tbody").append(row);
}
