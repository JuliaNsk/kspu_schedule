var mongoose = require( 'mongoose' );

var teachersSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    faculty: {
        type: String
    },
    specialization: {
        type: String
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organizations'
    }
});


mongoose.model('Teachers', teachersSchema);
