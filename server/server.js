// Import express as variable
const express = require('express');

// Import Cors
const cors = require('cors')

// Call express as function
const app = express()

// PORT Local
const PORT = process.env.PORT || 5000;

// Import config .env
require("dotenv").config();

// Message server work
app.get('/', (request, response) => {
    response.json({message: "Hello, Server Doing Well"})
})

// Use express json
app.use(express.json())

// Use Cors
app.use(cors())

// Use uploads folder
app.use('/uploads', express.static('uploads'))

// Import routes
const router = require('./src/routes')

// Endpoint routing
app.use('/api/v1/', router)

// Message Port
app.listen(PORT, () => {
    console.log(`Server Listening on port ${PORT}`)
})