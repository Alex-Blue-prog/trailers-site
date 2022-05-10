const router = require("express").Router();
const Anime = require("../models/Anime");
const User = require("../models/User");
const {verifyTokenAndAdmin, verifyToken} = require("./verifyToken");
const multer = require('multer');
const multerConfig = require('../config/multer');
const aws = require('aws-sdk');

//SEARCH ANIME ROUTE
router.post("/search", async (req,res) => {

    try{
        Anime.find({
            name: {$regex: new RegExp(req.body.text), $options: "$i"}
        }, {
            __v: 0
        }, function(err, data) {

            if(data) {
                res.json(data);
            } else {
                res.json(false);
            }
            
        }).limit(10);

    } catch(err) {
        res.status(200).json(err);
    }

});


//CREATE ANIME MAIN INFO
router.post("/create", verifyTokenAndAdmin, async (req,res) => {

    console.log("running...");


    const newAnime = new Anime(req.body);

    try{
        const savedAnime = await newAnime.save();
        res.status(201).json(savedAnime);
    } catch(err){
        res.status(500).json(err);
    }


});

//GET ALL ANIMES
router.get("/all", async (req,res) => {

    const limit = req.query.limit;
    const newAnimes = req.query.newAnimes;
    const populares = req.query.populares;

    try{
        let getAnimes;

        if(limit) {
            getAnimes = await Anime.find().sort({_id: -1}).limit(8);

        } else if(newAnimes) {
            getAnimes = await Anime.find().sort({_id: -1}).limit(40);

        } else if(populares) {
            getAnimes = await Anime.find().sort({rate: -1}).limit(40)

        } else {
            getAnimes = await Anime.find();
        }

        

        res.status(200).json(getAnimes);
    } catch(err){
        res.status(500).json(err);
    }
});

//GET AN ANIME
router.get("/:id", async (req,res) => {
    try{
        const getOneAnime = await Anime.findOne({_id: req.params.id});

        res.status(200).json(getOneAnime);
    }catch(err){
        res.status(500).json(err);
    }
});

//DELETE ANIME COMPLETELY
router.delete("/:id", verifyTokenAndAdmin, async (req,res) => {
    try{
        if(!req.user.topAdmin) return res.status(403).json("sorry baby !");

        const getOneAnime = await Anime.findOneAndDelete({_id: req.params.id});



        //test code
        const s3 = new aws.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRECT_ACCESS_KEY,
            region: process.env.AWS_DEFAULT_REGION
        });

        

        getOneAnime.episodes.forEach(getAnimeEp => {
            if (process.env.STORAGE_TYPE === 's3' && getAnimeEp.key) {
                s3.deleteObject({
                    Bucket: `uploadexample2`,
                    Key: getAnimeEp.key
                }).promise(console.log('storage deleted'));
            } 
        });
        //test code
        console.log("deleting the anime");

        res.status(200).json("Anime deleted: " + getOneAnime.name);
    }catch(err){
        res.status(500).json(err);
    }
});

//INCREASE ANIME RATE IF VISETED
router.put("/rate/:id", async(req,res)=> {
    try {
        const increaseRate = await Anime.findOneAndUpdate({_id: req.params.id}, {$inc: {rate: 1}}, {new: true});

        res.status(200).json(increaseRate);
    } catch (error) {
        res.status(500).json(error);
    }
});


//UPDATE ANIME MAIN INFO OR ADD NEW ANIME EP
router.put("/:id", verifyTokenAndAdmin, multer(multerConfig).single('file'), async (req,res)=> {

    //  const {location: video = req.body.video, key = ""} = req.file;
    let anime; 

    try{
        //push new episode to array
        
        if(req.body.documents) {
            
            anime = JSON.parse(req.body.documents);
            let updateAnime = await Anime.findOneAndUpdate(
                {_id: req.params.id}, 
                // {$push : {episodes: req.body.newEp} },
                {$push : {episodes: req.file ? {...anime, video: req.file.location, key: req.file.key} : anime} },
                {new: true}
            );
            console.log('novo episodio adicionado');
            res.status(200).json(updateAnime);
        } else {
            
            if(!req.user.topAdmin) return res.status(403).json("sorry baby !");

            //update anime main info
            const updateAnime = await Anime.updateOne(
                {_id: req.params.id}, 
                {$set : req.body }
            );

   

            res.status(200).json(updateAnime);
            
        }

        
    }catch(err){
        res.status(500).json(err);
    }
});



//UPDATE ANIME EP INFO
//OBS: THE EP ID CHANGES WHEN GETS UPDATED. I DO NOT KNOW ANY MORE
router.put("/ep/:epId", verifyTokenAndAdmin, multer(multerConfig).single('file'), async(req,res) => {

    if(!req.user.topAdmin) return res.status(403).json("sorry baby !");

    let anime = JSON.parse(req.body.documents);


    try{
        const getAnime = await Anime.findOne({episodes:{$elemMatch:{_id: req.params.epId}}});
        
        const getAnimeEp = getAnime.episodes.find(value => {
            if(value._id == req.params.epId){
                return true;
            }
        });

        //if new video uploaded delete the previous video from aws3
        if(req.file) {
            const s3 = new aws.S3({
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRECT_ACCESS_KEY,
                region: process.env.AWS_DEFAULT_REGION
            });

            

            if (process.env.STORAGE_TYPE === 's3' && getAnimeEp.key) {
                s3.deleteObject({
                    Bucket: `uploadexample2`,
                    Key: getAnimeEp.key
                }).promise();
            } 
        }

        //update ep info or ep info and video
        Anime.findOneAndUpdate({episodes:{$elemMatch:{_id: req.params.epId}}}, {$set: {"episodes.$": req.file ? {...anime, video: req.file.location, key: req.file.key} : anime}}, {new: true})
        .then((value) => {
            console.log('novo video adicionado');

            res.status(200).json(value);
        })

        
    } catch(err){
        res.status(500).json(err);
    }
});

//DELETE ANIME EP
router.delete("/ep/:epId", verifyTokenAndAdmin, async(req,res) => {
    
    if(!req.user.topAdmin) return res.status(403).json("sorry baby !");

    const s3 = new aws.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRECT_ACCESS_KEY,
        region: process.env.AWS_DEFAULT_REGION
    });

    try{
        
        const getAnime = await Anime.findOne({episodes:{$elemMatch:{_id: req.params.epId}}});
        
        const getAnimeEp = getAnime.episodes.find(value => {
            if(value._id == req.params.epId){
                return true;
            }
        });
        

        const updateEp = await Anime.updateOne({episodes:{$elemMatch:{_id: req.params.epId}}}, {$pull:{episodes:{_id: req.params.epId}}});

        if (process.env.STORAGE_TYPE === 's3' && getAnimeEp.key) {
            return s3.deleteObject({
                Bucket: `uploadexample2`,
                Key: getAnimeEp.key
            }).promise().then(response => {
                console.log('working...');
                res.status(200).json(updateEp);
            });
        } 
    

        res.status(200).json(updateEp);
    } catch(err){
        res.status(500).json(err);
    }
});

//GET AN SPECIF EP 
router.get("/ep/:epId", async(req,res)=> {
    try{
        const getAnimeEp = await Anime.findOne({episodes:{$elemMatch:{_id: req.params.epId}}});

        const takeEp = getAnimeEp.episodes.find(value => value._id == req.params.epId);

        const takeEp2 = getAnimeEp.episodes.find(value => value.ep == takeEp.ep + 1);
        
        res.status(200).json({name: getAnimeEp.name, takeEp, takeEp2});

    } catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;