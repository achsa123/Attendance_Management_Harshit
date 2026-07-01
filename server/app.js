const express = require("express");
const cors = require("cors");

const db = require("./database");

const app = express();

app.use(cors());
app.use(express.json());


// TEST ROUTE

app.get("/", (req, res) => {
    res.send("Student Attendance System Running");
});


// ADD STUDENT

app.post("/students", (req, res) => {

    const {
        student_id,
        full_name,
        email,
        phone,
        department,
        semester,
        dob,
        gender
    } = req.body;


    const sql = `
    INSERT INTO students
    (student_id, full_name, email, phone, department, semester, dob, gender)

    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;


    db.run(
        sql,
        [
            student_id,
            full_name,
            email,
            phone,
            department,
            semester,
            dob,
            gender
        ],

        function(err){

            if(err){
                return res.status(400).json({
                    error: err.message
                });
            }


            res.json({
                message:"Student Added",
                id:this.lastID
            });

        }
    );

});




// VIEW ALL STUDENTS

app.get("/students", (req,res)=>{


    db.all(
        "SELECT * FROM students",

        [],

        (err,rows)=>{

            if(err){
                return res.status(400).json({
                    error:err.message
                });
            }


            res.json(rows);

        }

    );


});





// DELETE STUDENT

app.delete("/students/:id",(req,res)=>{


    db.run(

        "DELETE FROM students WHERE id=?",

        [req.params.id],

        function(err){

            if(err){
                return res.status(400).json({
                    error:err.message
                });
            }


            res.json({
                message:"Student Deleted"
            });


        }

    );


});





// START SERVER

app.listen(5000,()=>{

    console.log("Server running on port 5000");

});