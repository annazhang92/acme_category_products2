const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const Sequelize = require('sequelize');
const conn = new Sequelize (process.env.DATABASE_URL || 'postgres://localhost/acme_category_products_db');
const path = require('path');
app.use(require('body-parser').json());

const Category =conn.define('category',{
    name:{
        type: Sequelize.STRING
    }
});

const Product =conn.define('product',{
    name:{
        type: Sequelize.STRING
    }
});

Product.belongsTo(Category);
Category.hasMany(Product);

conn.sync({force:true})
.then(()=>Promise.all[
    Category.create({name:Math.floor(Math.random()*100)+'-Category'}),
    Category.create({name:Math.floor(Math.random()*100)+'-Category'}),
    Category.create({name:Math.floor(Math.random()*100)+'-Category'}),
    Product.create({name:Math.floor(Math.random()*100)+'-Product',categoryId:1}),
    Product.create({name:Math.floor(Math.random()*100)+'-Product',categoryId:1}),
    Product.create({name:Math.floor(Math.random()*100)+'-Product',categoryId:1}),
    Product.create({name:Math.floor(Math.random()*100)+'-Product',categoryId:1}),
    Product.create({name:Math.floor(Math.random()*100)+'-Product',categoryId:2}),
    Product.create({name:Math.floor(Math.random()*100)+'-Product',categoryId:2}),
    Product.create({name:Math.floor(Math.random()*100)+'-Product',categoryId:2}),
    Product.create({name:Math.floor(Math.random()*100)+'-Product',categoryId:3})
])

app.use(express.static(path.join(__dirname, "."))); //was is das???

app.listen(port,()=>{console.log(`listening on port ${port}`)})

app.get('/api/categorys',(req,res,next)=>{
    Category.findAll()
    .then(categorys=>res.send(categorys))
})

app.get('/api/products',(req,res,next)=>{
    Product.findAll()
    .then(products=>res.send(products))
})


app.post('/api/categorys',(req,res,next)=>{
    Category.create({name:Math.floor(Math.random()*100)+'-Category'})
    .then( category => res.send(category))
})



// app.put('/api/users/:id', (req, res, next)=> {
//     User.findById(req.params.id)
//       .then( user => {
//         Object.assign(user, req.body)
//         return user.save();
//       })
//       .then( user => res.send(user))
//       .catch(next);
//   });
  
  app.delete('/api/categorys/:id', (req, res, next)=> {
    Category.findById(req.params.id)
      .then( category => {
        return category.destroy();
      })
      .then( () => res.sendStatus(204))
      .catch(next);
  });


  app.delete('/api/products/:id', (req, res, next)=> {
    Product.findById(req.params.id)
      .then( product => {
        return product.destroy();
      })
      .then( () => res.sendStatus(204))
      .catch(next);
  });