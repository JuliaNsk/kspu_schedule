var mongoose = require( 'mongoose' );

var groupsSchema = new mongoose.Schema({
    number: {
        type: 'number',
        unique: true,
        required: true
    },
    specialization: {
        type: 'string'
    },
    faculty: {
        type: 'string'
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organizations'
    }
});


mongoose.model('Groups', groupsSchema);
