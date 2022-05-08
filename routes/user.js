const router = require("express").Router();
const User = require("../models/User");
const {verifyToken} = require("./verifyToken");

router.put("/favorites/:id", verifyToken, async (req,res) => {
    try{
        console.log(req.body.favorite);
        if(req.body.favorite == false) {
            //push to favorites 
            await User.findOneAndUpdate({_id: req.user.id}, {$push: {favorites: req.params.id}});
        } else {
            //pull from favorites
            await User.findOneAndUpdate({_id: req.user.id}, {$pull: {favorites: req.params.id}});
        }

        res.status(200).json("ok");
        
    }catch(err){
        res.status(500).json(err);
    }
});



module.exports = router;