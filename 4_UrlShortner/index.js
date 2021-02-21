const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
// Import models
const ShortURL = require('./models/url.js');

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
	console.log(`Mongo: ${process.env.MONGO_URI}`)
	res.render("index.html");
	// res.render('index.html')
})

app.post("/api/shorturl/new", async (req, res) => {
	// Grab the original url param from req.body
	const originalUrl = req.body.original_url;
	console.log("URL requested: ", originalUrl);

	// insert the record using the mode
	const record = new ShortURL({
		original_url: originalUrl
	});
	await record.save();
	// console.log(record);
	res.json(record);
})

// Get a sepcific URL and redirect 
app.get('/api/shorturl/:shortid', async (req, res) => {
	// Grab the :shortid param
	const shortid = req.params.shortid;

	// query the mongoose database for the shortid
	const rec = await ShortURL.findOne({ short_url: shortid });

	if (!rec) return res.json({ error: 'invalid_url' });
	res.redirect(rec.original_url);
})

// Show all the URLS
app.get('/all', async (req, res) => {
	const allData = await ShortURL.find();
	res.json(allData);
})

// Setup your mongodb connection here
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

mongoose.connection.on('open', () => {
	// Wait for mongodb connection before server starts
	app.listen(3000, () => {
		console.log('Listening on port 3000!')
	});
})
