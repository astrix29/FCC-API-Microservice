const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // save file into /uploads folder

app.use(express.static('public'));
app.use(cors());

app.get('/', (req, res) => {
	res.render('index.html');
});

// it is very crucial that the file name matches the name attribute in your html
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
	// Get the desired values from the file and store them in an object
	const respObj = {
		name: req.file.originalname,
		type: req.file.mimetype,
		size: req.file.size
	};
	console.log(req.file.filename);

	// Delete the file
	fs.unlink(`./uploads/${req.file.filename}`, (err) => {
		if (err) console.log(err.message);
		else console.log(`${req.file.filename} deleted succesfully!`);
	});

	// Send the response object 
	res.json(respObj);
})

app.listen(3000, () => {
	console.log("Listening on port 3000");
});