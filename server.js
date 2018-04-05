const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { match, pages } = require('./lib/routing');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const { pathname, query } = parse(req.url, true);
    const { page, ...params } = match(pathname);

    if (!pages.includes(page)) {
      handle(req, res);
      return;
    }

    app.render(req, res, `/${page}`, Object.assign(params, query));
  }).listen(port, err => {
    if (err) {
      throw err;
    }

    // eslint-disable-next-line no-console
    console.log(`> Ready on http://localhost:${port}`);
  });
});
