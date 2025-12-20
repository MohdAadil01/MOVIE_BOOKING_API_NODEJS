import app from "./app";
import connectDb from "./db/db";
import { connectRedisClient } from "./utils/redis";

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log("App stared at port " + PORT);
  connectDb();
  await connectRedisClient();
});
