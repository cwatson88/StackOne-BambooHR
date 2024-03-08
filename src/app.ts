import express, { Request, Response } from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { rateLimit } from 'express-rate-limit';
import pino from 'pino-http';
import usersRoute from './api/employees/employees.router';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(
  pino({
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true
      }
    }
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});

// Apply the rate limiting middleware to all requests.
app.use(limiter);

app.get('/', (req, res) => {
  res.send('Hello, TypeScript Express!');
});

app.use(usersRoute);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
