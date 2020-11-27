import { Router } from "express";
import restaurantControllers from "../controllers/restaurantController";

const router = Router();

router
  .get("/", restaurantControllers.getAllRestaurants)
  .post("/", restaurantControllers.createRestaurant)
  .get("/:id", restaurantControllers.getOneRestaurant)
  .put("/:id", restaurantControllers.updateRestaurant)
  .delete("/:id", restaurantControllers.deleteRestaurant)
  .get("/restaurant/statistics", restaurantControllers.getStatistics);

export default router;
