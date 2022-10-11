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
let employeePayrollObj = new EmployeePayrollData();
window.addEventListener('DOMContentLoaded', (event) => {
    // validateName();
    // validateStartDate();
    // updateSalaryRangeValue();
    // checkForUpdate();
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input',function(){
    if(name.value.length == 0){
        textError.textContent = "";
        return;
    }
    try{
        (new EmployeePayrollData()).name = name.value;
        textError.textContent = "";
    }catch(e){
        textError.textContent = e;
    }
    });
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input',function(){
        output.textContent = salary.value;
    });
    
});