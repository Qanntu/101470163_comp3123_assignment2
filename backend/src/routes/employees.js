const express = require('express');

const EmployeeModel = require("../models/employees")

const routes = express.Router();

//Get All Employees
routes.get("/", (req, res) => {
    // get all employees from MongoDB
    EmployeeModel.find().then((employees) => {
        res.send(employees)
    }).catch((err) => {
        res.status(500).send({message: err.message})
    })
    
    //res.send({message: "Get All Employees"})
})

//Add NEW Employee
routes.post("/", async (req, res) => {
    const employeeData = req.body
    console.log(employeeData)
    
    try {
        //create a new employee instance
        const employee = new EmployeeModel(employeeData)

        //save the employee to mongoDB
        const newEmployee = await employee.save()
        res.send(newEmployee)

    } catch (error){
        res.status(500).send({message: error.message})
    }
    //res.send({message: "Add NEW Employee"})
})


//Update existing Employee By Id
routes.put("/:employeeid", (req, res) => {
    
    //Update employee by ID
    EmployeeModel.findByIdAndUpdate(req.params.employeeid, req.body, {new: true})
        .then((employee) => {
            if(employee){
                res.send(employee)
            } else{
                res.status(404).send({message:"Employee not found"})
            }
        }).catch((error) => {
            res.status(500).send({message: error.message})
        })
    //res.send({message: "Update existing Employee By Id"})
})


//Delete Employee By ID
routes.delete("/:employeeid", (req, res) => {
    EmployeeModel.findByIdAndDelete(req.params.employeeid).then((employee) =>{
        if(employee){
            res.send(employee)
        } else {
            res.status(400).send({message: "Employee not found"})
        }
    }).catch((error) =>{
        res.status(500).send({message: error.message})
    })
    //res.send({message: "Delete Employee By ID"})
})

//Get Employee By ID
routes.get("/:employeeid", (req, res) => {
        EmployeeModel.findById(req.params.employeeid).then((employee) =>{
        if(employee){
            res.send(employee)
        } else {
            res.status(400).send({message: "Employee not found"})
        }
    }).catch((error) =>{
        res.status(500).send({message: error.message})
    })
    
    //res.send({message: "Get Employee By ID"})
})



//Get All Employees in sorted order
routes.get("/sort", (req, res) => {
    EmployeeModel.find().sort({ title: 1 }).then((employees) => {
        res.send(employees)
    }).catch((error) => {
        res.status(500).send({ message: error.message })
    })

    //res.send({message: "Get All Employees in sorted order"})
})
module.exports = routes;