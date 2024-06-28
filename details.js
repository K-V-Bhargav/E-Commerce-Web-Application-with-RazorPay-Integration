const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    Image: {
        type: String,
        required: true,
    },
    Amount: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },
    Paid: {
        type: Boolean,
    }
});

const Order = mongoose.model("Payment", orderSchema);

module.exports = Order;
