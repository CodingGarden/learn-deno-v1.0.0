import { v4 } from 'https://deno.land/std/uuid/mod.ts';
import { config } from 'https://deno.land/x/dotenv/mod.ts';
import { Application, Router } from 'https://deno.land/x/oak/mod.ts';
import * as yup from 'https://cdn.pika.dev/yup@^0.28.1';

const env = config();

interface RequestError extends Error {
  status: number;
}

interface Dinosaur {
  id?: string;
  name: string;
  image: string;
}

const dinosaurSchema = yup.object().shape({
  name: yup.string().trim().min(2).required(),
  image: yup.string().trim().url().required()
});

const DB = new Map<string, Dinosaur>();

const router = new Router();
router.get('/', (ctx) => {
  ctx.response.body = {
    message: 'Hello World! 🦕'
  };
});

router.get('/dinosaurs', (ctx) => {
  ctx.response.body = [...DB.values()];
});

router.post('/dinosaurs', async (ctx) => {
  try {
    const body = await ctx.request.body();
    if (body.type !== 'json') throw new Error('Invalid Body');
    const dinosaur = (await dinosaurSchema.validate(body.value) as Dinosaur);
    dinosaur.id = v4.generate();
    DB.set(dinosaur.id, dinosaur);
    ctx.response.body = dinosaur;
  } catch (error) {
    error.status = 422;
    throw error;
  }
});

router.delete('/dinosaurs/:id', (ctx) => {
  const { id } = ctx.params;
  if (id && DB.has(id)) {
    ctx.response.status = 204;
    ctx.response.body = '';
    DB.delete(id);
  } else {
    const error = new Error('Not Found! 🦕') as RequestError;
    error.status = 404;
    throw error;
  }
});

const app = new Application();

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    const error = err as RequestError;
    ctx.response.status = error.status || 500;
    ctx.response.body = {
      message: error.message,
    };
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

console.log('Listening on http://localhost:4242');
await app.listen({ port: 4242 });
