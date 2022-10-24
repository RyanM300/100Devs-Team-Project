require('../database/connectDB')
const Exercise = require("../models/Exercise");

module.exports = {
//Get homepage
getExercise : async(req, res) => {
    try {
        const limitNumber = 1
        let latest = await Exercise.find({}).sort({_id: -1}).limit(limitNumber)

        const embedVideoUrl = latest[0].videoURL.replace("watch?v=", "embed/");
        latest[0].videoURL = embedVideoUrl;

        res.render('index', {title: "Remind Exercise - Home", latest })
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: error.message})
    }
},

getFavorite : async(req, res) => {
    try {
        // const limitNumber = 1
        // let latest = await Exercise.find({}).sort({_id: -1}).limit(limitNumber)

        // const embedVideoUrl = latest[0].videoURL.replace("watch?v=", "embed/");

        // latest[0].videoURL = embedVideoUrl;

        res.render('favorite', {title: "Remind Exercise - Favorite", isFavorite: )
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: error.message})
    }
}

markUnfavorite: async (req, res)=>{
    try{
        await Exercise.findByIdAndUpdate({_id:req.body.todoIdFromJSFile},{
            isFavorite: false, 
        })
        res.render('index', {isFavorite : false})
        console.log('Marked Unfavorite')
        res.json('Marked UnFfavorite')
    }catch(err){
        console.log(err)
    }
},


}

