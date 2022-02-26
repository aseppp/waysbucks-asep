// import models
const { topping } = require('../../models')

// Add toppings
exports.addTopping = async (request, response) => {
    try {
        const { data } = request.body
        let newTopping = await topping.create({
            ...data,
            title: request.body.title,
            price: request.body.price,
            image: request.file.filename
        })

        newTopping = JSON.parse(JSON.stringify(newTopping))

        newTopping = {
            ...newTopping,
            image: process.env.FILE_PATH + newTopping.image,
        }

        // code here
        response.send({
            status: 'Success',
            data: {
                newTopping
            }
        })

    } catch (error) {
        console.log(error);
        response.status(500).send({
            status: "failed",
            message: "Server Error",
        });
    }
};

// Get all toppings
exports.getToppings = async (request, response) => {
    try {
        let data = await topping.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt", "idUser"]
            }
        });

        data = JSON.parse(JSON.stringify(data))

        data = data.map((item) => {
            return {
            ...item,
            image: process.env.FILE_PATH + item.image
            }
        })

        response.send({
            status: "Success on Getting toppings",
            data:{
                topping: data
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

// Get details topping
exports.detailTopping = async (request, response) => {
    try {
        const {id} = request.params
        const data = await topping.findOne({
            where: {
                id
            }
        })

        response.send({
            status: "success",
            message: "success get detail topping",
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

// Edit topping
exports.editTopping = async (request,response) => {
    try {
        const {id} = request.params
        const newData = request.body
        await topping.update(newData, {
            where: {
                id
            }
        })
        response.send({
            status: "success",
            message: "update topping succes",
            user: {
                updateTo : newData
            }
        })
    } catch (error) {
        console.log(error)
        response.send({
            status: "failed",
            message: "update topping failed"
        })
    }
}

// Delete topping
exports.deleteTopping = async (request, response) => {

    try {
        const {id} = request.params
        await topping.destroy({
            where: {
                id
            }
        })

        response.send({
            status: "success",
            message: "succes delete toppings"
        })
    } catch (error) {
        console.log(error)
        response.send({
            status: "failed",
            message: "controller error"
        })
    }
}