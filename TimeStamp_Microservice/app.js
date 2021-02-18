const express = require("express");
const app = express();
const cors = require('cors');

// Middlewareap
app.use(express.static("public"));
app.use(cors());

app.get("/", (req, res) => {
	res.render("./index.html");
});

app.get("/api/timestamp/:date?", (req, res) => {
	const date = req.params.date;

	const utcFormat = date.includes("-")
		? new Date(date).toUTCString()
		: new Date(Number(date)).toUTCString();
	const unixFormat = !date.includes("-")
		? Number(date)
		: new Date(date).getTime();

	if (utcFormat && unixFormat) {
		res.json({ unix: unixFormat, utc: utcFormat });
	} else {
		res.json({ error: "Invalid Date" });
	}
});

app.get("/api/timestamp", (req, res) => {
	const utcFormat = new Date().toUTCString();
	const unixFormat = new Date().getTime();

	res.json({ unix: unixFormat, utc: utcFormat });
});

app.listen(3000, () => {
	console.log("Listening on port 3000");
});
