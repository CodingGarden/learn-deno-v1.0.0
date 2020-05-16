import * as yup from "https://cdn.pika.dev/yup@^0.28.1";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import { init, MongoClient } from "https://deno.land/x/mongo@v0.6.0/mod.ts";
import { Application, Router } from "https://deno.land/x/oak/mod.ts";

await init();

const env = config();

const client = new MongoClient();

client.connectWithUri(env.MONGO_URI);

const db = client.database("test");
const dinosaurDB = db.collection("dinosaur");
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
  image: yup.string().trim().url().required(),
});

const router = new Router();
router.get("/", (ctx) => {
  ctx.response.body = {
    message: "Hello World! 🦕",
  };
});

router.get("/dinosaurs", async (ctx) => {
  try {
    const dinosaurs = await dinosaurDB.find({});
    ctx.response.body = dinosaurs;
  } catch (error) {
    ctx.response.body = error;
    ctx.response.status = 500;
  }
});

router.post("/dinosaurs", async (ctx) => {
  try {
    const body = await ctx.request.body();
    if (body.type !== "json") throw new Error("Invalid Body");
    const dinosaur = (await dinosaurSchema.validate(body.value) as Dinosaur);
    await dinosaurDB.insertOne(dinosaur);
    ctx.response.body = dinosaur;
  } catch (error) {
    error.status = 422;
    throw error;
  }
});

router.delete("/dinosaurs/:id", async (ctx) => {
  const { id } = ctx.params;
  try {
    ctx.response.status = 204;
    ctx.response.body = "";
    await dinosaurDB.deleteOne({ _id: { "$oid": id } });
  } catch (error) {
    ctx.response.status = 404;
    ctx.response.body = "Sever Error";
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

console.log("Listening on http://localhost:4242");
await app.listen({ port: 4242 });
