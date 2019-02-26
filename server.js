const { createServer } = require('http');
const next = require('next');
const { playlistsMatch } = require('./lib/routing');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() =>
  createServer((req, res) => {
    const { pathname, searchParams } = new URL(
      req.url,
      `http://localhost:${port}`,
    );
    const playlistsParams = playlistsMatch(pathname);

    if (playlistsParams) {
      app.render(req, res, '/pages', { ...playlistsParams, ...searchParams });
    } else {
      handle(req, res);
    }
  }).listen(port, err => {
    if (err) throw err;

    // eslint-disable-next-line no-console
    console.log(`> Ready on http://localhost:${port}`);
  }),
);
