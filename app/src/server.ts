import * as express from 'express';
import {Express} from "express";

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

export class LocalServer {
  app: Express;
  server: any;
  constructor(private config: LocalServerConfig) {
    this.app = express();

    this.app.all('*', (req, res) => {
      res.send('Hello World!');
    });
  }

  start() {
    this.server = this.app.listen(this.config.port, () => {
      console.log(`Server is running at http://localhost:${this.config.port}`);
    });
  }

  stop() {
    if (this.server) {
      this.server.close(() => {
        console.log('Server stopped');
      });
    }
  }


}

export interface LocalServerConfig {
  port: number;
}
