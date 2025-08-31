const http = require('http');

const PORT = 3000;

// Reusable HTML template function with inline CSS
const renderPage = (title, heading, content) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      padding: 40px;
      color: #333;
    }
    h1 {
      color: #4CAF50;
    }
    nav a {
      margin-right: 20px;
      text-decoration: none;
      color: #007BFF;
    }
    nav a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <nav>
    <a href="/home">Home</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
  </nav>
  <h1>${heading}</h1>
  <p>${content}</p>
</body>
</html>
`;

// Create server
const server = http.createServer((req, res) => {
  const { url, method } = req;

  if (method !== 'GET') {
    res.writeHead(405, { 'Content-Type': 'text/html' });
    res.end(renderPage('405', '405 - Method Not Allowed', 'Only GET requests are supported.'));
    return;
  }

  let html = '';
  let statusCode = 200;

  switch (url.toLowerCase()) {
    case '/':
    case '/home':
      html = renderPage('Home', 'Welcome to the Home Page', 'This is the home route.');
      break;
    case '/about':
      html = renderPage('About', 'About Us', 'This page tells you more about us.');
      break;
    case '/contact':
      html = renderPage('Contact', 'Contact Us', 'Feel free to reach out to us.');
      break;
    default:
      statusCode = 404;
      html = renderPage('404', '404 - Page Not Found', `The page "${url}" does not exist.`);
      break;
  }

  res.writeHead(statusCode, { 'Content-Type': 'text/html' });
  res.end(html);
});

// Start server
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
