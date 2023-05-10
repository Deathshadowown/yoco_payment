import React, { useEffect } from "react";
const axios = require("axios");

const PurchasePage = () => {
  useEffect(() => {
    const loadYocoScript = () => {
      const script = document.createElement("script");
      script.src = "https://js.yoco.com/sdk/v1/yoco-sdk-web.js";
      script.async = true;
      script.onload = initializeYocoSDK;
      document.body.appendChild(script);
    };

    const initializeYocoSDK = () => {
      const yoco = new window.YocoSDK({
        publicKey: "pk_test_a10263a0V400r0y009a4",
      });

      const checkoutButton = document.querySelector("#checkout-button");
      checkoutButton.addEventListener("click", function () {
        yoco.showPopup({
          amountInCents: 2799,
          currency: "ZAR",
          name: "Your Store or Product",
          description: "Awesome description",
          callback: function (result) {
            if (result.error) {
              const errorMessage = result.error.message;
              alert("An error occurred: " + errorMessage);
            } else {
              // alert("Card successfully tokenized: " + result.id);
              handlePayment(result.id, 2799, "ZAR");
            }
          },
        });
      });
    };
    const handlePayment = async (token, amountInCents, currency) => {
      try {
        const response = await axios.post("/api/payment", {
          token,
          amountInCents,
          currency,
        });

        if (response.status === 200) {
          const data = response.data;
          console.log(data);
        } else {
          console.log("Payment processing failed.");
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadYocoScript();

    return () => {};
  }, []);

  return (
    <div>
      <h1>Purchase Page</h1>
      <button id="checkout-button">Pay</button>
    </div>
  );
};

export default PurchasePage;
