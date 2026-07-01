const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();

app.use(cors());
app.use(express.json());



// HOME

app.get("/",(req,res)=>{

res.send("Student Attendance System Running");

});




// GET STUDENTS

app.get("/students",(req,res)=>{


db.all(

"SELECT * FROM students",

[],

(err,rows)=>{


if(err)
return res.json({error:err.message});


res.json(rows);


});


});







// ADD STUDENT


app.post("/students",(req,res)=>{


const {

student_id,
full_name,
email,
phone,
department,
semester,
dob,
gender

}=req.body;



db.run(

`

INSERT INTO students

(student_id,full_name,email,phone,department,semester,dob,gender)

VALUES(?,?,?,?,?,?,?,?)

`,

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


if(err)
return res.json({error:err.message});


res.json({

message:"Student Added"

});


});


});









// EDIT STUDENT


app.put("/students/:id",(req,res)=>{


let id=req.params.id;


let {full_name}=req.body;



db.run(

`

UPDATE students

SET full_name=?

WHERE id=?

`,

[full_name,id],


function(err){


if(err)
return res.json({error:err.message});


res.json({

message:"Student Updated"

});


});


});









// DELETE STUDENT
app.delete("/students/:id",(req,res)=>{

    let id=req.params.id;

    db.run(

        "DELETE FROM students WHERE id=?",

        [id],

        function(err){

            if(err)
                return res.json({error:err.message});

            res.json({

                message:"Student Deleted"

            });

        });

});  


// MARK ATTENDANCE

app.post("/attendance", (req, res) => {

    console.log("BODY RECEIVED:", req.body);

    const {
        student_id,
        date,
        status
    } = req.body;

    db.run(
        `
        INSERT INTO attendance
        (student_id, date, status)
        VALUES (?, ?, ?)
        `,
        [student_id, date, status],

        function (err) {

            if (err) {
                console.log("SQL ERROR:", err.message);
                return res.json({
                    error: err.message
                });
            }

            console.log("Attendance inserted!");

            res.json({
                message: "Attendance Marked"
            });

        }
    );

});


// VIEW ATTENDANCE

app.get("/attendance",(req,res)=>{

    db.all(

        `
        SELECT * FROM attendance
        `,

        [],

        (err,rows)=>{

            if(err)
                return res.json({error:err.message});

            res.json(rows);

        }

    );

});








