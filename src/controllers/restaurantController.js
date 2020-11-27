import Restaurant from "../models/restaurant";
const createRestaurant = async (req, res) => {
  const {
    id,
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
        id,
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
    if (!allRestaurants) {
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

export default { createRestaurant, getAllRestaurants, test };
