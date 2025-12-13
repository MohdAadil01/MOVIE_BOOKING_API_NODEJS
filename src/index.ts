import app from "./app";
import connectDb from "./db/db";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("App stared at port " + PORT);
  connectDb();
});
