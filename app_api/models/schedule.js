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
    monday: {
        teacher: {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'Teachers'
        },
        subject: {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'Subjects'
        }
    },
    tuesday: {
        teacher: {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'Teachers'
        },
        subject: {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'Subjects'
        }
    },
    wednesday: {
        teacher: {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'Teachers'
        },
        subject: {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'Subjects'
        }
    },
    thursday: {
        teacher: {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'Teachers'
        },
        subject: {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'Subjects'
        }
    },
    friday: {
        teacher: {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'Teachers'
        },
        subject: {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'Subjects'
        }
    }

});


mongoose.model('Schedule', scheduleSchema);
