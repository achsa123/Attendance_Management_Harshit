const sqlite3 = require("sqlite3").verbose();


const db = new sqlite3.Database("./students.db", (err) => {

    if (err) {
        console.log("Database connection failed:", err.message);
    } 
    else {
        console.log("Connected to SQLite database");
    }

});


db.serialize(() => {


    // Students table

    db.run(`
        CREATE TABLE IF NOT EXISTS students (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            student_id TEXT UNIQUE,

            full_name TEXT NOT NULL,

            email TEXT,

            phone TEXT,

            department TEXT,

            semester INTEGER,

            dob TEXT,

            gender TEXT

        )
    `);



    // Attendance table

    db.run(`
        CREATE TABLE IF NOT EXISTS attendance (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            student_id TEXT,

            date TEXT,

            status TEXT,

            FOREIGN KEY(student_id) REFERENCES students(student_id)

        )
    `);


});


module.exports = db;