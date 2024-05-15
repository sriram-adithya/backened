const express = require("express");
const {Router} = require("express");
const { Admin, Course } = require("../db");
const adminMiddleware = require("../middleware/Admin");
const router = Router();


router.post('/signup',async function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await Admin.findOne({username:username});

    if(existingUser){
        res.status(403).json({
            msg:"Admin Already exist"
        })
    }

    await Admin.create({
        username : username,
        password : password
    })

    res.json({
        msg:"Admin created successfully"
    })

})


router.post("/courses",adminMiddleware,async function(req,res){
const title = req.body.title;
const description = req.body.description;
const price = req.body.price;
const imageLink = req.body.imageLink;

const newCourse = await Course.create({
    title,
    description,
    price,
    imageLink
})

res.json({
    msg:"Course Created successfully",courseId: newCourse._id
})
})


router.get("/courses",adminMiddleware,async function(req,res){
const response = await Course.find({})
res.json({
    courses : response
})
})

module.exports = router;