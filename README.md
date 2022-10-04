# express-admin-pannel
### Library to help with curd operations

## USAGE

#### These must be implement to use the library.
```
   const express = require('express')/* install using npm install express */
   const cors = require('cors')/* install using npm install cors */
   
   const app = express()

   app.use(express.json()) /* will be used to parse josn data */
   app.use(express.urlencoded({ extended: true })) /* will be used to parse form data */
   app.use(cors()) /* To prevent cors errors NOTE: cors must be installed */
```

### Initializing sequelize (only sequelize is supported as of now)
```
  const {Sequelize,DataTypes} = require('sequelize')

  const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
   });
```

### Creating a dummy models 
```
  const ActorProfle = sequelize.define("ActorProfile", {
      photo: {type:DataTypes.STRING},
      description: DataTypes.TEXT,
  },
  
  const Actor = sequelize.define("Actor", {
      name: { type: DataTypes.STRING, allowNull: false },
      
       ActorProfileId: {
        type: DataTypes.INTEGER,
        references: {
          model: ActorProfile, // 'ActorProfiles' would also work
          key: "id",
      },
    },
  });

  ActorProfile.hasOne(Actor)
  Actor.belongsTo(ActorProfile)
  /* after defining association the field must be specified in the model or else our library will have no way to know existance of that relation */
  /* See the ActorProfileId in Actor model that is added by sequelize but for the admin pannel you have to specify it in the model*/
  });
  
```

### Initializing admin pannel
```
  const AdminPannel = require("**somepath**")
  
  const adminPannel = new AdminPannel("sequelize", sequelize, app}
  adminPannel.initialize("admin");//The argument is the route to adminpannel
  
  /* adminpannel can be seen at http://localhost:port/admin */
  
 ```
   new AdminPannel needs at least three arguments with a optional argument to customize admin pannel.
   1)First argument is the name of ORM you are using. Currently only sequelize is supported.
   2)Second argunemt takes the instance of db. In this case it is sequelize
   3)Third argument is the express app
   4)Options to customize admin panel
  
  adminPannel.initialize take one argument that is route to admin pannel */
  

#### Listening at a port

```
  app.listen(8000, () => console.log("listening at port 8000"));
```
 now visit http://localhost:8000/admin to see the admin pannel.


 

 
