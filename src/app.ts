import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });
import express from "express";
import { postgres } from "./config/database";
import { StoryRoutes } from "./routes/story";
import { AuthRoutes } from "./routes/auth";

const app = express();

app.use(express.json());

app.use(StoryRoutes);
app.use(AuthRoutes);

postgres
  .initialize()
  .then((data) => {
    if (data.isInitialized) {
      console.log("Database connected");
      app.listen(3000, () => {
        console.log("Running on port 3000");
      });
    }
  })
  .catch((err) => {
    console.log("Unable to connect");
    console.log(err);
  });
