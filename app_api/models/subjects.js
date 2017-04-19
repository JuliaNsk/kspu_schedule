var mongoose = require( 'mongoose' );

var subjectsSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    hours: {
        type: Number
    },
    credits: {
        type: Number
    },
    labs: {
        type: Number
    },
    lecture: {
        type: Number
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organizations'
    }
});


mongoose.model('Subjects', subjectsSchema);
