const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2')

const app = express();

app.use(cors());
app.use(bodyparser.json());

//connect mysql db
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cv',
    port: 3306
});

//check database connection
db.connect(err => {
    if (err) {
        console.log('Error');
    }
    console.log("Database Connected Successfully...");
})

//create cv
app.post('/cv', (req, res) => {
    console.log(req.body, 'create cv');

    let name = req.body.name;
    let email = req.body.email;
    let phone = req.body.phone;
    let course = req.body.course;
    let university = req.body.university;
    let passoutyear = req.body.year;
    let companyname = req.body.company;
    let designation = req.body.designation;
    let yearofexperience = req.body.yearofexperience;
    let skills = req.body.skills;

    let qr = `insert into cv(name, email, phone, course, university, year, company, designation, yearofexperience, skills) 
    values('${name}','${email}',${phone},'${course}','${university}',${passoutyear},'${companyname}','${designation}',${yearofexperience},'${skills}')`;
    db.query(qr, (err, result) => {
        if (err) {
            console.log(err, "error");
        }

        if (result) {
            res.send({
                message: 'data inserted successfully'
            });
        }
        console.log(result, "result");
        res.send({
            message: "data inserted"
        })
    });
})

//get all users
app.get('/cv',(req,res)=>{
    let qr = `select * from cv`
    db.query(qr,(err,result)=>{
        if(err){
            console.log(err,"error");
        }

        if(result.length>0){
            res.send({
                message:'all users',
                data:result
            });
        }
        else
        {
            res.send({
                message:"Field is empty"
            });
        }
    });
})

//edit cv
app.put('/cv/:id',(req,res)=>{
    console.log(req.body,'edit cv');
    let gid = req.params.id;
    let name = req.body.name;
    let email = req.body.email;
    let phone = req.body.phone;
    let course = req.body.course;
    let university = req.body.university;
    let passoutyear = req.body.year;
    let companyname = req.body.company;
    let designation = req.body.designation;
    let yearofexperience = req.body.yearofexperience;
    let skills = req.body.skills;

    let qr = `update cv set name='${name}', email='${email}', phone='${phone}', course='${course}', university='${university}', year='${passoutyear}'
    , company='${companyname}', designation='${designation}', yearofexperience='${yearofexperience}', skills='${skills}' where id=${gid}`;
    db.query(qr,(err,result)=>{
        if(err){
            console.log(err,"error");
        }

            res.send({
                message:'User Cv updated successfully'
            }); 
    });
})


app.listen(3000, () => {
    console.log("server running successfully");
})