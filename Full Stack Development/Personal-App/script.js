let personels = [
    {
        firstName: "Taner1",
        lastName: "Saydam",
        profession:"Software",
        startDate: "2024-01-31",
        salary:"185000.25"
    },
    {
        firstName: "Taner2",
        lastName: "Saydam",
        profession:"Software",
        startDate: "2024-03-18",
        salary:"17000"
    },
    {
        firstName: "Taner3",
        lastName: "Saydam",
        profession:"Software",
        startDate: "2024-03-18",
        salary:"17000"
    },
    {
        firstName: "Taner4",
        lastName: "Saydam",
        profession:"Software",
        startDate: "2024-03-18",
        salary:"17000"
    }
];

let updateIndex = -1;

function save(event){
    event.preventDefault();
    const firstNameInputElement = document.getElementById("firstName");
    const lastNameInputElement = document.getElementById("lastName");
    const professionInputElement = document.getElementById("profession");
    const startDateInputElement = document.getElementById("startDate");
    const salaryInputElement = document.getElementById("salary");

    const data = {
        firstName: firstNameInputElement.value,
        lastName: lastNameInputElement.value,
        profession: professionInputElement.value,
        startDate: startDateInputElement.value,
        salary: salaryInputElement.value
    }

    personels.push(data);
    
    setPersonelsToTable();

    firstNameInputElement.value = "";
    lastNameInputElement.value = "";
    professionInputElement.value = "";
    startDateInputElement.value = "2024-03-18"
    salaryInputElement.value = "17002";

    firstNameInputElement.focus();

    showToast("Personel create is successful");

}

setPersonelsToTable();

function setPersonelsToTable(){
    const tbodyElement = document.querySelector("tbody");

    personels = personels.sort((a,b) => 
                    a.firstName.localeCompare(b.firstName));

    let value = "";
    for(const index in personels){

        const date = new Date(personels[index].startDate);
        const newDate = 
        `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;

        const salary = 
        formatSalary(personels[index].salary.replace(",","."));

        value += `
                <tr>
                    <td>${+index + 1}</td>
                    <td>${personels[index].firstName}</td>
                    <td>${personels[index].lastName}</td>
                    <td>${personels[index].profession}</td>
                    <td>${newDate}</td>
                    <td>${salary}</td>
                    <td>
                        <button onclick="showUpdateForm(${index})" class="btn btn-sm btn-outline-primary update-delete-group">
                            <i class="fa-solid fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger update-delete-group" 
                        onclick="deleteByIndex(${index})">
                        <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                </tr>
        `
    } 

    tbodyElement.innerHTML = value;
}

function deleteByIndex(index){
    const personel = personels[index];
    Swal.fire({ //promise
        title: 'Delete?',
        text: 'Do you want to delete ' + personel.firstName + " "  + personel.lastName,
        icon: 'question', //info, success, error, question, warning
        confirmButtonText: 'Delete',
        cancelButtonText:'Cancel',
        showCancelButton: true
      }).then((val)=> {
        if(val.isConfirmed === true){
            personels.splice(index,1); 
            setPersonelsToTable();          
            showToast("Personel delete is successful","info");
         }
      })
}

function formatSalary(salaryString){
    const salaryNumber = +salaryString;

    const formatter = new Intl.NumberFormat('tr-TR', {
        style: "currency",
        currency: "TRY",
        minimumFractionDigits: 2
    });

    return formatter.format(salaryNumber);
}

function showToast(message,icon="success"){
    const Toast = Swal.mixin({
        toast:true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 1500
      });
      Toast.fire(message, "", icon)
}

function showOrHideAddPersonelForm(){
    const el = document.getElementById("addPersonelForm");
    if(el !== null){
        if(el.style.display === "flex"){
            showOrHideFormAdditionalMethod(el,"none","initial")
        }else{
            showOrHideFormAdditionalMethod(el,"flex","none")
        }
    }
}

function showOrHideFormAdditionalMethod(el,eld,btneld){
    el.style.display = eld;

    const btnEL = document.getElementById("addPersonelBtnDiv");
    if(btnEL !== null){
        btnEL.style.display =btneld;
    }

    if(eld === "flex"){
        const inputSalaryEl = document.getElementById("salary");
        if(!localStorage.getItem("token")){
          //  inputSalaryEl.style.display = "none"
           inputSalaryEl.remove();
        }else{
            if(inputSalaryEl === null){
                //inputSalaryEl.style.display = "initial"
                const salaryFormGroupEl = document.getElementById("salaryFormGroup");
                salaryFormGroupEl.innerHTML += `
                <input id="salary" type="text" class="form-control" required value="17002">`
            }
        }
    }
}

function showUpdateForm(index){
    const personel = personels[index];
    updateIndex = index;

    const el = document.getElementById("updatePersonelForm");
    if(el !== null){
        el.style.display="flex";

        const addBtnEl = document.getElementById("addPersonelBtnDiv");
        addBtnEl.style.display = "none";

        const updateDeleteBtnels = document.querySelectorAll(".update-delete-group");
        for(let i in updateDeleteBtnels){       
            if(i === "entries")  break;

            const udBtnEl = updateDeleteBtnels[i];
            if(udBtnEl !== undefined){
                udBtnEl.style.display = "none";
            }            
        }        

        const firstNameEl = document.getElementById("updateFirstName");
        firstNameEl.value = personel.firstName;

        const lastNameEl = document.getElementById("updateLastName");
        lastNameEl.value = ptoersonel.lastName;

        const professionEl = document.getElementById("updateProfession");
        professionEl.value = personel.profession;

        const startDateEl = document.getElementById("updateStartDate");
        startDateEl.value = personel.startDate;

        const salaryEl = document.getElementById("updateSalary");
        salaryEl.value = personel.salary;
    }
}

function update(event){
    event.preventDefault();
    const personel = personels[updateIndex];

    const firstNameEl = document.getElementById("updateFirstName");
    const lastNameEl = document.getElementById("updateLastName");
    const professionEl = document.getElementById("updateProfession");
    const startDateEl = document.getElementById("updateStartDate");
    const salaryEl = document.getElementById("updateSalary");

    personel.firstName = firstNameEl.value;
    personel.lastName = lastNameEl.value;
    personel.profession = professionEl.value;
    personel.startDate = startDateEl.value;
    personel.salary = salaryEl.value;

    setPersonelsToTable();
    closeUpdateForm();
    updateIndex = -1;
    showToast("Update personel is successful","info");
}

function closeUpdateForm(){
    const el = document.getElementById("updatePersonelForm");
    if(el !== null){
        el.style.display = "none";

        const addBtnEl = document.getElementById("addPersonelBtnDiv");
        addBtnEl.style.display = "initial";

        const updateDeleteBtnels = document.querySelectorAll(".update-delete-group");
        for(let i in updateDeleteBtnels){            
            const udBtnEl = updateDeleteBtnels[i];
            if(udBtnEl !== undefined){
                udBtnEl.style.display = "initial";
            }            
        }
    }
}