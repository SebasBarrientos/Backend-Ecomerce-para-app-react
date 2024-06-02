'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert ( 'Users', [
      {
      name: 'John',
      email: 'John@example.com',
      password:bcrypt.hashSync('contrasena123', 10),
      role:'user',
      createdAt: new Date(),
      updatedAt: new Date()
    },
      {
      name: 'Tom',
      email: 'Tom@example.com',
      password:bcrypt.hashSync('contrasena123', 10),
      role:'user',
      createdAt: new Date(),
      updatedAt: new Date()
    },
      {
      name: 'Pepe',
      email: 'Pepe@example.com',
      password:bcrypt.hashSync('contrasena123', 10),
      role:'user',
      createdAt: new Date(),
      updatedAt: new Date()
    },
      {
      name: 'Hernan',
      email: 'Hernan@example.com',
      password:bcrypt.hashSync('contrasena123', 10),
      role:'user',
      createdAt: new Date(),
      updatedAt: new Date()
    },
      {
      name: 'Pepito',
      email: 'Pepito@example.com',
      password:bcrypt.hashSync('contrasena123', 10),
      role:'user',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], 'Products',[
    {
      name: 'Pantalon',
      description: 'Pantalon de jean azul',
      size:"M",
      price:20,
      stock: 20,
      category:2,
      createdAt: new Date(),
      updatedAt: new Date(),
      image: "images\pantalonJeanAzul.jpg"
    },
    {
      name: 'Pantalon',
      description: 'Pantalon de jean negro',
      size:"M",
      price:20,
      stock: 20,
      category:2,
      createdAt: new Date(),
      updatedAt: new Date(),
      image: "images\pantalonJeanNegro.jpg"
    },
    {
      name: 'Pantalon',
      description: 'Pantalon de jean rojo',
      size:"M",
      price:20,
      stock: 20,
      category:2,
      createdAt: new Date(),
      updatedAt: new Date(),
      image: "images\pantalonJeanRojo.jpg"
    },
    {
      name: 'Remera',
      description: 'Remera negra',
      size:"M",
      price:20,
      stock: 20,
      category:2,
      createdAt: new Date(),
      updatedAt: new Date(),
      image: "images\Remera negra 12.jpg"
    },
  ])
  },

  async down (queryInterface, Sequelize) {
  }
};
