const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

router.post("/register", async (req,res) => {

    try{
        //check if user exists or not
        const checkUser = await User.findOne({username: req.body.username});
        if(checkUser) {
            res.json({userCreated: false, msg: "Usuário ja existe"});
            return;
        }

        //check if email exists or not
        const checkEmail = await User.findOne({email: req.body.email});
        if(checkEmail) {
            res.json({userCreated: false, msg: "Email ja existe"})
            return;
        }
        
        //create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
        });

        //save user to the database
        const savedUser = await newUser.save();

        res.status(201).json({userCreated: true, msg: "Usuário criado com sucesso"});
    }catch(err){
        res.status(500).json(err);
    }
})

router.post("/login", async (req,res) => {
 
    try{
        const user = await User.findOne({username: req.body.username});

        //check if the user exists
        // !user && res.status(200).json({ msg : "Usuário inválido" });
        if(!user) return res.status(200).json({msg : "Usuário inválido"});

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
        const Originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        // Originalpassword !== req.body.password && res.status(200).json({ msg : "Senha inválida"});
        if(Originalpassword !== req.body.password) return res.status(200).json({msg: "Senha inválida"});

        //create the user access token with the user´s id
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
            topAdmin: user.topAdmin
        }, process.env.JWT_SEC,
        
        );

        const {password, ...others} = user._doc;

        res.status(200).json({...others, accessToken});

    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;