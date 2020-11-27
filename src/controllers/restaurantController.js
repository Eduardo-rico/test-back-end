import { v4 as uuidv4 } from "uuid";
import { circle, booleanPointInPolygon, point } from "@turf/turf";
import { mean, std } from "mathjs";
import Restaurant from "../models/restaurant";

const createRestaurant = async (req, res) => {
  const {
    rating,
    name,
    site,
    email,
    phone,
    street,
    city,
    state,
    lat,
    lng,
  } = req.body;

  try {
    const newRestaurant = await Restaurant.create(
      {
        id: uuidv4(),
        rating,
        name,
        site,
        email,
        phone,
        street,
        city,
        state,
        lat,
        lng,
      },
      {
        fields: [
          "id",
          "rating",
          "name",
          "site",
          "email",
          "phone",
          "street",
          "city",
          "state",
          "lat",
          "lng",
        ],
      }
    );
    if (newRestaurant) {
      res
        .status(201)
        .json({ message: "Restaurant created successfully", newRestaurant });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `Restaurant was not created successfully error: ${error}`,
    });
  }
};

const test = (req, res) => {
  res.send("hola");
};

const getAllRestaurants = async (req, res) => {
  try {
    const allRestaurants = await Restaurant.findAll();
    if (allRestaurants.length === 0) {
      res.json({ message: "There is no restaurants" });
    } else {
      res.json({ message: "List of restorants", restaurants: allRestaurants });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `I can not retrive the restaurant list because of error: ${error}`,
    });
  }
};
const getOneRestaurant = async (req, res) => {
  try {
    const selectedRestaurant = await Restaurant.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!selectedRestaurant) {
      res.json({ message: "There is no restaurant with that id" });
    } else {
      res.json({ message: "Restorant found!", restaurant: selectedRestaurant });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `I can not retrive the restaurant list because of error: ${error}`,
    });
  }
};

const updateRestaurant = async (req, res) => {
  const restaurantId = req.params.id;
  const attributes = req.body;
  try {
    const selectedRestaurant = await Restaurant.findOne({
      where: {
        id: restaurantId,
      },
    });
    if (!selectedRestaurant || selectedRestaurant.length === 0) {
      res.json({ message: "There is no restaurant with that id" });
    } else {
      await Restaurant.update(attributes, {
        where: {
          id: restaurantId,
        },
      });
      res.json({
        message: "Restorant updated!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `I can not update the restaurant because of error: ${error}`,
    });
  }
};

const deleteRestaurant = async (req, res) => {
  const restaurantId = req.params.id;
  try {
    const selectedRestaurant = await Restaurant.findOne({
      where: {
        id: restaurantId,
      },
    });
    if (!selectedRestaurant || selectedRestaurant.length === 0) {
      res.json({ message: "There is no restaurant with that id" });
    } else {
      await Restaurant.destroy({
        where: {
          id: restaurantId,
        },
      });
      res.json({
        message: "Restorant deleted!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `I can not delete the restaurant because of error: ${error}`,
    });
  }
};

const getStatistics = async (req, res) => {
  const { latitude, longitude, radius } = req.query;
  try {
    const allRestaurants = await Restaurant.findAll();
    if (allRestaurants.length === 0) {
      res.json({ message: "There is no restaurants" });
    } else {
      const options = { steps: 36, units: "meters" };
      const circleArea = circle([longitude, latitude], radius, options);
      const restaurantsNearPoint = allRestaurants.filter((restaurant) => {
        const lat = Number(restaurant.lat);
        const lng = Number(restaurant.lng);
        const coordinates = [lng, lat];
        const pt = point(coordinates);
        const pointInTheArea = booleanPointInPolygon(pt, circleArea);
        if (pointInTheArea) {
          return restaurant;
        }
      });
      const justRatings = restaurantsNearPoint.map((location) => {
        return location.rating;
      });
      const avg = mean(justRatings);
      const standarDev = std(justRatings);
      res.json({
        message: `Number of restaurants near point (${latitude}, ${longitude}) with radius of ${radius} meters is ${restaurantsNearPoint.length}`,
        count: restaurantsNearPoint.length,
        avg,
        std: standarDev,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `I can not retrive the restaurant list because of error: ${error}`,
    });
  }
};

export default {
  createRestaurant,
  getAllRestaurants,
  getOneRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getStatistics,
  test,
};
