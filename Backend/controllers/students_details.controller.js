const StudentsDetails = require("../models/students_details.model");
const express = require('express');


// Create and Save

exports.create = (req,res) =>{
    // if(!req.body.studentName){
    //     res.status(400).json({message:"Name Can't be empty"});
    // }
    // if(!req.body.rollNumber){
    //     res.status(400).json({message:"Roll Number Can't be empty"});
    // }
    // if(!req.body.subjectOne){
    //     res.status(400).json({message:"Marks 1 Can't be empty"});
    // }
    // if(!req.body.subjectTwo){
    //     res.status(400).json({message:"Marks 2 Can't be empty"});
    // }
    // if(!req.body.subjectThree){
    //     res.status(400).json({message:"Marks 3 Can't be empty"});
    // }

    const studentsDetails = new StudentsDetails({
        studentName:req.body.studentName,
        rollNumber:req.body.rollNumber,
        subject1:req.body.subject1,
        subject2:req.body.subject2,
        subject3:req.body.subject3
    });

    console.log("Saving Students Details......")
    studentsDetails
    .save(studentsDetails)
    .then(data =>{
        console.log(data)
        res.json(data)
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({
            message:err.message || "Some error occured while saving students details"
        });
    });

}
// Find all Student
exports.findAll = (req, res) => {
    StudentsDetails.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while retrieving Students details" });
        })

};


// Find a single Student

exports.read = (req,res)=>{
    StudentsDetails
    .findOne({_id:req.params._id})
    .then(data=>{
        res.json(data);
      
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message || "Some error occurred while retrieving Student details"
        })

    })

}


// find one
exports.findOne = (req, res)=>{
    StudentsDetails.findOne({_id:req.params._id})
    .then(studentsDetails=>{
        res.send(studentsDetails);
    }).catch(err=>{
        res.status(500).send({message:err.message || "Some error occurred while retrieving Students"})
    })

}


//FOr Update

exports.update = (req,res) =>{
    if(!req.body.studentName){
        res.status(400).json({message:"Name Can't be empty"});
    }
    if(!req.body.rollNumber){
        res.status(400).json({message:"Roll Number Can't be empty"});
        return;
    }
    if(!req.body.subject1){
        res.status(400).json({message:"Marks 1 Can't be empty"});
        return;
    }
    if(!req.body.subject2){
        res.status(400).json({message:"Marks 2 Can't be empty"});
        return;
    }
    if(!req.body.subject3){
        res.status(400).json({message:"Marks 3 Can't be empty"});
        return;
    }

    StudentsDetails.findOneAndUpdate({_id:req.params._id},{
        studentName:req.body.studentName,
        rollNumber:req.body.rollNumber,
        subject1:req.body.subject1,
        subject2:req.body.subject2,
        subject3:req.body.subject3

    })
    .then(studentsDetails =>{
        res.send(studentsDetails);
    })
    .catch(err => {
        res.status(500).json({
            message:err.message || "Some error occurred while updating Students Details"

        })
    })


}

//For Delete

exports.delete = (req,res)=>{
    StudentsDetails
    .findByIdAndDelete({_id:req.params._id})
    .then(data => {
        res.json(data);
    })
    .catch(err =>{
        res.status(500).json({
            message:err.message || "Some error occured while deleting Students details"
        })
    })

}