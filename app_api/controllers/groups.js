var mongoose = require('mongoose');
var Groups = mongoose.model('Groups');

module.exports.create = function(req, res) {

    var groups = new Groups(req.body);

    groups.save(function(err) {
        res.json({
            "name" : req.body.name
        });
    });

};

module.exports.get = function(req, res) {
    Groups
        .find({})
        .populate('organization')
        .exec(function(err, subj) {
            res.status(200).json(subj);
        });
};

module.exports.delete = function(req, res) {
    Groups
        .deleteOne({_id: req.params.id})
        .exec(function (err, subj) {
            res.status(200).json(subj);
        });
};

module.exports.update = function(req, res) {
    Groups
        .updateOne({_id: req.params.id}, req.body)
        .exec(function (err, subj) {
            res.status(200).json(subj);
        });
};
