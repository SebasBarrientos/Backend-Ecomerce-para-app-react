const express = require('express');
const app = express();
const path = require ('path')
const PORT = 3000
const cors = require("cors")
app.use(cors()) 

app.use(express.json())
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/images', express.static('/images'));
app.use('/products', require('./routes/products'));
app.use('/categories', require('./routes/categories'));
app.use('/users', require('./routes/users'));
app.use('/orders', require('./routes/orders'));
app.use('/reviews', require('./routes/reviews'));

app.listen(PORT, () => console.log('Servidor levantado en el puerto ' + PORT))
module.exports = app;