"use strict";

const http = require("node:http");
const fs = require("node:fs");
const fsPromise = require("node:fs/promises");
const path = require("node:path");

const checkFileAndHandleErrors = require("./utils/checkFileAndHandleErrors");
const { sendText, sendHtml, sendHtmlFile, sendJson, handleNotFound, handleServerError } = require("./utils/responseHandlers");
const { requestHandler } = require("./utils/requestHandlers");
const pageData = require("./utils/pageDataDemo");


const server = http.createServer(async (req, res) => {
	const url = req.url;
	const method = req.method;
	console.log(`Request: ${method} ${url}`);

	if (url === "/" && method === "GET") {
		sendHtmlFile(res, "index.html")
		/*
		const filePath = path.join(__dirname, "index.html");


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
		*/
	} else if (url === "/request" && (method === "POST" || method === "PUT")) {
		res.writeHead(200, { "Content-Type": "text/plain" });
		let body = '';
		req.on("data", chunk => {
			body += chunk.toString();
		});
		req.on("end", () => {
			console.log("Received data for /request:", body);
			res.end("Received and processed: " + body.toUpperCase());
		});
		req.on("error", (reqError) => {
			console.error("Request Stream Error:", reqError);
			if (!res.headersSent) {
				res.writeHead(500, { "Content-Type": "text/plain" });
			}
			if (!res.writableEnded) {
				res.end("Error processing request data.");
			}
		});
	} else if (url === "/about" && method === "GET") {
		sendHtml(res, pageData(url), 200)
	} else {
		handleNotFound(url)
	}
})
server.listen(8000, () => {
	console.log(`Listening on http://localhost:8000`);
})
