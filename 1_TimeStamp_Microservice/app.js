const express = require('express');
const cors = require('cors');
const app = express();

// Middlewares
app.use(express.static('public'));
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204


// [+] Routes [+]

// Root route
app.get('', (req, res) => {
	res.render('index.html');
})

// /api/time/:date
app.get('/api/timestamp/:date', (req, res) => {
	// Grab the date from the URL
	let date = req.params.date;

	if (date.includes(" ")) {
		date = date.split(" ").join("-");
	}

	// create an empty response object
	const responseObj = new Object();

	const unix = date.includes('-') ? new Date(date).getTime() : new Date(parseInt(date)).getTime();
	const utc = date.includes('-') ? new Date(date).toUTCString() : new Date(parseInt(date)).toUTCString();

	if (unix && utc) {
		res.json({ unix, utc });
	} else {
		res.json({ error: "Invalid Date" });
	}
})

// /api/timestamp
app.get('/api/timestamp', (req, res) => {
	const response = {
		unix: new Date().getTime(),
		utc: new Date().toUTCString()
	}

	res.json(response);
})

app.listen(3000, () => {
	console.log("Listening on port 3000");
})