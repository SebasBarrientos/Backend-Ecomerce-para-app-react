const { Review, User, Product, Sequelize } = require('../models/index.js');
const { Op } = Sequelize;

const ReviewController = {
    async create(req, res) {
        try {
            req.body.UserId = req.user.id 
            const review = await Review.create(req.body);
            res.status(201).send({ msg: "Crítica creada exitosamente", review });
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    async getAll(req, res) {
        try {
            const reviews = await Review.findAll({
                include: [{ model: User, attributes: ["name"] }], include: [{ model: Product, attributes: ["name","description"] }],

            }); 
            res.send({ msg: "Todas las reviews", reviews});
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    async updateById(req, res) {
        try {
            await Review.update(req.body, {
                where: {
                    id: req.params.id,
                },
            });
            res.send({ msg: "Crítica actualizada con éxito"});
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    async delete(req, res) {
        try {
            await Review.destroy({
                where: {
                    id: req.params.id,
                },
            });
            res.send({ msg: "Crítica eliminada"});
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
};

module.exports = ReviewController;
