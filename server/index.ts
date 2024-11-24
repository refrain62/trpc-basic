import express from 'express';
import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import { z } from "zod";
import { PrismaClient } from '@prisma/client';

const app = express();
const PORT = 3000;

const t = initTRPC.create();

const appRouter = t.router({
  hello: t.procedure.query(() => {
    return 'Hello World';
  }),
  helloName: t.procedure
    .input(z.object({ name: z.string(), age: z.number() }))
    .query(({ input }) => {
      return {
        greeting: `Hello world ${input.name}`,
        age: input.age,
      }
    }), 
  todos: t.procedure.query(async ({ ctx }) => {
    const todos = await ctx.prisma.todo.findMany();
    return todos;
  }),
});

app.get('/', (_req, res) => {
  res.send('hello')
});

app.use(cors());

const prisma = new PrismaClient();

const createContext = (opts: trpcExpress.CreateExpressContextOptions) => {
  return {prisma};
};

type Context = inferAsyncReturnType;
const t = initTRPC.context().create();

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  })
);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

export type appRouter = typeof appRouter;
