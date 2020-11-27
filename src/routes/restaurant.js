import { Router } from "express";
import test from "../controllers/restaurantController";

const router = Router();

router
  .get("/", test.getAllRestaurants)
  .post("/", test.createRestaurant)
  .get("/:id", test.getOneRestaurant)
  .put("/:id", test.updateRestaurant)
  .delete("/:id", test.deleteRestaurant)
  .get("/restaurant/statistics", test.getStatistics);

export default router;
