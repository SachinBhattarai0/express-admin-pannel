# express-admin-pannel
### Library to help with curd operations

## USAGE

### Installation
```
   npm i express-admin-pannel
```

#### These must be implement to use the library.
```
   const express = require('express')
   const cors = require('cors')
   const {AdminPannel} = require("express-admin-pannel")
   
   
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
  const ActorProfile = sequelize.define("ActorProfile", {
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
  const {AdminPannel} = require("express-admin-pannel")
  
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



### Customization
Admin Pannel can be customized by passing options while instantiating admin pannel

```
    const adminPannel = new AdminPannel("sequelize", sequelize, app,{
       titleFields: /* fields mentioned here will be shown in admin pannel */,
       imageFields: /* fields mentioned here should be a link and it will be shown as image in admin pannel */,
       noOfItemsPerPage: /* shows this mentioned of items before showing pagination default is 30 */;
     }}
```

Lets look at them individually:

#### titleFields
```
     const adminPannel = new AdminPannel("sequelize", sequelize, app,{
       titleFields: { Actor: ["id", "name","ActorProfileId"], ActorProfile: ["photo","description"] },
                     /* {model1:["field1","field2"],model2:["field1","field2"]} */
     }}
```
 this will show id,name,ActorProfileId in admin pannel.
 
 optionally if you add a ```__title__``` virtual field and return something then it will be shown in the admin pannel automatically if you have not customized title fields
 For Example: if we change our Actor model as below and add a virtual field called ```__title__``` 
 ```
 
   const Actor = sequelize.define("Actor", {
      name: { type: DataTypes.STRING, allowNull: false },
      
       ActorProfileId: {
        type: DataTypes.INTEGER,
        references: {
          model: ActorProfile, // 'ActorProfiles' would also work
          key: "id",
      },
      __title__: {
       type: DataTypes.VIRTUAL,
       get() {
         return `${this.getDataValue("name")}`;
       },
      },
    },
  });

 ```
 whatever you return from the ```__title__``` virtual field will be automatically shown in admin pannel unless you have customized the titleFields
 if you still want to show ```__title__``` then you have to mention in the titleFields.
    
 
#### imageFields
If you have a link to a image and you want to see it as a image then you can also do that.
In our case we have a field called ```photo``` in ActorProfile so we will show it as image in admin pannel
 ```
    const adminPannel = new AdminPannel("sequelize", sequelize, app,{
       titleFields: { ActorProfile: ["photo"] },//First we mention that we want to show photo in admin pannel
       imageFields: {ActorProfile:["photo"]} // Then we mention it in the image field
     }}
 ```

 
#### noOfItemsPerPage
If you want to show a specific number of items before showing pagination then specify ```noOfItemsPerPage``` property:

 ```
    const adminPannel = new AdminPannel("sequelize", sequelize, app,{
       noOfItemsPerPage:10,
     }}
 ```
 this will show 10 items before showing pagination.
 
 

 
