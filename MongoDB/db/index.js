//connecting to db 
const express = require("express")
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin:ae4Qf8tzotdhXF1E@cluster0.bp7lcsv.mongodb.net/CourseSelling-App");

//need to add schema for our DB 

const AdminSchema = new mongoose.Schema({
    username:String,
    password:String
})

const UserSchema = new mongoose.Schema({
    username: String,
    password : String,
    purchasedCourse : [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }]
})

const CourseSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageLink : String,
    price : Number
})

//
const Admin = mongoose.model('Admin',AdminSchema);
const User = mongoose.model('User',UserSchema);
const Course = mongoose.model('Course',CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}