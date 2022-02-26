// Import product
const { product } = require('../../models')

// Add product
exports.addProduct = async (request, response) => {
    try {
        const { data } = request.body;
        // code here
        let newProduct = await product.create({
            ...data,
            title: request.body.title,
            price: request.body.price,
            image: request.file.filename
        })

        newProduct = JSON.parse(JSON.stringify(newProduct))

        newProduct = {
            ...newProduct,
            image: process.env.FILE_PATH + newProduct.image,
        }

        // code here
        response.send({
            status: 'Success',
            data: {
                newProduct
            }
        })

    } catch (error) {
        console.log(error);
        response.status(500).send({
            status: "failed",
            message: "Server Error sasa",
        });
    }
};

// Get all product
exports.getProducts = async (request, response) => {
    try {
        let data = await product.findAll({
            attributes: {
            exclude: ["createdAt", "updatedAt", "idUser"],
            },
        });

        data = JSON.parse(JSON.stringify(data))

        data = data.map((item) => {
            return {
            ...item,
            image: process.env.FILE_PATH + item.image
            }
        })

        response.send({
            status: "Success on Getting Products",
            data:{
                products: data
            },
        });
    } catch (error) {
            console.log(error);
            response.send({
            status: "Failed",
            message: "Server Error",
            });
    }
};

// Get details product
exports.detailProduct = async (request, response) => {

    try {
        const {id} = request.params
        const data = await product.findOne({
            where: {
                id
            },
            attributes: {
                exclude: ["createdAt", "updatedAt", "idUser"]
            }
        })


        response.send({
            status: "success",
            message: "success get detail product",
            data
        })
    } catch (error) {
        console.log(error)
        response.send({
            status: "failed",
            message: "controller error"
        })
    }
}

// Edit product
exports.editProduct = async (request, response) => {
    try {
        const {id} = request.params
        await product.update(request.body, {
            where: {
                id
            }
        })
        response.send({
            status: "success",
            message: "succes update product"
        })
    } catch (error) {
        console.log(error)
        response.send({
            status: "failed",
            message: "controller error"
        })
    }
}

// Delete Product
exports.deleteProduct = async (request, response) => {

    try {
        const {id} = request.params
        await product.destroy({
            where: {
                id
            }
        })

        response.send({
            status: "success",
            message: "succes delete product"
        })
    } catch (error) {
        console.log(error)
        response.send({
            status: "failed",
            message: "controller error"
        })
    }
}