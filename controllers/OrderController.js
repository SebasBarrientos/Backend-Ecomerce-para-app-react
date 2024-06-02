const { Order, User, Product, Sequelize } = require('../models/index.js');
const { Op } = Sequelize;
const transporter = require("../config/nodemailer");

const OrderController = {
    async create(req, res) {
        try {
            req.body.UserId = req.user.id 
            const order = await Order.create(req.body);

            order.addProduct(req.body.ProductId);
            await transporter.sendMail({
                to: req.user.email,
                subject: "Orden creada exitosamente",
                html: `<h3> Hemos recibido tu orden!</h3>
                <p>Podras saber mas si te contactas con nosotros. Compartenos este numero que es tu Usuario: ${req.user.id}. Con el rastrearemos tu pedido </p>
                <p> En la brevedad te llegara un correo con la fecha estimada en la que lo recibiras </p>
                <p> En caso de que en mas de 3 dias no te llegue nada, agradecemos tu donacion! </p>
                `,
              });
        
            res.status(201).send({ msg: "Orden creada exitosamente", order });
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    async getAll(req, res) {
        try {
            const orders = await Order.findAll({
                include: [{ model: User, attributes: ["name", "email"] }],
                include: [{ 
                    model: Product, attributes: ["name"], through: { attributes: [] } }]
            }); 
            res.send({ msg: "Ordenes existentes",orders});
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },

    async delete(req, res) {
        try {
            await Order.destroy({
                where: {
                    id: req.params.id,
                },
            });
            res.send("El pedido ha sido eliminado con éxito");
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
};

module.exports = OrderController;
