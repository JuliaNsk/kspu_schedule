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

router.post('/subjects', ctrlSubjects.create);
router.get('/subjects', ctrlSubjects.get);
router.delete('/subjects/:id', ctrlSubjects.delete);
router.put('/subjects/:id', ctrlSubjects.update);

router.post('/groups', ctrlGroups.create);
router.get('/groups',  ctrlGroups.get);
router.delete('/groups/:id',  ctrlGroups.delete);
router.put('/groups/:id', ctrlGroups.update);

router.post('/organizations',  ctrlOrganizations.create);
router.get('/organizations',  ctrlOrganizations.get);
router.delete('/organizations/:id',  ctrlOrganizations.delete);
router.put('/organizations/:id',  ctrlOrganizations.update);

router.post('/teachers',  ctrlTeachers.create);
router.get('/teachers',  ctrlTeachers.get);
router.delete('/teachers/:id',  ctrlTeachers.delete);
router.put('/teachers/:id',  ctrlTeachers.update);

router.post('/schedule',  ctrlSchedule.create);
router.get('/schedule',  ctrlSchedule.get);
router.get('/schedule/:id',  ctrlSchedule.getById);
router.delete('/schedule/:id',  ctrlSchedule.delete);
router.put('/schedule/:id',  ctrlSchedule.update);


module.exports = router;
