// server.js

var express 	= require('express');
var app			= express();
var bodyParser	= require('body-parser');
var mongoose	= require('mongoose');
var Post		= require('./app/models/post');

// URI of db
mongoose.connect('mongodb://test:test@ds061228.mongolab.com:61228/test-api');

app.use(bodyParser());

var port = process.env.PORT || 8080;

var router = express.Router();

// middleware
router.use(function(req, res, next) {
	// logging
	console.log('Something is happening.');
	next(); // go to next routes
});

// test route
router.get('/', function(req,res) {
	res.json({ message: 'Welcome to api.'});
});

// Post routes
router.route('/posts')

	// create a post
	.post(function(req, res) {

		var post = new Post();
		post.title = req.body.title;
		post.body = req.body.body;

		post.save(function(err) {
			if(err)
				res.send(err);

			res.json({message: 'Post created.'});
		});
	})

	// get all posts
	.get(function(req, res) {
		Post.find(function(err, posts) {
			if(err)
				res.send(err);

			res.json(posts);
		});
	});

router.route('/posts/:post_id')

	.get(function(req, res) {
		Post.findById(req.params.post_id, function(err, post) {
			if(err)
				res.send(err);

			res.json(post);
		});
	})

	.put(function(req, res) {

		// find post
		Post.findById(req.params.post_id, function(err, post) {

			if(err)
				res.send(err);
		
			// update name
			post.title = req.body.title;
			post.body = req.body.body;

			// save the post
			post.save(function(err) {
				if(err)
					res.send(err);

				res.json({ message: 'Post updated.'})
			});
		});
	})

	.delete(function(req, res) {
		Post.remove({
			_id: req.params.post_id
		}, function(err, post) {
			if(err)
				res.send(err);

			res.json({message: 'Deleted post with id: '+req.params.post_id});
		});
	});

// register routes
app.use('/api', router);


// start server
app.listen(port);
console.log('listening on port: ' + port);
