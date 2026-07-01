const API = "http://localhost:5000/students";


// LOAD STUDENTS + COUNT

function loadStudents(){


fetch(API)

.then(response => response.json())

.then(students => {


let count = document.getElementById("studentCount");

if(count){

count.innerHTML = students.length;

}



let table = document.getElementById("studentTable");


if(table){


table.innerHTML = "";


students.forEach(student => {


table.innerHTML += `

<tr>

<td>${student.student_id}</td>

<td>${student.full_name}</td>

<td>${student.email}</td>

<td>${student.department}</td>


<td>


<button onclick="deleteStudent(${student.id})">

Delete

</button>


</td>


</tr>

`;



});


}


})


.catch(error => {


console.log("Student load error:",error);


});


}







// ADD STUDENT

function addStudent(){



let student = {


student_id: document.getElementById("student_id").value,

full_name: document.getElementById("full_name").value,

email: document.getElementById("email").value,

phone: document.getElementById("phone").value,

department: document.getElementById("department").value,

semester: document.getElementById("semester").value,

dob: document.getElementById("dob").value,

gender: document.getElementById("gender").value


};





fetch(API, {


method:"POST",


headers:{


"Content-Type":"application/json"


},


body:JSON.stringify(student)



})


.then(response=>response.json())


.then(data=>{


alert(data.message);


window.location.href="index.html";


})


.catch(error=>{


console.log("Add error:",error);


});



}







// DELETE STUDENT


function deleteStudent(id){



fetch(API+"/"+id,{


method:"DELETE"


})


.then(response=>response.json())


.then(data=>{


alert(data.message);


loadStudents();


})


.catch(error=>{


console.log("Delete error:",error);


});



}





window.onload = loadStudents;