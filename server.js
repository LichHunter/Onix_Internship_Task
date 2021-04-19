'use strict'
console.log('server is starting');

let express = require('express');
let app = express();
let server = app.listen(3000, listening);

function listening() {
	console.log('listening...');
}

app.use(express.static('website'))

let request = require('request');
let fs = require('fs');
let https = require('https');
const sendGetRequest = function () {
	const apiKey = 'MZeFSXlrHBVGA5U53AdxCchasHaTkIk3';
	const word = 'cheeseburgers';
	const uri = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${word}`;
	
	request(uri, (error, response, body) => {
		if (!error && response.statusCode === 200) {
			let gifs = [];
			const objects = JSON.parse(body);
			
			for (const object of objects.data) {
				const gif = {
					id: object.id,
					url: object.images.original.url,
					rating: object.rating,
				}
				
				gifs.push(gif);
			}
			
			gifs.sort((a, b) =>
				a.rating < b.rating ? -1 : a.rating > b.rating ? 1 : 0);
			
			const firstTen = gifs.slice(0, 10);
			let counter = 1;
			for (const gif of firstTen) {
				const file = fs.createWriteStream(`website/gifs/${counter}.gif`);
				const request = https.get(gif.url, function (response) {
					response.pipe(file);
				})
				
				counter++;
			}
			
			console.log('Done');
		}
	});
}
sendGetRequest();