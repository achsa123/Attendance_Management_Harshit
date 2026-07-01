async function addStudent() {

    const name = document.getElementById("name").value;
    const roll = document.getElementById("roll").value;
    const department = document.getElementById("department").value;

    const response = await fetch("http://localhost:5000/students", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            roll,
            department
        })
    });

    const message = await response.text();

    alert(message);

}