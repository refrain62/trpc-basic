import express from 'express';
import { initTRPC, router } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';

const app = express();
const PORT = 3000;

const t = initTRPC.create();

const appRouter = t.router({
  hello: t.procedure.query(() => {
    return 'Hello World';
  }),
});

app.get('/', (_req, res) => {
  res.send('hello')
});

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  })
);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

export type appRouter = typeof appRouter;
