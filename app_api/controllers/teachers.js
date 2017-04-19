var mongoose = require('mongoose');
var Teachers = mongoose.model('Teachers');

module.exports.create = function(req, res) {

    var teachers = new Teachers(req.body);

    teachers.save(function(err) {
        res.json({
            "name" : req.body.name
        });
    });

};

module.exports.get = function(req, res) {
    Teachers
        .find({})
        .populate('organization')
        .exec(function(err, subj) {
            res.status(200).json(subj);
        });
};

module.exports.delete = function(req, res) {
    Teachers
        .deleteOne({_id: req.params.id})
        .exec(function (err, subj) {
            res.status(200).json(subj);
        });
};

module.exports.update = function(req, res) {
    Teachers
        .updateOne({_id: req.params.id}, req.body)
        .exec(function (err, subj) {
            res.status(200).json(subj);
        });
};
