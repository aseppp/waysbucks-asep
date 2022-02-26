// Import models
const {user} = require('../../models')

// Get All User
exports.getUser = async (request,response) => {
    try {
        const data = await user.findAll()
        response.send({
            status: "success",
            message: "get all user succes",
            user: {
                data
            }
        })
    } catch (error) {

    }
}

// Add User
exports.addUser = async (request,response) => {
    try {
        const newUser = request.body
        await user.create(newUser)
        response.send({
            status: "success",
            message: "Add User Succes",
            data: {
                newUser
            }
        })
    } catch (error) {
        console.log(error)
        response.send({
            status: "failed",
            message: "Controllers user not work"
        })
    }
}

// Get User by ID
exports.userProfile = async (request, response) => {
    try {
        const {id} = request.params
        const userData = await user.findOne({
            where: {
                id
            }
        })

        response.send({
            status: "success get user",
            user: {
                userData
            }
        })
    } catch (error) {
        console.log(error);
        response.send({
            status: "failed",
            message: "controller error"
        })
    }
}

// Update User
exports.updateUser = async (request,response) => {
    try {
        const {id} = request.params
        const newData = request.body
        await user.update(newData, {
            where: {
                id
            }
        })
        response.send({
            status: "success",
            message: "update user succes",
            user: {
                updateTo : newData
            }
        })
    } catch (error) {
        console.log(error)
        response.send({
            status: "failed",
            message: "update user failed"
        })
    }
}

// Delete User
exports.deleteUser = async (request,response) => {
    try {
        const {id} = request.params
        await user.destroy({
            where: {
                id
            }
        })
        response.send({
            status: "success",
            message: "delete user success"
        })
    } catch (error) {
        console.log(error)
        response.send({
            status: "failed",
            message: "delete user failed"
        })
    }
}