const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const Video = require("./../models/video")

const db = "mongodb+srv://studentusers:Polska1234@cluster0-gfj0l.mongodb.net/videoplayer1?retryWrites=true&w=majority"

mongoose.Promise = global.Promise;
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

mongoose.connect(db, function (err) {
  if (err) {
    console.error("Error", err);
  }
});


router.get("/videos", function (req, res) {
  Video.find({}).exec(function (err, videos){
    if(err){
      console.log("Error",err);
    }else{
      res.json(videos);
    }
  });
});
//module.exports = router;


router.get("/videos/:id", function (req, res) {
  Video.findById(req.params.id).exec(function (err, video){
    if(err){
      console.log("Error",err);
    }else{
      res.json(video);
    }
  });
});


router.post("/video", function (req, res) {
  console.log("Dodanie do bazy danych");
  var newVideo = new Video();
  newVideo.title = req.body.title;
  newVideo.url = req.body.url;
  newVideo.description = req.body.description;
  newVideo.save(function (err, insertedVideo) {
    if (err) {
    console.log("err", err);
    } else {
    res.json(insertedVideo);
    }
    });
});

router.put("/video/:id", function (req, res) {
  console.log("Update");
  Video.findByIdAndUpdate(
  req.params.id,
    {$set: {
      title: req.body.title,
      url: req.body.url,
      description: req.body.description,
    },
  },
  {
    new: true,
  },
  function (err, updatedVideo) {
    if (err) {
      res.send("Error", err);
    } else {
      res.json(updatedVideo);
    }
  }
  );
  });


  router.delete("/video/:id", function (req, res) {
    console.log("Delete");
    Video.findByIdAndRemove(req.params.id, function (err, deletedVideo) {
    if (err) {
    res.send("Error", err);
    } else {
    res.json(deletedVideo);
    }
    });
    });



module.exports = router;
