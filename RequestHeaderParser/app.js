const express = require('express');
const cors = require('cors');
const app = express();


// Middlewares
app.use(cors());
app.use(express.static("public"));

app.enable('trust proxy') 
app.get("", (req, res) => {
	res.render("index.html");
})

app.get("/api/whoami", (req, res) => {
    const respObj = {
        ipaddress: req.ip,
        language: req.headers['accept-language'],
        software: req.headers['user-agent']
    }

    res.json(respObj);
})

app.listen(3000, () => {
	console.log("Listening on port 3000");
})