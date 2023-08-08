const btn = document.getElementById("add");
const form = document.getElementById("form");
const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");
const input3 = document.getElementById("input3");
const msg = document.getElementById("msg");
const msg1 = document.getElementById("msg1");
const msg2 = document.getElementById("msg2");
const dataas = document.getElementById("datas");
const dataas2 = document.getElementById("datas2");
const dataas3 = document.getElementById("datas3");

const tableData = document.getElementById("tableData");
const submit = document.getElementById("submit");

const storedData = localStorage.getItem("data");
const emailList = [];
for (user of JSON.parse(storedData)) {
  emailList.push(user.data3);
}

let formValidation = () => {
  if (input1.value == "") {
    msg.innerHTML = "name cannot be blank";
  } else {
    msg.innerHTML = "";
  }
  if (input2.value === "" || input2.value < 0) {
    msg1.innerHTML = "age cannot be blank or negative";
  } else {
    msg1.innerHTML = "";
  }
  if (input3.value === "") {
    msg2.innerHTML = "email cannot be blank";
  } else {
    msg2.innerHTML = "";
  }
  if (emailList.includes(input3.value)) {
    form.style.display = "block";
    btn.innerHTML = "Cancel";
    msg2.innerHTML = "This email is already added";
    return;
  }

  if (
    input1.value !== "" &&
    input2.value !== "" &&
    input2.value > 0 &&
    input3.value !== ""
  ) {
    acceptData();
  }
};

// Read Operation//

const retrievedPersonJSON = localStorage.getItem("data");
const retrievedPerson = JSON.parse(retrievedPersonJSON);

let acceptData = () => {
  if (emailList.includes(input3.value)) {
    msg2.innerHTML = "This email is already added";
  } else {
    const detail = {
      data1: input1.value,
      data2: input2.value,
      data3: input3.value,
    };
    data.push(detail);
    createData();

    emailList.push(input3.value);

    msg2.innerHTML = "";
  }
  const personJSON = JSON.stringify(data);
  localStorage.setItem("data", personJSON);
};

const DATA = localStorage.getItem("data");
const data = JSON.parse(DATA) || [];

let createData = (filteredData=data) => {
  tableData.innerHTML = "";

  filteredData.forEach((arrow) => {
    tableData.innerHTML += `
      <tr>
        <td>${arrow.data1}</td>
        <td>${arrow.data2}</td>
        <td>${arrow.data3}</td>
        <td>
          <i class="fas fa-trash-alt" onClick="deletePost(this)"></i>
          <i onClick="editPost(this)" class="fas fa-edit"></i>
        </td>
      </tr>
    `;
  });

  form.reset();
  if (
    input1.value !== "" &&
    input2.value !== "" &&
    input2.value > 0 &&
    input3.value !== ""
  ) {
    acceptData();
    createData();
  }
};

createData();
////////

//// DELETE /////
let deletePost = (e) => {
  const dates = e.parentElement.parentElement;
  const index = Array.from(dates.parentElement.children).indexOf(dates);
  dates.remove();
  data.splice(index, 1);
  localStorage.setItem("data", JSON.stringify(data));
};

/////////////////

/// EDIT ////
let editPost = (e) => {
  if (form.style.display === "none") {
    form.style.display = "block";
    btn.innerHTML = "Cancel";
  } else {
    form.style.display = "none";
    btn.innerHTML = "Add";
  }

  const row = e.parentElement.parentElement;
  const index = Array.from(row.parentElement.children).indexOf(row);

  input1.value = row.cells[0].textContent;
  input2.value = row.cells[1].textContent;
  input3.value = row.cells[2].textContent;

  data.splice(index, 1);
};

/////////////
btn.addEventListener("click", () => {
  if (form.style.display === "block") {
    form.style.display = "none";
    btn.innerHTML = "Add";
  } else {
    form.style.display = "block";
    btn.innerHTML = "Cancel";
  }
});

submit.addEventListener("click", () => {
  var mailFormat = /@/;
  if (
    form.style.display === "block" &&
    input1.value !== "" &&
    input2.value !== "" &&
    input2.value > 0 &&
    input3.value !== "" &&
    input3.value.match(mailFormat)
  ) {
    form.style.display = "none";
    btn.innerHTML = "Add";
  } else {
    form.style.display = "block";
    btn.innerHTML = "Cancel";
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

const searchForm = document.getElementById('searchbar');
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchInput = document.getElementById('search').value.toLowerCase();
    const filteredData = data.filter(entry => 
        entry.data1.toLowerCase().includes(searchInput) || 
        entry.data2.toLowerCase().includes(searchInput) || 
        entry.data3.toLowerCase().includes(searchInput));
    createData(filteredData);
})