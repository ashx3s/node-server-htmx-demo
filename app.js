"use strict";

const http = require("node:http");
const fs = require("node:fs");
const fsPromise = require("node:fs/promises");
const path = require("node:path");

const checkFileAndHandleErrors = require("./utils/checkFileAndHandleErrors");

const pageData = (route) => {
	return `
<!DOCTYPE html>
<html lang="en">
<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Page for ${route}</title>
</head>
<body>
		<main>
				<h1>Hello World</h1>
				<p>The route is ${route}</p>
		</main>
</body>
</html>
`;
};




const server = http.createServer(async (req, res) => {
	const url = req.url;
	const method = req.method;
	console.log(`Request: ${method} ${url}`);

	if (url === "/" && method === "GET") {
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
		res.writeHead(200, { "Content-Type": "text/html" });
		res.write(pageData(url));
		res.end();
	} else {
		res.writeHead(404, { "Content-Type": "text/html" });
		res.end("<h1>404 Page Not Found</h1><p>Sorry, the page you are looking for does not exist.</p>");
	}
});

server.listen(8000, () => {
	console.log(`Listening on http://localhost:8000`);
})
