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
    teachers: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});


mongoose.model('Subjects', subjectsSchema);
