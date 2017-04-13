var mongoose = require('mongoose');
var Groups = mongoose.model('Groups');

module.exports.create = function(req, res) {
    var groups = new Groups();
    groups.save(function(err) {
        res.json({
            "name" : req.body.name
        });
    });

};
