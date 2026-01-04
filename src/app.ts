import express from "express";
import movieRoute from "./routes/movie.route";
import theatreRoute from "./routes/theatre.route";
import userRoute from "./routes/user.route";
import bodyParser from "body-parser";
import cors from "cors";
import { errorMiddleware } from "./middleware/error.middleware";
import showRoutes from "./routes/show.route";
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({}));
app.set("trust proxy", 1);

app.use("/api/v1/mba/movie", movieRoute);
app.use("/api/v1/mba/theatre", theatreRoute);
app.use("/api/v1/mba/user", userRoute);
app.use("/api/v1/mba/shows", showRoutes);

app.use(errorMiddleware);
export default app;
