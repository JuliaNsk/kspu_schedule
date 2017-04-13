var mongoose = require( 'mongoose' );

var groupsSchema = new mongoose.Schema({
    number: {
        type: 'number',
        unique: true,
        required: true
    },
    specialization: {
        type: 'string'
    }

});


mongoose.model('Groups', groupsSchema);
