'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert ( 'Products',[
    {
      name: 'Pantalon',
      description: 'Pantalon de jean azul',
      size:"M",
      price:20,
      stock: 20,
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
      createdAt: new Date(),
      updatedAt: new Date(),
      image: "images\Remera negra 12.jpg"
    },
    {
      name: 'Remera',
      description: 'Remera roja',
      size:"M",
      price:20,
      stock: 20,
      createdAt: new Date(),
      updatedAt: new Date(),
      image: "images\RemeraRoja.jpg"
    },
  ])
  },

  async down (queryInterface, Sequelize) {
  }
};
