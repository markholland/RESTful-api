// app/models/post.js

var mongoose	= require('mongoose');
var Schema		= mongoose.Schema;

var PostSchema	= new Schema({
	name: String,
	body: String
});

module.exports = mongoose.model('Post', PostSchema);

