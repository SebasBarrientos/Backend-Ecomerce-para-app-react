const { Category, Product, ProductsCategory } = require("../models/index");

const CategoryController = {
    async create(req, res) {
        try {
            const category = await Category.create(req.body)
            res.status(201).send({ msg: "Categoria creada con éxito", category })
        } catch (error) {
            console.error(error);
            res.status(500).send(error)
        }
    }, async getAll(req, res) {
        try {
            const categories = await Category.findAll({
                include: [{ model: Product, attributes: ["name"], through: { attributes: [] } }]
            })
            res.send({ msg: "Todas las categorias", categories })
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    async updateById(req, res) {
        try {
            await Category.update(req.body, {
                where: {
                    id: req.params.id,
                },
            });
            res.send({msg:"Categoría actualizada con éxito"});
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    async deleteById(req, res) {
        try {
            await Category.destroy({
                where: {
                    id: req.params.id,
                },
            });
            await ProductsCategory.destroy({
                where: {
                    CategoryId: req.params.id,
                },
            });
            res.send("Categoria eliminada con éxito");

        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    async getById(req, res) {
        try {
            const category = await Category.findByPk(req.params.id, { include: [{ model: Product, attributes: ["name"], through: { attributes: [] } }] });
            res.send({msg:"Categoria encontrada", category});
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    async getByName(req, res) {
        try {
            const category = await Category.findAll({
                where: {
                    name: req.params.name,
                }, include: [{ model: Product, attributes: ["name"], through: { attributes: [] } }]
            });
            res.send({msg:"Categoria encontrada", category});
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    }
};

module.exports = CategoryController;