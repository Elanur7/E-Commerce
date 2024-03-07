const mongoose = require("mongoose");

const PaymentSchema = mongoose.Schema(
  {
    email: { type: String, required: true },
    cardOwner: { type: String, required: true },
    cardInformation: { type: Number, required: true },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", PaymentSchema);
module.exports = Payment;
