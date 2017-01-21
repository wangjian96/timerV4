//Wang Jian
//CSE270E
//2017 Jan 14
//Assignmnet10
var MongoClient = require('mongodb').MongoClient,
user = require('../models/user'),
timerInfo = require('../models/timer'),
passwordHash = require('password-hash');
module.exports = {
       index: function(req, res){
           //if there is session id, then render to timer page
           if(req.session.userid){
             //get format date
             var time = new Date();
             var dateFormat = require('dateformat')
             var now = dateFormat(time, 'yyyy-mm-dd h:MM:ss');
             //find the account that is same with userid in session
             user.findOne({username : req.session.userid},function(err, account){
                 
                 //if there is error then show the error
                 if(err){
                    console.log(err);
                 }
                 //if there is an account update the visits and access time, then save it
                 if(account){
                    account.visits = account.visits + 1;
                    account.lastAccess = now;
                    account.save(function(err){
                         //check whether there is save error
                         if(err){
                           console.log(err);
                         }
                    });
                    //create three instance for each timer
                    console.log('start create timer');
                    var timer0 = new timerInfo({username : req.session.userid, timerNum:0});
                    timer0.save(function(err){ if(err){console.log(err);}});
                    console.log('timer0 created');
                    var timer1 = new timerInfo({username : req.session.userid, timerNum:1});
                    timer1.save(function(err){ if(err){console.log(err);}});
                    console.log('timer1 created');
                    var timer2 = new timerInfo({username : req.session.userid, timerNum:2});
                    timer2.save(function(err){ if(err){console.log(err);}});
                    console.log('timer2 created');
                    res.render('timer', {username: req.session.userid, times : account.visits, date : account.lastAccess});
                 //if no such an account show fail infomation
                 }else{
                    console.log('failed');
                 }
                 
             });
           }else{
             //if no session id, direct to home page
             res.render('main');
           }
       },
       about: function(req, res) {
           res.render('about');
       },
       login: function(req, res) {
           res.render('login');
       },
       loginsubmit: function(req,res) {
         //store data
         data = req.body;
         //check if there is an account that has same username
         user.findOne({username : data.usr}, function(err, result){
             //check error
             if(err){
                console.log(err);
             }
             //if there is an account
             if(result){
                  //check whether the password is the same too
                  if(passwordHash.verify(data.pwd, result.password)){
                        //if the same, store username as session id
                        req.session.userid = data.usr;
                        //redirect to timer page
                        res.redirect('/');
                  }else{
                        
                        console.log('pwd mismatch');
                        //if not the same, set up error message and render to login page
                        var model = {'errormsg':"Invalid username or password"};
                        res.render('login',model);
                  }
             }else{
                //if there is no such an account show error message
                var model = {'errormsg':"Invalid username or password"};
                res.render('login',model);
                console.log('no such account')
             }
         });
       },
       logout: function(req, res) {
         //when user clicked log out clear session id and render index
         req.session.userid = '';
         res.redirect('/');
       },
       register: function(req, res) {
         res.render('register');
       },
       registersubmit: function(req, res) {
         //store data
         data = req.body;
         //check if all fields are filled out
         if(data.usr && data.pwd && data.pwd2 && data.email && data.pwd == data.pwd2) {
           //if true, set session id to username
           req.session.userid = data.usr;
           //check whether the username is already exists
           user.findOne({username : data.usr}, function(err, result){
             //check error
             if(err){
                console.log(err);
             }
             //if there is an account
             if(result){
                console.log('username exist');
                //set up error message and render register page
                var model = {'errormsg':"Invalid username or password"};
                res.render('register', model);
             }else{
                //hash the password
                var hashedPwd = passwordHash.generate(data.pwd);
                //store all the information to database
                var a = new user({username : data.usr, password : hashedPwd, email : data.email });
                //save the information
                a.save(function(err){
                  //check the error
                  if(err){
                     console.log(err);
                  }else{
                     console.log('successful save');
                  }
                });
                
                //redirect to timer page
               res.redirect('/');
             }
           });
         }else{
            console.log('input wrong');
            //if false, set up error message and render register page
            var model = {'errormsg':"Invalid username or password"};
            res.render('register', model);
         }
      }
};
