import express from "express";
import movieRoute from "./routes/movie.route";
import theatreRoute from "./routes/theatre.route";
import bodyParser from "body-parser";
import cors from "cors";
import { errorMiddleware } from "./middleware/error.middleware";
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({}));

app.use("/api/v1/mba/movie", movieRoute);
app.use("/api/v1/mba/theatre", theatreRoute);

app.use(errorMiddleware);
export default app;
