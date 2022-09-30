/* this file is for development purpose only */
import express from "express";
import { Sequelize, DataTypes } from "sequelize";
import cors from "cors";
import { AdminPannel } from "./index";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

/* virtual field __title__ should be added for better readibility in admin pannel  */
const Director = sequelize.define("Director", {
  name: { type: DataTypes.STRING, allowNull: true },
  birthDate: { type: DataTypes.DATE },
  description: { type: DataTypes.TEXT },

  __title__: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${this.getDataValue("name")}`;
    },
  },
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
      model: "Directors", // 'Directors' would also work
      key: "id",
    },
  },

  __title__: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${this.getDataValue("name")}`;
    },
  },
});
const ActorProfle = sequelize.define("ActorProfile", {
  photo: DataTypes.STRING,
  description: DataTypes.TEXT,
  __title__: {
    type: DataTypes.VIRTUAL,
    get() {
      return this.getDataValue("photo");
    },
  },
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
  isAlive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  __title__: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${this.getDataValue("name")}`;
    },
  },
});
const ActorMovies = sequelize.define("ActorMovies", {
  MovieId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Movies", // 'Movies' would also work
      key: "id",
    },
  },
  ActorId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Actors", // 'Actors' would also work
      key: "id",
    },
  },

  __title__: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${this.getDataValue("MovieId")},${this.getDataValue("ActorId")}`;
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

// async function notW() {
//   await sequelize.sync({ force: true });
//   const profile = await ActorProfle.create({
//     photo: "some link",
//     description: "this is description",
//   });
//   const newactor = await Actor.create({
//     name: "test name",
//     successor: "noone",
//   });
//   const newdir = await Director.create({
//     name: "test name of director",
//     birthDate: "Wed Sep 28 2022 19:09:21 GMT+0545 (Nepal Time) ",
//     description: "asdf",
//   });
//   const movie = await Movie.create({
//     name: "my movie",
//     director: newdir.name,
//   });
// }
// notW();

//arguments: name of orm,instance of db,express app,options
const adminPannel = new AdminPannel("sequelize", sequelize, app, {
  titleFields: {
    Actor: ["id", "successor"],
  },
});
adminPannel.initialize("admin");

app.listen(8000, () => console.log("client listening at port 8000"));
