import express from "express";
import router from "./routes/movie.route";

const app = express();

app.use("/movie", router);

export default app;
