var mongoose = require('mongoose');
var Subjects = mongoose.model('Subjects');

module.exports.create = function(req, res) {

    var subjects = new Subjects(req.body);


    subjects.save(function(err) {
        res.json({
            "name" : req.body.name
        });
    });

};

module.exports.get = function(req, res) {
    Subjects
        .find({})
        .populate('teachers')
        .exec(function(err, subj) {
            res.status(200).json(subj);
        });
};
