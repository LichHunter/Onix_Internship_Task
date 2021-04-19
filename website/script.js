'use strict'
const body = document.querySelector('body');
for (let i = 1; i <= 10; i++) {
	const html = `<img src="gifs/${i}.gif"><br>`
	body.insertAdjacentHTML('afterend', html);
}