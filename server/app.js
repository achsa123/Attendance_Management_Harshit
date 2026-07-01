const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./database");


const app = express();

const PORT = 5000;



app.use(cors());

app.use(express.json());

app.use(express.static(path.join(__dirname,"frontend")));




// open dashboard

app.get("/",(req,res)=>{

    res.redirect("/dashboard.html");

});






// GET STUDENTS

app.get("/students",(req,res)=>{


    db.all(

        "SELECT * FROM students",

        [],


        (err,rows)=>{


            if(err){

                return res.status(500).json({

                    error:err.message

                });

            }


            res.json(rows);


        }


    );


});









// ADD STUDENT

app.post("/students",(req,res)=>{


const s=req.body;



db.run(

`

INSERT INTO students

(
student_id,
full_name,
email,
phone,
department,
semester,
dob,
gender
)

VALUES(?,?,?,?,?,?,?,?)

`,


[

s.student_id,
s.full_name,
s.email,
s.phone,
s.department,
s.semester,
s.dob,
s.gender

],


function(err){


if(err){

return res.status(500).json({

error:err.message

});

}


res.json({

message:"Student Added"

});


}


);



});









// DELETE STUDENT

app.delete("/students/:id",(req,res)=>{


const id=req.params.id;



db.run(

`

DELETE FROM students

WHERE id=? OR student_id=?

`,

[id,id],


function(err){



if(err){


return res.status(500).json({

error:err.message

});


}



res.json({

message:"Student Deleted",

changes:this.changes

});



}



);



});









// EDIT STUDENT

app.put("/students/:id",(req,res)=>{


const id=req.params.id;


const s=req.body;



db.run(

`

UPDATE students SET


full_name=?,

email=?,

phone=?,

department=?,

semester=?,

dob=?,

gender=?


WHERE id=? OR student_id=?


`,


[

s.full_name,

s.email,

s.phone,

s.department,

s.semester,

s.dob,

s.gender,

id,

id

],



function(err){



if(err){


return res.status(500).json({

error:err.message

});


}



res.json({

message:"Student Updated",

changes:this.changes

});



}



);



});









app.listen(PORT,()=>{


console.log(`🚀 Server running at http://localhost:${PORT}`);


});