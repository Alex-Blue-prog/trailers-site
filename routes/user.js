const router = require("express").Router();
const User = require("../models/User");
const Anime = require("../models/Anime");
const {verifyToken} = require("./verifyToken");

//change favorites trailers of an user
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

//get all user favorites 
router.get("/favorites", verifyToken, async (req, res) => {
    try {
        const user = await User.findOne({_id: req.user.id});

        const {favorites} = user;

        const trailers = await Anime.find();

        const getFavorites = trailers.filter(value => {
            return favorites.includes(value._id);

        });


        res.status(200).json(getFavorites);

    } catch (error) {
        res.status(500).json(error);
    }
});



module.exports = router;