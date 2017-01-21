/*
Wang Jian
CSE270E
Assignment12
2017 Jan 19
*/
var MongoClient = require('mongodb').MongoClient,
timerInfo = require('../models/timer');
module.exports = {
    getTimer: function(req, res) {
       //store data from url
       var urlData = req.params;
       //find if there is match account
       timerInfo.find({username:urlData.username, timerNum:urlData.timerNum},function(err, result){
           //create response object
           var response = {};
           if(err){//if there is error, then put it in response
              response.error = err;
              console.log("get error: " + err);
           }else{//if not, put information from database to response
              if(result[0]){response.timer = result[0];}
              else {response.timer = "";}
              response.error = "";
           }
           //send response to client
           res.json(response);
       });
    },
    putTimer: function(req, res) {
        //store data from req and url
        data = req.body;
        urldata = req.params;
        //check client's username is the same as url username also the timerNum
        if(data.username == urldata.username && data.timerNum == urldata.timerNum){
           //if all the same, then find whether there is such an account
           timerInfo.findOne({username:urldata.username, timerNum:urldata.timerNum},function(err,result){
              //create response object
              var response = {};
              if(err){//if there is error, then put it in response
                 response.error = err;
                 console.log("post err : " + err);
              }else{//if not, put information from database to response
                 if(result){
                    //update information in database
                    result.timerName = data.timerName;
                    result.doneTime = data.doneTime;
                    result.state = data.state;
                    result.save(function(err){
                       console.log('saving...');
                       if(err){
                         console.log('failed saving');
                       }
                    });
                    response.msg = 'saved';
                 }else{
                    response.error='no such account';
                 }
              }
              //send to client
              res.json(response);
           });
        }else{
           //if username and timerNum is not matching with url infomation, then send error
           var response = {};
           response.error = "url username and timerNum is not match with data send";
           res.json(response);
        }
    }
};
