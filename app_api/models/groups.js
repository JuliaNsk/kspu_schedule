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
    department: {
        type: 'string'
    },
    monitor: {
        type: 'string'
    },
    curator: {
        type: 'string'
    }


});


mongoose.model('Groups', groupsSchema);
