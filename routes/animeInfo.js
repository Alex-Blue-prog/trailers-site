const router = require('express').Router();
const {verifyTokenAndAdmin} = require('./verifyToken');
const Anime = require('../models/Anime');

router.get("/animetotal", verifyTokenAndAdmin, async (req,res) => {
    try{
        const getAnimeTotal = await Anime.countDocuments();

        res.status(200).json(getAnimeTotal);
    } catch(err) {
      
        res.status(500).json(err);
    }
});

router.get("/mostpopular", verifyTokenAndAdmin, async (req,res) => {
    try{
        const getAnimes = await Anime.find();

        let mostPopular;
        
        getAnimes.forEach((value, index, array) => {
            if(index > 0) {
                if(value.rate > mostPopular.rate) {
                    mostPopular = value;
                } 
               
            } else {
                mostPopular = value;
            }
    
        });


        res.status(200).json(mostPopular);
    } catch(err) {
      
        res.status(500).json(err);
    }
});

router.get("/mostviews", verifyTokenAndAdmin, async (req,res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    const previousYear = new Date(new Date().setFullYear(lastYear.getFullYear() - 1));


    try{
        const getAnimes = await Anime.aggregate([
            {$match:{createdAt: {$gte: previousYear}}},
            {$project:{year: {$year:"$createdAt"}, view: "$rate"}},
            {$group:{_id:"$year", total:{$sum: "$view"}}}
        ]).sort({_id: 1});

        res.status(200).json(getAnimes);
    } catch(err) {
      
        res.status(500).json(err);
    }
});

router.get("/newmostviews", verifyTokenAndAdmin, async (req, res) => {

    try {

        const getNewFiveMostView = await Anime.find().sort({rate: -1}).limit(5);

        res.status(200).json(getNewFiveMostView);

    } catch(err) {
        res.status(500).json(err);
    }
});



module.exports = router;