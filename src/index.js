import express, { json } from "express";
import restaurantRoutes from "./routes/restaurant";

const port = process.env.PORT || 3000;

const app = express();

app.use(json());

app.use("/api/restaurants", restaurantRoutes);

app.listen(port, () => {
  console.log(`Server listengin on port ${port}`);
});
