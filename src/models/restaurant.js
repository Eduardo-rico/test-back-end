import Sequelize from "sequelize";
import sequelize from "../db";

const Restaurant = sequelize.define(
  "restaurants",
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    rating: {
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    site: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
    },
    street: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
    state: {
      type: Sequelize.STRING,
    },
    lat: {
      type: Sequelize.INTEGER,
    },
    lng: {
      type: Sequelize.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);

export default Restaurant;
