const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

router.post("/register", async (req,res) => {


    //create new user
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    });



    try{
        // const UserTotal = await User.find();
        // if(UserTotal.length >= 5) return;

        //sabe user to the database
        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    }catch(err){
        res.status(500).json(err);
    }
})

router.post("/login", async (req,res) => {
 
    try{
        const user = await User.findOne({username: req.body.username});

        //check if the user exists
        !user && res.status(401).json("Dados inválidos zé");

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
        const Originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        Originalpassword !== req.body.password && res.status(401).json("Dados inválidos");

        //create the user access token with the user´s id
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT_SEC,
        
        );

        const {password, ...others} = user._doc;

        res.status(200).json({...others, accessToken});

    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;