// Import models
const {user} = require('../../models');

// Import Joi
const joi = require('joi');

// Import becrypt
const bcrypt = require('bcrypt');

//import jsonwebtoken
const jwt = require("jsonwebtoken");

// Register
exports.register = async (request,response) => {
    // Create Scheme
    const scheme = joi.object({
        name : joi.string().min(4).required(),
        email: joi.string().required(),
        password: joi.string().min(4).required()
    })

    // Do Validate
    const {error} = scheme.validate(request.body)

    // Condition
    if (error) {
        return response.status(400).send({
            error: {
                message: error.details[0].message,
              },
        })
    }

    try {
      // User Exist
     const existUser = await user.findOne({
      where: {
        email: request.body.email
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    if (existUser) {
      return response.status(500).send({
        status: 'failed',
        message: "user exists"
      })
    }

    // Generate random value
    const salt = await bcrypt.genSalt(10);

    // Generate random hash password
    const hashedPassword = await bcrypt.hash(request.body.password, salt);

    // Register
    const newUser = await user.create({
      name: request.body.name,
      email: request.body.email,
      password: hashedPassword,
      status: "customer"
    })

    // Generate Token
    const token = jwt.sign({ id: user.id }, process.env.JWT_KEY);

    response.send({
          status: "success",
          message: "registration success",
          data: {
            newUser,
            token
          }
      })
    } catch (error) {
        console.log(error)
        response.status(500).send({
            status: "failed",
            message: "credential error"
        })
    }
}

// Login
exports.login = async (request, response) => {
  const scheme = joi.object({
    email: joi.string().required(),
    password: joi.string().min(4).required()
  })

  // Do Validate
  const {error} = scheme.validate(request.body)

  // Condition
  if (error) {
      return response.status(400).send({
          error: {
              message: error.details[0].message,
            },
      })
  }

  try {
    // User Exist
    const existUser = await user.findOne({
      where: {
        email: request.body.email,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!existUser) {
      return response.status(400).send({
        status: "failed",
        message: "register first"
      })
    }

    // Validate password
    const isValid = await bcrypt.compare(request.body.password, existUser.password)

    // Condition if password match
    if(!isValid) {
      return response.status(400).send({
        status: "failed",
        message: "password salah"
      })
    }

    // Token user
    const token = jwt.sign({ id: existUser.id }, process.env.JWT_KEY)

    response.status(200).send({
      status: "success",
      message: "login success",
      user: {
        data: {
          name: existUser.name,
          email: existUser.email,
          password: existUser.password,
          status: existUser.status,
          token
        },
      }
    })

  } catch (error) {
    console.log(error)
    response.send({
      status: "failed",
      message: "auth login error"
    })
  }
}

exports.checkAuth = async (req, res) => {
  try {
    const id = req.user.id;

    const dataUser = await user.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    if (!dataUser) {
      return res.status(404).send({
        status: "Failed",
      });
    }

    res.send({
      status: "Success",
      data: {
        user: {
          id: dataUser.id,
          fullname: dataUser.name,
          email: dataUser.email,
          status: dataUser.status,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status({
      status: "Failed",
      message: "Server Error",
    });
  }
  };