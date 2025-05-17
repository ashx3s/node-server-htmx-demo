"use strict";

const http = require("node:http");
const fs = require("node:fs");
const fsPromise = require("node:fs/promises");
const path = require("node:path");

const checkFileAndHandleErrors = require("./utils/checkFileAndHandleErrors");
const { sendText, sendHtml, sendHtmlFile, sendJson, handleNotFound, handleServerError } = require("./utils/responseHandlers");
const  { logRequestStreamData, logDataParsedWithSearchParams, logDataParsedWithQueryString } = require("./utils/logRequests")
const pageData = require("./utils/pageDataDemo");


const server = http.createServer(async (req, res) => {
	const url = req.url;
	const method = req.method;

	console.log(`Request: ${method} ${url}`);

	if (url === "/" && method === "GET") {
		sendHtmlFile(res, "index.html")
	} else if (url === "/request" && (method === "POST" || method === "PUT")) {
		requestHandler(req, res, url, 200, "text/plain")
	} else if (url === "/about" && method === "GET") {
		sendHtml(res, pageData(url), 200)
	} else if (url === "/contact" && method === "GET") {
		sendHtmlFile(res, "contact.html");
	} else if (url === "/contact" && method === "POST") { 
		//logRequestStreamData(req, res);	
		//logDataParsedWithSearchParams(req, res,["name", "subject", "message"] );
		logDataParsedWithQueryString(req, res);
		} else {
		handleNotFound(res, "Requested Page")
	}
})
server.listen(8000, () => {
	console.log(`Listening on http://localhost:8000`);
})
