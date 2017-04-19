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
        .populate('organization')
        .exec(function(err, subj) {
            res.status(200).json(subj);
        });
};

module.exports.delete = function(req, res) {
    Subjects
        .deleteOne({_id: req.params.id})
        .exec(function (err, subj) {
            res.status(200).json(subj);
        });
};

module.exports.update = function(req, res) {
    Subjects
        .updateOne({_id: req.params.id}, req.body)
        .exec(function (err, subj) {
            res.status(200).json(subj);
        });
};
