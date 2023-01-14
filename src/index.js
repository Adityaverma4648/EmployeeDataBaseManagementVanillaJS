(async function getData() {
  const data = await fetch("./src/data.json");
  const res = await data.json();

  let emp = res;
  const emp_list = document.querySelector(".emp_list");
  const emp_details = document.querySelector(".emp_details");
  // Adding new Employees
  // creating modal form for the same ...
  var addEmployeeBtn = document.querySelector("#addEmployee");
  var modal = document.querySelector("#modal");
  var closeBtn = document.querySelector("#closeBtn");

  addEmployeeBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });
  closeBtn.onclick = () => {
    modal.style.display = "none";
  };

  // ----------------------------------------------

  const renderEmp = () => {
    emp_list.innerHTML = "";
    emp.forEach((emp) => {
      const emp_name = document.createElement("div");

      if (parseInt(selectedEmployeeId, 10) === emp.id) {
        emp_list.classList.add("selected");
        selectedEmployee = emp;
      }

      emp_name.classList.add("emp_list_div");
      emp_name.setAttribute("id", emp.id);
      emp_name.innerHTML = `${emp.firstName} ${emp.lastName}<span class="trash">X</span>`;
      emp_list.append(emp_name);
    });
  };
  const renderSelectedEmp = () => {
    if (selectedEmployeeId === -1) {
      emp_details.innerHTML = "";
      return;
    }

    emp_details.innerHTML = "";
    const emp_detail = document.createElement("div");
    emp_detail.classList.add("emp_details_selected");
    emp_detail.setAttribute("id", selectedEmployeeId);

    emp_detail.innerHTML = `<div>
                                <img src="${selectedEmployee.imageUrl}" alt="${
      selectedEmployee.firstName
    }">
                        <div>
                        <span><h3>${selectedEmployee.firstName} ${
      selectedEmployee.lastName
    }</h3></span>
                        <span><strong>Email : </strong>${
                          selectedEmployee.email
                        }</span>
                        <span><strong>Age :</strong> ${
                          new Date().getFullYear() -
                          parseInt(`${selectedEmployee.dob}`.slice(6), 10)
                        }</span>
                                <span>
                                <strong>ContactInfo: </strong>
                                ${selectedEmployee.contactNumber}</span>
                                </div>
                            </div>`;
    emp_details.append(emp_detail);
  };

  //  adding empolyee logic
  const addEmpForm = document.querySelector("#modal_form");
  addEmpForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const myFormData = new FormData(addEmpForm);
    const values = [...myFormData.entries()];
    console.log(values);
    //  conversion of array to object values
    var newEmpData = {};
    values.forEach((val) => {
      newEmpData[val[0]] = val[1];
      console.log(val[0]);
    });
    newEmpData.id = emp[emp.length - 1].id + 1;
    newEmpData.imageUrl =
      newEmpData.imageUrl || "https://cdn-icons-png.flaticon.com/512/0/93.png";
    emp.push(newEmpData);
    renderEmp();
    addEmpForm.reset();
    modal.style.display = "none";
  });

  console.log(emp);

  let selectedEmployeeId = emp[0].id;
  let selectedEmployee = emp[0];

  emp_list.addEventListener("click", (e) => {
    if (e.target.tagName === "DIV" && selectedEmployeeId !== e.target.id) {
      console.log(e.target.tagName, e.target.id);
      selectedEmployeeId = e.target.id;
      renderEmp();
      renderSelectedEmp();
    }
    if (e.target.tagName === "SPAN") {
      emp = emp.filter((emp) => String(emp.id) !== e.target.parentNode.id);
    }
    // if (String(selectedEmployeeId) === e.target.parentNode.id) {
    //   selectedEmployeeId = emp[0]?.id || -1;
    //   selectedEmployee = emp[0] || {};
    //   renderSelectedEmp();
    // }
    renderEmp();
  });

  renderEmp();

  renderSelectedEmp();
})();
