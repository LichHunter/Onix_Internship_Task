'use strict'
console.log('server is starting');

let express = require('express');
let app = express();
let server = app.listen(3000, listening);

function listening() {
	console.log('listening...');
}

app.use(express.static('website'))


