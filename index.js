const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const Order = require("./details");

const axios = require('axios');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

mongoose.connect("mongodb://127.0.0.1:27017/test").
then(console.log("Connected to DataBase !!")),

// Post API
app.post("/api/store", async (req, res) => {
    try {
        const order = new Order(req.body);
        const savedOrder = await order.save();
        res.status(200).json(savedOrder);
    } catch (error) {
        res.status(400).json({
            "Status": "error",
            "Message": error.message
        });
    }
});

// Get API
app.get("/api/get", async (req, res) => {
    try {
        const data = await Order.find({});
        res.status(200).json({
            "Status Code": 200,
            "Data": data
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            "Status Code": 500,
            "Message": "Internal Server Error",
        });
    }
});

// Post Orders API
app.post('/api/buyOrders', async (req, res) => {
    try {
        const { amount, currency, receipt } = req.body;
        const username = 'rzp_test_R1Iwue8Zx8XY5H';
        const password = 'miK71QjYmUwgaVRQNc4tRAef';

        const credentials = Buffer.from(`${username}:${password}`).toString('base64');

        const response = await axios.post('https://api.razorpay.com/v1/orders', {
            amount,
            currency,
            receipt
        }, {
            headers: {
                'Authorization': `Basic ${credentials}`
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ Error: 'An error occurred while making payment !!' });
    }
});
  
// Update API
app.put("/api/update/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const data = await Order.findByIdAndUpdate(id, req.body, { new: true });
        if (!data) {
            return res.status(404).json({
                "Status": 404,
                "Message": "Data not found !!",
            });
        }
        res.status(200).json({
            "Status": 200,
            "Message": "Data Updated Successfully !!",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            "Status": 500,
            "Message": "Internal Server Error",
            "Error": error.message,
        });
    }
});

// Delete API
app.delete("/api/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deletedPerson = await Person.findByIdAndDelete(id);
        if (!deletedPerson) {
            return res.status(404).json({
                "Status Code": 404,
                "Message": "Person not found",
            });
        }
        res.status(200).json({
            "Status Code": 200,
            "Message": "Person Deleted Successfully !!",
            "Deleted Person": deletedPerson,
        });
    } catch (error) {
        res.status(500).json({
            "Status Code": 500,
            "Message": "Internal Server Error",
        });
    }
});

const port = 8000;
app.set("port", port);
app.listen(port, () => {
    console.log(`Successfully connected to port: ${port}`);
});
