//Wang Jian
//CSE270E
//2017 Jan 14
//Assignment 10
var express = require('express'),
    router = express.Router(),
    home = require('../controllers/home'),
    image = require('../controllers/image'),
    api = require('../controllers/api'),
    timer = require('../models/timer'),
    student = require('../controllers/student');
module.exports = function(app) {
    router.get('/', home.index);
    router.get('/images/:image_id', image.index);
    router.get('/student', student.get);
    router.get('/about', home.about);
    router.get('/login', home.login);
    router.get('/register', home.register);
    router.get('/logout', home.logout);
    router.get('/api/v1/timer/:username/:timerNum', api.getTimer);
    router.put('/api/v1/timer/:username/:timerNum', api.putTimer);
    router.post('/register', home.registersubmit);
    router.post('/login', home.loginsubmit);
    router.post('/student', student.post);
    router.post('/images', image.create);
    router.post('/images/:image_id/like', image.like);
    router.post('/images/:image_id/comment', image.comment);
    app.use(router);
};

