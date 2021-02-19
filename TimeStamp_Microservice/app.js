const express = require('express');
const cors = require('cors');
const app = express();

// Middlewares
app.use(express.static('public'));
app.use(cors());

// [+] Routes [+]

// Root route
app.get('', (req, res) => {
	res.render('index.html');
})

// /api/time/:date
app.get('/api/timestamp/:date', (req, res) => {
	// Grab the date from the URL
	let date = req.params.date;
	// create an empty response object
	const responseObj = new Object();

	if (date.includes('-')) {
		responseObj.unix = new Date(date).getTime();
		responseObj.utc = new Date(date).toUTCString();
		// Send the responseObject in the response
		res.send(responseObj);
	} else {
		date = parseInt(date);
		responseObj.unix = new Date(date).getTime();
		responseObj.utc = new Date(date).toUTCString();
		// Send the responseObject in the response
		res.send(responseObj);
	}
})

// /api/timestamp
app.get('/api/timestamp', (req, res) => {
	const response = {
		unix: new Date().getTime(),
		utc: new Date().toUTCString()
	}

	res.send(response);
})

app.listen(3000, () => {
	console.log("Listening on port 3000");
})