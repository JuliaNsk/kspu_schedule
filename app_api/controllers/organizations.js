var mongoose = require('mongoose');
var Organizations = mongoose.model('Organizations');

module.exports.create = function(req, res) {

    var organizations = new Organizations(req.body);


    organizations.save(function(err) {
        res.json({
            "name" : req.body.name
        });
    });

};

module.exports.get = function(req, res) {
        Organizations
            .find({})
            .exec(function (err, subj) {
                res.status(200).json(subj);
            });
};

module.exports.delete = function(req, res) {
    Organizations
        .deleteOne({_id: req.params.id})
        .exec(function (err, subj) {
            res.status(200).json(subj);
        });
};

module.exports.update = function(req, res) {
    Organizations
        .updateOne({_id: req.params.id}, req.body)
        .exec(function (err, subj) {
            res.status(200).json(subj);
        });
};
