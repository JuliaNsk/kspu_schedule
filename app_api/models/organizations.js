var mongoose = require( 'mongoose' );

var organizationsSchema = new mongoose.Schema({
   name: {
       type: String
   }

});


mongoose.model('Organizations', organizationsSchema);
