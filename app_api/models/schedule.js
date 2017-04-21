var mongoose = require( 'mongoose' );

var scheduleSchema = new mongoose.Schema({

    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organizations'
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Groups'
    },
    year: {
        type: Number
    },
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: []
})



mongoose.model('Schedule', scheduleSchema);
