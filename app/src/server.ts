import * as express from 'express';

const app = express();
let server: any;
let port = 3000;

app.all('*', (req, res) => {
  res.send('Hello World!');
});

export function startServer(newPort: number = 3000) {
  port = newPort;
  server = app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

export function stopServer() {
  if (server) {
    server.close(() => {
      console.log('Server stopped');
    });
  }
}
