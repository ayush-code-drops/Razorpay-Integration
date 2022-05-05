import React, { useState, useEffect } from "react";
import { getOrder } from "./apiCalls";

const App = () => {
  const [values, setValues] = useState({
    amount: 0,
    orderId: "",
    error: "",
    success: false,
  });

  const { amount, orderId, success, error } = values;
  useEffect(() => {
    createOrder();
  }, []);

  const createOrder = () => {
    getOrder().then((response) => {
      if (!response) {
        setValues({ ...values, error: 'Eror', success: false });
      } else {
        setValues({
          ...values,
          error: "",
          success: true,
          orderId: response.id,
          amount: response.amount,
        });
      }
    });
  };

  useEffect(() => {
    if (amount > 0 && orderId != "") {
      showRazoryPay();
    }
  }, [amount]);

  const showRazoryPay = () => {
    const form = document.createElement("form");
    // const button = document.createElement('button');
    // button.innerHTML = "What";
    // form.appendChild(button)
    // button.style.backgroundColor="red"
    form.setAttribute(
      "action",
      `http://localhost:5000/api/payment/callback`
    );
    form.setAttribute("method", "POST");
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.setAttribute("data-key", 'rzp_test_TKQngwc9akNonV');
    script.setAttribute("data-amount", amount);
    script.setAttribute("data-name", "Meesho Payment Gateway");
    script.setAttribute("data-prefill.contact", "95160876276");
    script.setAttribute("data-prefill.email", "abc@gmail.com");
    script.setAttribute("data-order_id", orderId);
    script.setAttribute("data-prefill.name", "Ayush Agrawal");
    script.setAttribute("data-description","Thanks for Shopping")
    
    script.setAttribute("data-image", `data:image/jpeg;base64,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`);
    script.setAttribute("data-buttontext", "Place Order");
    //console.log('svriot',script)
    document.body.appendChild(form);
    form.appendChild(script);
    const input = document.createElement("input");
    input.type = "hidden";
    // input.custom = "Hidden Element";
    // input.name = "hidden";
    form.appendChild(input);
    input.style.background='black'
    console.log('form', form)
    const submitBtn = form.getElementsByTagName('input')
    console.log('submit', submitBtn)
    const ans = document.getElementsByClassName('razorpay-payment-button')
    //ans[1].classList.add('btn')
   
    console.log('ans', ans.length)


  };
  return <div>{amount === 0 && orderId == "" && <h1>Loading...</h1>}</div>;
};

export default App;
