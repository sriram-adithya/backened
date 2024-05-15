const { Router } = require("express");
const router = Router();
const { User, Course } = require("../db");
const userMiddleware = require("../middleware/user");
const { use } = require("./admin");


router.post('/signup',async function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await User.findOne({username:username});

    if(existingUser){
        res.status(403).json({
            msg:"User Already exist"
        })
    }

    await User.create({
        username:username,
        password:password
    })

    res.json({
        msg:"User created successfully"
    })

})

router.get('/courses',userMiddleware, async function(req,res){
const response = await User.find({});

res.json({
    courses: response
})
})

router.post("/courses/:courseId",userMiddleware, async function(req,res){
    const courseId = req.params.courseId;

    const username = req.headers.username;
//getting username from headers as we are defing middleware in a function it will fetch from there
    try{
        await User.updateOne({
            username: username
        },{
            "$push":{
                purchasedCourse : courseId
            }
        })
    }catch(e){
        console.log(e);
    }

    res.json({
        msg:"Purchase completed"
    })
})

router.get("/purchasedCourses",userMiddleware,async function(req,res){
    const user = await User.findOne({
        username : req.headers.username
    })

    const courses = await Course.findOne({
        _id:{
            "$in":user.purchasedCourse
        }
    })
    res.json({
        courses:courses
    })
})

module.exports = router;