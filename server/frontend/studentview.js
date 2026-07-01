let students = [];

fetch("http://localhost:5000/students")
    .then(res => res.json())
    .then(data => {
        students = data;
        displayStudents(students);
    });

function displayStudents(data) {

    const table = document.getElementById("studentTable");

    table.innerHTML = "";

    data.forEach(student => {

        table.innerHTML += `
        <tr>

            <td>${student.student_id}</td>
            <td>${student.full_name}</td>
            <td>${student.email}</td>
            <td>${student.phone}</td>
            <td>${student.department}</td>
            <td>${student.semester}</td>
            <td>${student.dob}</td>
            <td>${student.gender}</td>

            <td>

                <button onclick="editStudent(${student.id})">
                    Edit
                </button>

                <button onclick="deleteStudent(${student.id})">
                    Delete
                </button>

            </td>

        </tr>
        `;

    });

}

function searchStudents() {

    let search = document
        .getElementById("search")
        .value
        .toLowerCase();

    let filtered = students.filter(student =>

        student.full_name.toLowerCase().includes(search) ||

        student.student_id.toString().includes(search)

    );

    displayStudents(filtered);

}

function deleteStudent(id) {

    if (!confirm("Delete this student?")) return;

    fetch(`http://localhost:5000/students/${id}`, {

        method: "DELETE"

    })

    .then(res => res.json())

    .then(() => {

        location.reload();

    });

}

function editStudent(id) {

    alert("Edit feature coming next!");

}