"use strict";
const fs = require("node:fs");
const path = require("node:path");

const checkFileAndHandleErrors = require("./checkFileAndHandleErrors");

function sendResponse (res, statusCode, contentType, body) {
	if (res.headersSent) {
		console.warn("[ResponseHandler]: Headers already sent")
		if (!res.writableEnded) {
			res.end();
		}
		return;
	}
	res.writeHead(statusCode, {"Content-Type": contentType})
	res.end(body);
}

function sendHtml(res, htmlContent, statusCode = 200) {
	sendResponse(res, statusCode, "text/html", htmlContent);
}

async function sendHtmlFile(res, file, statusCode = 200) {
	const filePath = path.join(__dirname, "../", file);

	const isFileAccessible = await checkFileAndHandleErrors(filePath, res)
	if (isFileAccessible) {

		res.writeHead(200, { "Content-Type": "text/html" });
		const readableStream = fs.createReadStream(filePath);

		readableStream.on('error', (streamError) => {
			console.error("Stream Error:", streamError);

			if (!res.headersSent) {
				res.writeHead(500, { "Content-Type": "text/plain" });
			}
			if (!res.writableEnded) {
				res.end("Server Error during file stream.");
			}
		});
		readableStream.pipe(res);
	}

}

function sendJson(res, jsonContent, statusCode = 200) {
	try {
		const jsonString = JSON.stringify(jsonContent);
		sendResponse(res, statusCode, "application/json", jsonString)
	} catch (error) {
		console.error("[Response Handler Error]: Error stringifying Json Data", error);
		handleServerError(res, error, "Error processing JSON data");
	}
}

function sendText(res, textContent, statusCode = 200) {
	sendResponse(res, statusCode, "text/plain", textContent);
}

function handleNotFound(res, resourceName = "Page") {
	const body = `
		<header>
			<h1>404: Not Found</h1>
			<p>The ${resourceName,toLowerCase()} cannot be found.</p>
		</header>
	`
	sendHtml(body)
}

function handleServerError(res, err, message = "Internal Server Error") {
	console.error(`[ResponseHandler]: Server Error: ${message}`, err.stack || err)
	const body = `
		<header>
			<h1>500: ${message}</h1>
			<p>We encountered an unexpected issue. Pleased try again.</p>
		</header>
	`
	if (!res.headersSent) {
		sendHtml(res, body, 500)
	} else if (!res.writableEnded) {
		res.end();
	}
}

module.exports =  { 
	sendResponse, 
	sendText, 
	sendHtml, 
	sendHtmlFile,
	sendJson, 
	handleNotFound, 
	handleServerError 
}
