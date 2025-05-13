"use strict";

function requestHandler(req, res, url, statusCode = 200, contentType) {
	res.writeHead(statusCode, {"Content-Type": contentType});
	let body = '';
	req.on("data", chunk => {
		body += chunk.toString();
	})
	req.on("end", () => {
		console.log(`Received data for ${url}`, body)
		res.end("Received and rprocessed: " + body.toUpperCase())
	})
	req.on("error", (reqError) => {
		console.error("Requiest Stream Error: ", reqError)
		if (!res.headersSent) {
			res.writeHeada(500, {"Content-Type": "text/plain" })
		}
		if (!res.writableEnded) {
			res.end("Error processing Request Data")
		}
	})
}

module.exports = {
	requestHandler
}
