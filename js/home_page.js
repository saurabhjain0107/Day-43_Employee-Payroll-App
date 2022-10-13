let empPayrollList;
window.addEventListener('DOMContentLoaded',(event) => {
  empPayrollList = getEmployeePayrollDataFromStorage();
  createInnerHtml();
  document.querySelector(".emp-count").textContent = empPayrollList.length;
  localStorage.removeItem('editEmp');
});

const getEmployeePayrollDataFromStorage = () => {
  return localStorage.getItem('employeePayrollDataList') ? JSON.parse(localStorage.getItem('employeePayrollDataList')) : [];
}

const createInnerHtml=() => {
  const headerHtml=`
  <tr>
    <th></th>
    <th>Name</th>
    <th>Gender</th>
    <th>Department</th>
    <th>Salary</th>
    <th>Start Date</th>
    <th>Actions</th>
  </tr>
  `;
  if (empPayrollList.length == 0){
    console.log("empPayrollList is empty")
    return;
  } 
  let innerHtml = `${headerHtml}`;
  for(const employeePayrollData of empPayrollList){
    innerHtml=`
    ${innerHtml}
    <tr>
      <td> 
        <img class="${employeePayrollData._profilePic}">
      </td>
      <td>${employeePayrollData._name}</td>
      <td>${employeePayrollData._gender}</td>
      <td>
        ${getDeptHtml(employeePayrollData._department)}
      </td>
      <td>${employeePayrollData._salary}</td>
      <td>${new Date(Date.parse(employeePayrollData._startDate)).toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'})}</td>
      <td>
        <img name="" id="${employeePayrollData._id}" onclick="remove(this)" alt="delete" src="../assets/icons/delete-black-18dp.svg">
        <img name="" id="${employeePayrollData._id}" onclick="update(this)" alt="edit" src="../assets/icons/create-black-18dp.svg">
      </td>
    </tr>
  `;
  }
  document.querySelector('#table-display').innerHTML = innerHtml;
}

const createEmployeePayrollJSON = () => {
  let employeePayrollListLocal = [
    {
      _name: 'Sagar',
      _gender: 'male',
      _department: ['HR', 'Finance'],
      _salary: '500000',
      _startDate: 2022-01-01,
      _note: '',
      _id: new Date().getTime(),
      _profilePic: '../assets/profile-images/Ellipse -2.png'
    },{
      _name: 'Ranjit',
      _gender: 'male',
      _department: ['HR', 'Finance'],
      _salary: '400000',
      _startDate: 2022-05-02,
      _note: '',
      _id: new Date().getTime(),
      _profilePic: '../assets/profile-images/Ellipse -3.png'
    }
  ]
  return employeePayrollListLocal;
};

const getDeptHtml = (deptList) => {
  if (deptList == undefined) {
    console.log("deptList is empty");
    return;    
  }
  let deptHtml = '';
  for (const dept of deptList) {
    deptHtml = `${deptHtml} <div class="dept-label">${dept}</div>`;
  }
  return deptHtml;
}

const remove = (node) => {
  let empPayrollData = empPayrollList.find(empData => empData._id == node.id );
  if (!empPayrollData) {
    alert("data not found");
    return;
  }
  const index = empPayrollList.map(empData => empData._id).indexOf(empPayrollData._id);
  empPayrollList.splice(index, 1);
  localStorage.setItem("employeePayrollDataList", JSON.stringify(empPayrollList));
  document.querySelector(".emp-count").textContent = empPayrollList.length;
  createInnerHtml();
}

const update = (node) =>{
  let empPayrollData = empPayrollList.find(empData => empData._id == node.id );
  if (!empPayrollData) {
    alert("data not found");
    return;
  }
  localStorage.setItem("editEmp",JSON.stringify(empPayrollData))
  window.location.replace("../pages/payroll_form.html");
}