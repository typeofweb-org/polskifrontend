// server.js
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

require('dotenv').config();
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const port = process.env.PORT || 3000
  return createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true)
    return handle(req, res, parsedUrl)
  }).listen(port, (err) => {
    if (err) {
      throw err;
    }
    console.log(`> Ready on http://www.polskifrontend.localhost:3000/`);
  })
})
