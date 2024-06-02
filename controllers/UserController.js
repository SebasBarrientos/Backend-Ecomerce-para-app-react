const { User, Order, Product, Token, Sequelize } = require('../models/index.js');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/config.json")["development"];
const { Op } = Sequelize;


const UserController = {
  async create(req, res) {
    try {
      const password = bcrypt.hashSync(req.body.password, 10)
      const user = await User.create({ ...req.body, password, role: "user" });
      res.status(201).send({ msg: "Usuario creado con éxito", user });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  async getAll(req, res) {
    try {
      const users = await User.findAll(
        { include: [{ model: Order, attributes: ["id"], include: [{ model: Product, attributes: ["name"] }] }], }
      );
      res.send({ msg: "Todos los usuarios", users });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  async delete(req, res) {
    try {
      await User.destroy({
        where: {
          id: req.params.id,
        },
      });

      res.send("El usuario ha sido eliminado con éxito");
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  async update(req, res) {
    try {
      const userUpdated ={
        name:req.body.name,
        email:req.body.email
      }
      await User.update(userUpdated, {
        where: {
          id: req.user.id,
        },
      });
      res.send("Usuario actualizado con éxito");
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  async getById(req, res) {
    try {
      const user = await User.findByPk(req.user.id, {
        include: [{
            model: Order, attributes: ["id"],
        include: [{ 
            model: Product, attributes: ["name"], through: { attributes: [] } }]
        }],
      });
      res.send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  async login(req, res) {
    try {
      const user = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (!user) {
        return res
          .status(400)
          .send({ message: "Usuario o contraseña incorrectos" });
      }
      const isMatch = bcrypt.compareSync(req.body.password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .send({ message: "Usuario o contraseña incorrectos" });
      }
      const token = jwt.sign({ id: user.id }, jwt_secret);
      await Token.create({ UserId: user.id, token });
      res.send({ token, user });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  async logout(req, res) {
    try {
      await Token.destroy({
        where: {
          [Op.and]: [
            { UserId: req.user.id },
            { token: req.headers.authorization },
          ],
        },
      });
      res.send({ message: "Desconectado con éxito" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "hubo un problema al tratar de desconectarte" });
    }
  }
}

module.exports = UserController
