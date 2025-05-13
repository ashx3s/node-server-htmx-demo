"use strict";
const fsPromise = require("node:fs").promises;
const path = require("node:path");
const http = require("node:http");

async function checkFileAndHandleErrors (filePath, res) {
	if (!filePath) {
		console.error("No filepath passed to checkFileAndHandleErrors")
		return false;
	}
	try {
		await fsPromise.access(filePath, fsPromise.constants.F_OK);
		return true;
	}
	catch(error) {
		if (error.code === 'ENOENT') {
			console.error(`file not found: ${filePath}`);
		} else {
			console.error(`${filePath} not found or not accessible:`, error);
		}
		if (res && !res.headersSent) {
			res.writeHead(404, { "Content-Type": "text/html" });
			res.end(`<h1>404: Not Found</h1><p>The file ${path.basename(filePath)} is missing or inaccessible.</p>`);

		} else if (res && res.headersSent) {
			console.error(`Headers sent for ${filePath}, cannot send 404`);
		} else if (!res) {
			console.error("response object not provided to checkFileAndHandleErrors");
		}
		return false;
	}
}
module.exports = checkFileAndHandleErrors
