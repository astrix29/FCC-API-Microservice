const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const shortUrlSchema = new mongoose.Schema({
	original_url: {
		type: String, 
		required: true
	},
	short_url: {
		type: String, 
		required: true,
		default: nanoid(5)
	}
})

module.exports = mongoose.model('ShortUrl', shortUrlSchema);