import express from "express";
import movieRoute from "./routes/movie.route";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({}));

app.use("/api/v1/mba/movie", movieRoute);

export default app;
