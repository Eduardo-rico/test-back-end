import { Router } from "express";
import test from "../controllers/restaurantController";

const router = Router();

router
  .get("/", test.getAllRestaurants)
  .post("/", test.createRestaurant)
  .get("/", test.test)
  .get("/", test.test)
  .get("/", test.test);

export default router;
