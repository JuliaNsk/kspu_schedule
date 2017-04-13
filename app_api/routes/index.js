var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
var ctrlSchedule = require('../controllers/schedule');
var ctrlSubjects = require('../controllers/subjects');
var ctrlGroups = require('../controllers/groups');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);


// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

router.post('/add-schedule', ctrlSchedule.schedule);

router.post('/subjects', ctrlSubjects.create);
router.get('/subjects', ctrlSubjects.get);

router.post('/groups', ctrlGroups.create);





module.exports = router;
