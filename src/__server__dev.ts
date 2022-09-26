/* this file is for development purpose only */
import express from "express";
import { Sequelize, DataTypes } from "sequelize";
import { AdminPannel } from "./index";

const app = express();

const sequelize = new Sequelize("test_server", "iamadmin", "admin", {
  host: "localhost",
  dialect: "postgres",
});

sequelize
  .authenticate()
  .then(() => console.log("connected to db"))
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

const Director = sequelize.define("Director", {
  name: { type: DataTypes.STRING, allowNull: true },
  birthDate: { type: DataTypes.DATE, allowNull: false },
  description: { type: DataTypes.TEXT },
});
const Movie = sequelize.define("Movie", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  //after defining association the field must be specified in the model or else our library will have no way to know existance of that relation
  DirectorId: {
    type: DataTypes.INTEGER,
    references: {
      model: Director, // 'Directors' would also work
      key: "id",
    },
  },
});
const ActorProfle = sequelize.define("ActorProfile", {
  photo: DataTypes.STRING,
  description: DataTypes.TEXT,
});
const Actor = sequelize.define("Actor", {
  name: { type: DataTypes.STRING, allowNull: true },
  successor: {
    type: DataTypes.STRING,
    defaultValue: "Don Didi",
  },
  ActorProfileId: {
    type: DataTypes.INTEGER,
    references: { model: ActorProfle, key: "id" },
  },
});
const ActorMovies = sequelize.define("ActorMovies", {
  MovieId: {
    type: DataTypes.INTEGER,
    references: {
      model: Movie, // 'Movies' would also work
      key: "id",
    },
  },
  ActorId: {
    type: DataTypes.INTEGER,
    references: {
      model: Actor, // 'Actors' would also work
      key: "id",
    },
  },
});

//after defining association the field must be specified in the model or else our library will have no way to know existance of that relation
Director.hasMany(Movie);
/* here since movie belongs to Director a DirectorId field will be added to model automatically during runtime but to use the library, the field must be specified in the model */
Movie.belongsTo(Director);

ActorProfle.hasOne(Actor);
Actor.belongsTo(ActorProfle); /* in model ActorProfileId */

Movie.belongsToMany(Actor, { through: ActorMovies });
Actor.belongsToMany(Movie, { through: ActorMovies });

// sequelize.sync({ alter: true });

const adminPannel = new AdminPannel("sequelize", sequelize, app);
adminPannel.initialize("admin");

app.listen(8000, () => console.log("client listening at port 8000"));
