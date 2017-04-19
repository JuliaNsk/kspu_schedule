var mongoose = require('mongoose');
var Schedule = mongoose.model('Schedule');


module.exports.create = function(req, res) {

    var schedule = new Schedule(req.body);


    schedule.save(function(err) {
        res.json({
            "name" : req.body.name
        });
    });

};

module.exports.get = function(req, res) {
    Schedule
        .find({})
        .populate('organization')
        .exec(function(err, subj) {
            res.status(200).json(subj);
        });
};

module.exports.delete = function(req, res) {
    Schedule
        .deleteOne({_id: req.params.id})
        .exec(function (err, subj) {
            res.status(200).json(subj);
        });
};

module.exports.update = function(req, res) {
    Schedule
        .updateOne({_id: req.params.id}, req.body)
        .exec(function (err, subj) {
            res.status(200).json(subj);
        });
};
