const {Router} = require("express");
const jwt = require("jsonwebtoken");
const router = Router();
const userMiddleware = require("../middlewares/user");
const mongoose = require("mongoose");
const { User, Course } = require("../DB");
const { JWT_SECRET } = require("../config");

// User Routes
router.post('/signup',async (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;
    await User.create({
        username, 
        password
    })
    res.json({
        message: "User created successfully"
    })
});

router.post("/signin",async function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.find({
        username,
        password
    })

    if(user){
        const token  = jwt.sign({username},JWT_SECRET);
        res.json({
            msg:token
        })
    }else{
        res.status(411).json({
            msg:"Incorrect email and password"
        })
    }
})

router.get('/courses',userMiddleware,async function(req, res){
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;

    const newCourse = await Course.create({
        title,
        description,
        imageLink,
        price
    })

    res.json({
        message: 'Course created successfully', courseId: newCourse._id
    })
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
    const username = req.headers.username;
    console.log(username);

});

router.get('/purchasedCourses', userMiddleware,async (req, res) => {
    const user = await User.findOne({
        username : req.headers.username
    })

    console.log(user.purchasedCourse);

    const courses = await Course.find({
        _id:{
            "$in" : user.purchasedCourse
        }
    });

    res.json({
        courses:courses
    })
});

module.exports = router
