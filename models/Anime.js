const mongoose = require("mongoose");

const AnimeSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            unique: true
        },
        desc: {
            type: String
        },
        img:{
            type: String,
        
        },
        categories:{
            type: Array
        },
        rate: {
            type: Number,
            default: 0
        },
        launch: {
            type: Number,
            default: new Date().getFullYear()
        },
        dub: {
            type: Boolean,
            default: true
        },
        temp: {
            type: Number,
            default: null
        },
        episodes: [
            {
                ep: {type: Number, default: 1},
                video:{type: String},
                key:{type: String, default: null}
            }
        ]

    },{timestamps: true});


module.exports = mongoose.model("Anime", AnimeSchema);