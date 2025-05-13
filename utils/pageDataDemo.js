"use strict"

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

module.exports = pageData
