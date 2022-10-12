class EmployeePayrollData{
    set name(name){
		let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
		if(nameRegex.test(name))
			this._name=name;
		else {
			throw "Name is Incorrect";
		}   
    }
    get name(){
        return this._name;
    }
	set profilePic(profilePic){
        this._profilePic=profilePic;
    }
	
	get profilePic(){
        return this._profilePic;
    }

    set gender(gender){
        this._gender=gender;
    }

    get gender(){
        return this._gender;
    }

    set department(department){
        this._department=department;
    }

    get department(){
        return this._department;
    }

    set salary(salary){
        this._salary=salary;
    }

    get salary(){
        return this._salary;
    }

    set startDate(startDate){
        this._startDate=startDate;
    }

    get startDate(){
        return this._startDate;
    }

    set note(note){
        this._note=note;
    }

    get note(){
        return this._note;
    }

    set id(id){
        this._id=id;
    }

    get id(){
        return this._id;
    }

    toString(){
        return(
            "{"
            +" ID = "+this.id
            +", Name = "+this.name
			+", profilePic = "+this.profilePic
            +", Gender = "+this.gender
            +", Department = "+this.department
            +", Salary = "+this.salary
            +", Start Date = "+this.startDate
            +", Notes = "+this.note
            +" }"
        )
    }
}
let isUpdate = false;
let employeePayrollObj = new EmployeePayrollData();
window.addEventListener('DOMContentLoaded', (event) => {
    validateName();
    validateStartDate();
    updateSalaryRangeValue();
    checkForUpdate();
});

const save = (event) => {
    console.log("saving");
    try{
        createEmployeePayrollObject();
        createAndUpdateStorage()
        window.location.replace("../pages/home_page.html");
    } catch (e) {
        console.log(e)
        alert(e);
    } 
}

const createEmployeePayrollObject = () => {
    console.log("creating obj");
    employeePayrollObj._name = document.querySelector('#name').value;
    employeePayrollObj._profilePic = document.querySelector('input[name="profile"]:checked').value;
    employeePayrollObj._gender = document.querySelector('input[name="gender"]:checked').value;
    employeePayrollObj._department = getselectedValues('.checkbox');
    employeePayrollObj._salary = document.querySelector('#salary').value;
    employeePayrollObj._startDate = document.getElementById("start-date").value;
    employeePayrollObj._note = document.querySelector('#notes').value;
    if(employeePayrollObj._id == undefined){
        employeePayrollObj._id=createNewEmpId();
    }
    console.log(employeePayrollObj);
}

function getselectedValues(propertyValue){
    let allItems = document.querySelectorAll(propertyValue);
    let selectedItems = [];
    allItems.forEach(item => {
        if (item.checked) {
            selectedItems.push(item.value);
        }
    });
    return selectedItems;
}

function createNewEmpId(){
    let empID = localStorage.getItem("EmployeeID");
    empID = !empID ? 1 : (parseInt(empID)+1).toString();
    localStorage.setItem("EmployeeID", empID);
    return empID;
}
function createAndUpdateStorage(){
    let employeePayrollDataList = JSON.parse(localStorage.getItem("employeePayrollDataList"));
    if (employeePayrollDataList != undefined) {
        let existingObj = employeePayrollDataList.find(empData => (empData._id == employeePayrollObj._id) );
        if(existingObj != undefined){
            let index = employeePayrollDataList.indexOf(existingObj);
            employeePayrollDataList.splice(index,1);
        }
        employeePayrollDataList.push(employeePayrollObj);
    } else {
        employeePayrollDataList = [employeePayrollObj];
    }
    alert("Employee Added Successfully... \n"+employeePayrollObj);
    localStorage.setItem("employeePayrollDataList", JSON.stringify(employeePayrollDataList));
}

const setForm = () => {
    document.querySelector('#name').value = employeePayrollObj._name;
    setSelectedValues('[name=profile]', employeePayrollObj._profilePic); 
    setSelectedValues('[name=gender]', employeePayrollObj._gender); 
    setSelectedValues('[name=department]', employeePayrollObj._department); 
    document.querySelector('#salary').value =employeePayrollObj._salary;
    document.querySelector('.salary-output').textContent = employeePayrollObj._salary;
    document.querySelector('#notes').value = employeePayrollObj._note;
    document.querySelector('#start-date').value = employeePayrollObj._startDate;
}

const setSelectedValues = (propertyValue, value) =>{
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach( item => {
        if (Array.isArray(value)) {
            if (value.includes(item.value)) {
                item.checked = true;
            }
        } else if (item.value === value) {
            item.checked = true;
        }
    });
} 

function resetForm (){
    document.querySelector('#name').value = '';
    unSetSelectedValues('[name=profile]'); 
    unSetSelectedValues('[name=gender]'); 
    unSetSelectedValues('[name=department]'); 
    document.querySelector('#salary').value = '';
    document.querySelector('.salary-output').textContent = '400000';
    document.querySelector('#notes').value = '';
    document.querySelector('#start-date').value = ''; 
} 

const unSetSelectedValues = (propertyValue) => { 
    let allItems = document.querySelectorAll(propertyValue); 
    allItems.forEach(item => { 
        item.checked = false; 
    }); 
} 


const checkForUpdate = () => {
    const employeePayrollJson = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJson ? true : false;
    if (isUpdate) {
        console.log("updating...")
        employeePayrollObj = JSON.parse(employeePayrollJson);
        setForm();
    }
    localStorage.removeItem('editEmp');
}

const validateName = () => {
    const name = document.querySelector('#name');
	const textError = document.querySelector('.text-error');
	name.addEventListener('input', function(){
		if(name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try{
            let empData=(new EmployeePayrollData());
            empData.name = name.value;
            textError.textContent="";
        } catch (e) {
            textError.textContent = e;
        }
	});
}

const updateSalaryRangeValue = () => {
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    salary.addEventListener('input',function(){
        output.textContent = salary.value;
    });
}
const validateStartDate = () => {
    let currentDate;
    let startDate;
    const date = document.querySelector('#start-date');
    const dateError = document.querySelector('.date-error');
    date.addEventListener('input',function(){
        console.log("checking date");
        startDate = new Date(date.value);
        currentDate = new Date();

        if (startDate > currentDate) {
            console.log("Start date can not be future date");
            dateError.textContent = "Start date can not be future date";
        }else {
            dateError.textContent = "";
        }
    });
}
