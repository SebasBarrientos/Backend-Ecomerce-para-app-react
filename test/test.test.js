const request = require("supertest");
const app = require("../index");
const { User, Product, Category, Review, Order } = require("../models/index");


describe("tester", () => {
    afterAll(() => {
        return User.destroy({ where: { role: "user" } }),
            Product.destroy({ where: {}, truncate: true }),
            Category.destroy({ where: {}, truncate: true }),
            Review.destroy({ where: {}, truncate: true }),
            Order.destroy({ where: {}, truncate: true }); 
    });
    const user = {
        name: "Username",
        email: "sebas33696@gmail.com",
        password: "contrasena123",
        role: "user",
    };
    const product = {
        name: 'Pantalon',
        description: 'Pantalon de jean negro',
        size: "M",
        price: 20,
        stock: 20,
        CategoryId: 2
    }
    const review = {
        title: "Pantalon",
        text: "El peor pantalon que he comprado en mi vida",
        ProductId: 4
    }
    const category = {
        name: "Pantalones"
    }
    test("Create a user", async () => {
        const res = await request(app)
            .post("/users")
            .send(user)
            .expect(201)
        const sendUser = {
            ...user,
            id: res.body.user.id,
            password: res.body.user.password,
            createdAt: res.body.user.createdAt,
            updatedAt: res.body.user.updatedAt,
        };
        const newUser = res.body.user;
        expect(newUser).toEqual(sendUser);
    });
    let token;
    test("Login a user", async () => {
        const res = await request(app)
            .post("/users/login")
            .send({ email: "sebas33696@gmail.com", password: "contrasena123" })
            .expect(200);
        token = res.body.token;
    });
    test("Search your user info", async () => {
        const res = await request(app)
            .get("/users/id")
            .set({ Authorization: token })
            .expect(200);

    });
    test("Update your info", async () => {
        const updateUser = {
            name: "Username",
            email: "sebas33696@gmail.com",
        };
        const res = await request(app)
            .put("/users")
            .send(updateUser)
            .set({ Authorization: token })
            .expect(200);
        expect(res.text).toBe("Usuario actualizado con éxito");
    });
    test("Create Order", async () => {
        const order = {
            "date": "2024-05-02",
            "ProductId": [4, 6, 8]
        }
        const res = await request(app)
            .post("/orders")
            .send (order)
            .set({ Authorization: token })
            .expect(201);
        expect(res.body.msg).toBe("Orden creada exitosamente");
    });
    test("Create a review", async () => {
        const res = await request(app)
            .post("/reviews")
            .send(review)
            .set({ Authorization: token })
            .expect(201)
        const sendReview = {
            ...review,
            id: res.body.review.id,
            UserId: res.body.review.UserId,
            createdAt: res.body.review.createdAt,
            updatedAt: res.body.review.updatedAt,
        };
        const newReview = res.body.review;
        expect(newReview).toEqual(sendReview);
    });
    test("Get all reviews", async () => {
        const res = await request(app)
            .get("/reviews")
            .expect(200)
        expect(res.body.msg).toBe("Todas las reviews");
    });
    test("Update your review", async () => {
        const updateReview = {
            title: "Desastroso",
        };

        const res = await request(app)
            .put("/reviews/id/1")
            .send(updateReview)
            .set({ Authorization: token })
            .expect(200);
        expect(res.body.msg).toBe("Crítica actualizada con éxito");
    });
    test("LogOut a user", async () => {
        const res = await request(app)
            .delete("/users/logout")
            .set({ Authorization: token })
            .expect(200);
        expect(res.body.message).toBe("Desconectado con éxito");
    });
    let tokenAdmin;

    test("Login as admin", async () => {
        const res = await request(app)
            .post("/users/login")
            .send({ email: "admin@admin.com", password: "contrasena123" })
            .expect(200);
        tokenAdmin = res.body.token;
    });
    test("Delete a user", async () => {
        const res = await request(app)
            .delete("/users/id/2")
            .set({ Authorization: tokenAdmin })
            .expect(200);
        expect(res.text).toBe("El usuario ha sido eliminado con éxito");
    });

    test("Create product", async () => {
        const res = await request(app)
            .post("/products")
            .send(product)
            .set({ Authorization: tokenAdmin })
            .expect(201)
        const sendProduct = {
            ...product,
            id: res.body.product.id,
            createdAt: res.body.product.createdAt,
            updatedAt: res.body.product.updatedAt,
            image: ""
        };
        const newProduct = res.body.product;
        expect({ ...newProduct, CategoryId: 2 }).toEqual(sendProduct);
    });
    test("Get all products", async () => {
        const res = await request(app)
            .get("/products")
            .expect(200)
        expect(res.body.msg).toBe("Todos los productos");
    });
    test("Get all in order", async () => {
        const res = await request(app)
            .get("/products/price/order")
            .expect(200)
        expect(res.body.msg).toBe("Todos los productos");
    });
    test("Get product by ID", async () => {
        const res = await request(app)
            .get("/products/id/1")
            .expect(200)
        expect(res.body.msg).toBe("Producto encontrado");
    });
    test("Get product by name", async () => {
        const res = await request(app)
            .get("/products/name/Pantalon")
            .expect(200)
        expect(res.body.msg).toBe("Producto encontrado");
    });
    test("Get product by price", async () => {
        const res = await request(app)
            .get("/products/price?price=19.99")
            .expect(200)
        expect(res.body.msg).toBe("Producto encontrado");
    });
    test("Update product by id", async () => {
        const updateProduct = {
            name: "cambio de nombre"
        };
        const res = await request(app)
            .put("/products/id/1")
            .send(updateProduct)
            .set({ Authorization: tokenAdmin })
            .expect(200);
        expect(res.body.msg).toBe("Producto actualizado con éxito");
    });
    test("Get all orders", async () => {
        const res = await request(app)
            .get("/orders")
            .set({ Authorization: tokenAdmin })
            .expect(200)
        expect(res.body.msg).toBe("Ordenes existentes");
    });
    test("Create category", async () => {
        const res = await request(app)
            .post("/categories")
            .send(category)
            .set({ Authorization: tokenAdmin })
            .expect(201)
        const sendCategory = {
            ...category,
            id: res.body.category.id,
            createdAt: res.body.category.createdAt,
            updatedAt: res.body.category.updatedAt,
        };
        const newCategory = res.body.category;
        expect({ ...newCategory }).toEqual(sendCategory);
    });
    test("Get all categories", async () => {
        const res = await request(app)
            .get("/categories")
            .expect(200)
        expect(res.body.msg).toBe("Todas las categorias");
    });
    test("Search category by ID", async () => {
        const res = await request(app)
            .get("/categories/id/1")
            .set({ Authorization: token })
            .expect(200);
        expect(res.body.msg).toBe("Categoria encontrada");
    });
    test("Search category by Name", async () => {
        const res = await request(app)
            .get("/categories/name/Pantalones")
            .set({ Authorization: token })
            .expect(200);
        expect(res.body.msg).toBe("Categoria encontrada");
    });
    test("Update category", async () => {
        const updateCategory = {
            name: "Pantalon",
        };

        const res = await request(app)
            .put("/categories/id/1")
            .send(updateCategory)
            .set({ Authorization: tokenAdmin })
            .expect(200);
        expect(res.body.msg).toBe("Categoría actualizada con éxito");
    });
    test("Delete a product", async () => {
        const res = await request(app)
            .delete("/products/id/1")
            .set({ Authorization: tokenAdmin })
            .expect(200);
        expect(res.text).toBe("El producto ha sido eliminado con éxito");
    });
    test("Delete a review", async () => {
        const res = await request(app)
            .delete("/reviews/id/1")
            .set({ Authorization: tokenAdmin })
            .expect(200);
        expect(res.body.msg).toBe("Crítica eliminada");
    });
    test("Delete an order", async () => {
        const res = await request(app)
            .delete("/orders/id/1")
            .set({ Authorization: tokenAdmin })
            .expect(200);
        expect(res.text).toBe("El pedido ha sido eliminado con éxito");
    });
    test("Delete a category", async () => {
        const res = await request(app)
            .delete("/categories/id/1")
            .set({ Authorization: tokenAdmin })
            .expect(200);
        expect(res.text).toBe("Categoria eliminada con éxito");
    });
});




