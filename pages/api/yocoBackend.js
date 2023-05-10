const axios = require("axios");
require("dotenv").config();

// Anonymous test key. Replace with your key.
const SECRET_KEY = process.env.SECRET_KEY;
const apiUrl = process.env.API_URL;

const processPayment = async (token, amountInCents, currency) => {
  console.log(typeof token);
  console.log(typeof amountInCents);
  console.log(typeof currency);
  try {
    const response = await axios.post(
      apiUrl,
      {
        token,
        amountInCents,
        currency,
      },
      {
        headers: {
          "X-Auth-Secret-Key": SECRET_KEY,
        },
      }
    );

    const { status, data } = response;

    if (status === 201 && data.status === "successful") {
      // Handle successful payment
      return data;
    } else if (status === 400 && data.errorCode === "charge_declined") {
      // Handle declined payment
      throw new Error(data.displayMessage);
    } else {
      // Handle other error cases
      throw new Error(data.displayMessage);
    }
  } catch (error) {
    throw new Error("Payment processing failed.");
  }
};

module.exports = { processPayment };
