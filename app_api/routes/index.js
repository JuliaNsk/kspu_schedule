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
var ctrlOrganizations = require('../controllers/organizations');
var ctrlTeachers = require('../controllers/teachers');

router.get('/profile', auth, ctrlProfile.profileRead);

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

router.post('/add-schedule', ctrlSchedule.schedule);

router.post('/subjects', ctrlSubjects.create);
router.get('/subjects', ctrlSubjects.get);
router.delete('/subjects/:id', ctrlSubjects.delete);
router.put('/subjects/:id', ctrlSubjects.update);

router.post('/groups', auth, ctrlGroups.create);
router.get('/groups', auth, ctrlGroups.get);
router.delete('/groups/:id', auth, ctrlGroups.delete);
router.put('/groups/:id', auth, ctrlGroups.update);

router.post('/organizations', auth, ctrlOrganizations.create);
router.get('/organizations', auth, ctrlOrganizations.get);
router.delete('/organizations/:id', auth, ctrlOrganizations.delete);
router.put('/organizations/:id', auth, ctrlOrganizations.update);

router.post('/teachers', auth, ctrlTeachers.create);
router.get('/teachers', auth, ctrlTeachers.get);
router.delete('/teachers/:id', auth, ctrlTeachers.delete);
router.put('/teachers/:id', auth, ctrlTeachers.update);


module.exports = router;
