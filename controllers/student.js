//global object called dataList
var dataList = {};
module.exports = {
    //when GET request is called
    get: function(req, res) {
       //initiate an array
       var data = [];
       //for loop to push all elements in object to array
       for (var i in dataList) {
           data.push(dataList[i]);
       }
       // check the length of array
       if(data.length == 0){
           // if length is zero means there are no data is submit
           //and return fails
           var response = {};
           response['status'] = 'fail';
           response['data'] = data;
           var message = JSON.stringify(response)
           res.send(message);
       }else{
          //if no, then send the array back in json
          var response = {};
          response['data'] = data;
          response['status'] = 'ok';
          var jsonResponse = JSON.stringify(response);
          res.send(jsonResponse);
       }
    },
    //POST request is called
    post: function(req, res) {
        //create a data object in clean template
        var time = new Date();
        var dateFormat = require('dateformat')
        var now = dateFormat(time, 'yyyy-mm-dd h:MM:ss');

        //store all the data uploaded in to data
        data = req.body;
        //get the remote ip address in clean template
        var ip = (req.headers['x-forwarded-for'] || '').split(',')[0] || req.connection.remoteAddress;
        if (ip.substr(0, 7) == "::ffff:") {
            ip = ip.substr(7);
        }

        //check whether uid is empty
        if(!data.uid){
          //if so, then return fails message
          var message = {"status":"fail","message":"No UID!"};
          res.send(JSON.stringify(message));
        }else{
          //if not, then return all the object including ip, time, and uid with ok status
          dataList['firstname'] = data.firstname;
          dataList['lastname'] = data.lastname;
          dataList['miamiuid'] = data.miamiuid;
          dataList['hometown'] = data.hometown;
          dataList['currentcity'] = data.currentcity;
          dataList['comment'] = data.comment;
          dataList['option1'] = data.option1;
          dataList['option2'] = data.option2;
          dataList['option3'] = data.option3;
          dataList['year'] = data.year;
          dataList['ip'] = ip;
          dataList['updateTime'] = now;
          dataList['uid'] = data.uid;
          var datatemp = {};
          datatemp['data'] = dataList;
          datatemp['status'] = 'ok';
          res.send(JSON.stringify(datatemp));
        }
    }
};
